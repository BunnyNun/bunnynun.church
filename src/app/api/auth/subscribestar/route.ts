import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) return NextResponse.json({ error: 'No code provided' });

  try {
    // 1. Exchange Token
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
    if (tokenData.error) throw new Error(JSON.stringify(tokenData));

    // 2. THE PROBE: Now asking for content_provider_profile explicitly
    const graphQuery = `
      {
        user {
          id
          name
          subscriptions {
            nodes {
              id
              active
              price
              tier_id
              content_provider_profile {
                id
                name
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

    // 3. Dump the result to the browser
    return NextResponse.json({
      status: "PROFILE_ID_PROBE",
      raw_data: userData
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message, full_error: error }, { status: 500 });
  }
}