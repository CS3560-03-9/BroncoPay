export async function fetchUser(user) {
  try {
    const response = await fetch(`http://localhost:3000/accounts/${user}`, {
      // ** TODO: Update URL to use a base url rather than hardcode (env?)
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status, data } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to fetch user");
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
