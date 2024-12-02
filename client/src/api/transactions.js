const BASE_URL = "http://localhost:3000"; // ** TODO: Update this in env or do some default url shenanigans later **

export async function fetchActivity(user) {
  try {
    const response = await fetch(`${BASE_URL}/transactions/${user}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status, data } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to fetch user");
    }

    console.log("Transactions", data);

    return data.transactions;
  } catch (err) {
    console.error(err);
  }
}
