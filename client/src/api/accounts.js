export async function fetchUser(user) {
  try {
    const response = await fetch(`http://localhost:3000/accounts/${user}`, {
      // ** TODO: Update URL to use a base url rather than hardcode (env?)
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || response.status !== "success") {
      throw new Error("Failed to fetch user");
    }

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error(err);
  }
}
