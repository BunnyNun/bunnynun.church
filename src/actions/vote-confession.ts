'use server';

import { cookies } from 'next/headers';

const DRUPAL_URL = "https://cms.bunnynun.church";
const API_KEY = process.env.DRUPAL_API_KEY!;

export async function toggleVote(confessionId: string) {
  const cookieStore = await cookies();
  const votedCookie = cookieStore.get('bunnynun_votes');
  
  // Parse existing votes (stored as comma-separated IDs)
  let votedIds: string[] = votedCookie?.value ? votedCookie.value.split(',') : [];
  
  const hasVoted = votedIds.includes(confessionId);
  
  try {
    // 1. Fetch current vote count from Drupal first (to ensure accuracy)
    const fetchRes = await fetch(`${DRUPAL_URL}/jsonapi/node/confession/${confessionId}?fields[node--confession]=field_vote_count`, {
      headers: { 
        'Accept': 'application/vnd.api+json',
        'api-key': API_KEY 
      },
      cache: 'no-store' // Always get fresh data
    });

    if (!fetchRes.ok) throw new Error("Failed to fetch current count");
    
    const fetchData = await fetchRes.json();
    const currentVotes = fetchData.data.attributes.field_vote_count || 0;

    // 2. Calculate New Vote Count
    // If they voted, we remove it (-1). If they haven't, we add it (+1).
    const newVoteCount = hasVoted ? Math.max(0, currentVotes - 1) : currentVotes + 1;

    // 3. Patch the new count to Drupal
    const patchRes = await fetch(`${DRUPAL_URL}/jsonapi/node/confession/${confessionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        data: {
          type: "node--confession",
          id: confessionId,
          attributes: {
            field_vote_count: newVoteCount
          }
        }
      })
    });

    if (!patchRes.ok) throw new Error("Failed to update vote");

    // 4. Update the Cookie
    if (hasVoted) {
      // Remove ID
      votedIds = votedIds.filter(id => id !== confessionId);
    } else {
      // Add ID
      votedIds.push(confessionId);
    }

    cookieStore.set('bunnynun_votes', votedIds.join(','), { 
      expires: 365, // Persist for a year
      path: '/',
      httpOnly: true, // Security: JS cannot touch this cookie
      secure: process.env.NODE_ENV === 'production'
    });

    return { success: true, newCount: newVoteCount, isVoted: !hasVoted };

  } catch (error) {
    console.error("Voting Error:", error);
    return { success: false, error: "Asmodeus rejected your offering." };
  }
}