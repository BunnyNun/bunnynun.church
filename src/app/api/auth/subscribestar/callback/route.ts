import { NextResponse } from 'next/server';

const DRUPAL_URL = "https://cms.bunnynun.church";
const MY_PROFILE_ID = "4141042"; // Your ID

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.redirect(new URL('/sanctuary?error=no_code_provided', request.url));

  try {
    console.log("--- STARTING SUBSCRIBESTAR AUTH ---");

    // 1. Token Exchange
    const tokenRes = await fetch('https://www.subscribestar.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'BunnyNun/1.0' },
      body: new URLSearchParams({
        client_id: process.env.SUBSCRIBESTAR_CLIENT_ID!,
        client_secret: process.env.SUBSCRIBESTAR_CLIENT_SECRET!,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.SUBSCRIBESTAR_REDIRECT_URI!,
      }),
    });

    const tokenData = await tokenRes.json();
    if (tokenData.error) {
        console.error("Token Error:", tokenData);
        throw new Error(`Token Exchange Failed: ${tokenData.error_description}`);
    }

    // 2. Fetch User Data (With explicit profile check)
    const graphQuery = `
      {
        user {
          id
          name
          subscriptions {
            nodes {
              active
              price
              tier_id
              content_provider_profile {
                id
              }
            }
          }
        }
      }
    `;

    const userRes = await fetch('https://www.subscribestar.com/api/graphql/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
        'User-Agent': 'BunnyNun/1.0'
      },
      body: JSON.stringify({ query: graphQuery }),
    });

    const userData = await userRes.json();
    
    // Safety Checks
    if (userData.errors) {
        console.error("GraphQL Errors:", userData.errors);
        throw new Error(`GraphQLError: ${userData.errors[0].message}`);
    }
    if (!userData.data?.user) {
        throw new Error('No user data returned from API');
    }

    const ssUser = userData.data.user;
    const subs = ssUser.subscriptions?.nodes || [];
    
    console.log(`User Found: ${ssUser.name} [ID:${ssUser.id}]`);
    console.log(`Total Subscriptions Found: ${subs.length}`);

    // 3. Loop and Log (Debugging)
    let bunnySub = null;
    
    for (const s of subs) {
        // Safe access to profile ID
        const profileId = s.content_provider_profile?.id;
        
        console.log(`Checking Sub: Active=${s.active}, Price=${s.price}, ProfileID=${profileId}`);
        
        // Compare IDs as strings to be safe
        if (String(profileId) === String(MY_PROFILE_ID) && s.active === true) {
            bunnySub = s;
            console.log(">>> MATCH FOUND! <<<");
            break;
        }
    }

    const tierName = bunnySub ? 'devotee' : 'none';
    console.log(`Final Tier Determination: ${tierName}`);

    // 4. Sync to Drupal
    await syncUserToDrupal(ssUser.id, ssUser.name, tierName);

    // 5. Redirect
    const response = NextResponse.redirect(new URL('/sanctuary', request.url));
    response.cookies.set('bunny_tier', tierName, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    response.cookies.set('bunny_ssid', ssUser.id, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    
    return response;

  } catch (error: any) {
    console.error('CRITICAL ERROR:', error);
    const errorMessage = encodeURIComponent(error.message || 'Unknown Error');
    return NextResponse.redirect(new URL(`/sanctuary?error=${errorMessage}`, request.url));
  }
}

// --- Drupal Helper (Unchanged logic, just added logging) ---
async function syncUserToDrupal(ssId: string, name: string, tier: string) {
  const apiKey = process.env.DRUPAL_API_KEY;
  if (!apiKey) {
      console.error("Missing DRUPAL_API_KEY");
      return;
  }

  try {
      const findRes = await fetch(`${DRUPAL_URL}/jsonapi/user/user?filter[field_subscribestar_id]=${ssId}`, {
        headers: { 'api-key': apiKey, 'Accept': 'application/vnd.api+json' }
      });
      const findData = await findRes.json();
      const existingUser = findData.data?.[0];

      const payload = {
        data: {
          type: "user--user",
          attributes: { field_subscription_tier: tier }
        }
      };

      if (existingUser) {
        console.log(`Updating Drupal User ${existingUser.id}...`);
        await fetch(`${DRUPAL_URL}/jsonapi/user/user/${existingUser.id}`, {
          method: 'PATCH',
          headers: { 'api-key': apiKey, 'Content-Type': 'application/vnd.api+json' },
          body: JSON.stringify({ ...payload, data: { ...payload.data, id: existingUser.id } })
        });
      } else {
        console.log(`Creating New Drupal User...`);
        await fetch(`${DRUPAL_URL}/jsonapi/user/user`, {
          method: 'POST',
          headers: { 'api-key': apiKey, 'Content-Type': 'application/vnd.api+json' },
          body: JSON.stringify({
            data: {
              type: "user--user",
              attributes: {
                name: `${name} [SS:${ssId}]`,
                mail: `${ssId}@placeholder.subscribestar.com`,
                pass: "RESTRICTED_" + Math.random().toString(36),
                status: true,
                field_subscribestar_id: ssId,
                field_subscription_tier: tier,
              }
            }
          })
        });
      }
  } catch (err) {
      console.error("Drupal Sync Failed:", err);
      // We don't throw here to ensure the user still gets redirected and cookie set
  }
}