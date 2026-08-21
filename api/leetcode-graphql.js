const LEETCODE_URL = "https://leetcode.com/graphql";

module.exports = async function leetcodeGraphql(request, response) {
  if (request.method === "OPTIONS") {
    response.setHeader("Allow", "POST, OPTIONS");
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const leetcodeResponse = await fetch(LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com/",
        Origin: "https://leetcode.com",
      },
      body: JSON.stringify(request.body),
    });

    const data = await leetcodeResponse.json();
    return response.status(leetcodeResponse.status).json(data);
  } catch (error) {
    return response.status(502).json({ error: "Unable to reach LeetCode" });
  }
};
