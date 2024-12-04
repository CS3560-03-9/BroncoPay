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

    return data.transactions;
  } catch (err) {
    throw new Error(err);
  }
}

export async function depositMoney(handler, amount, description) {
  try {
    const response = await fetch(`${BASE_URL}/transactions/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handler: handler,
        amount: amount,
        description: description,
      }),
    });
    const { status } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to deposit money");
    }

    return true;
  } catch (err) {
    throw new Error(err);
  }
}

export async function withdrawMoney(handler, amount, description) {
  try {
    const response = await fetch(`${BASE_URL}/transactions/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handler: handler,
        amount: amount,
        description: description,
      }),
    });
    const { status } = await response.json();
    console.log("res", response);

    if (!response.ok || status !== "success") {
      throw new Error("Failed to withdraw money");
    }

    return true;
  } catch (err) {
    throw new Error(err);
  }
}
