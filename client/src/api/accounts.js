const BASE_URL = "http://localhost:3000"; // ** TODO: Update this in env or do some default url shenanigans later **

export async function fetchUser(user) {
  try {
    const response = await fetch(`${BASE_URL}/accounts/${user}`, {
      // ** TODO: Update URL to use a base url rather than hardcode (env?)
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status, data } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to fetch user");
    }

    return data.account;
  } catch (err) {
    console.error(err);
  }
}
