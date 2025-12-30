'use server';

export async function submitConfession(formData: FormData) {
  const drupalUrl = "https://cms.bunnynun.church";
  const apiKey = process.env.DRUPAL_API_KEY!;

  // 1. Extract Data
  const sinnerName = (formData.get('sinnerName') as string) || "Anonymous Sinner";
  const confessionText = formData.get('confession') as string;
  const isPublic = formData.get('isPublic') === 'on';
  
  // Get all checked character IDs
  const characterIds = formData.getAll('characters') as string[];

  const nodeTitle = isPublic ? `[PUBLIC] Confession from ${sinnerName}` : `[PRIVATE] Confession from ${sinnerName}`;

  if (!confessionText || confessionText.trim().length === 0) {
    return { error: "You cannot confess silence." };
  }

  // 2. Construct JSON:API Payload
  const payload = {
    data: {
      type: "node--confession",
      attributes: {
        title: nodeTitle,
        field_confession_text: confessionText,
        field_sinner: sinnerName,
        status: isPublic, // True = Published (Needs admin review usually), False = Draft
      },
      relationships: {
        field_characters_involved: {
          data: characterIds.map(uuid => ({
            type: "node--character",
            id: uuid
          }))
        }
      }
    }
  };

  // 3. Send to Drupal
  try {
    const res = await fetch(`${drupalUrl}/jsonapi/node/confession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Drupal Error:", JSON.stringify(errorData, null, 2));
      return { error: `The Altar rejected you: ${res.statusText}` };
    }

    return { success: true };
  } catch (error) {
    console.error("Network Error:", error);
    return { error: "Connection to the Void failed." };
  }
}