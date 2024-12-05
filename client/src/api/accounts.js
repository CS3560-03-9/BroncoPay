const BASE_URL = "http://localhost:3000";

/**
 * Retrieves a user by their handler
 * @param {*} handler
 */
export async function fetchUser(handler) {
  try {
    const response = await fetch(`${BASE_URL}/accounts/${handler}`, {
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
    throw new Error(err);
  }
}

/**
 * Edits a user's information
 * @param {*} handler
 * @param {*} newLimit
 */
export async function updateSpendingLimit(handler, newLimit) {
  try {
    const response = await fetch(`${BASE_URL}/accounts/${handler}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spendingLimit: parseInt(newLimit) }),
    });
    const { status, data } = await response.json();
    console.log("res", response);

    if (!response.ok || status !== "success") {
      throw new Error("Failed to update spending limit");
    }

    return data;
  } catch (err) {
    throw new Error(err);
  }
}
