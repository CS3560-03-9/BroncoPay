const BASE_URL = "http://localhost:3000";

export async function fetchPledges(handler) {
  const response = await fetch(`${BASE_URL}/pledges/handler/${handler}`);
  const { status, data } = await response.json();

  if (!response.ok || status !== "success") {
    throw new Error("Failed to fetch pledges");
  }

  return data.pledges; // returns an array of pledge objects
}

/**
 * Create a new pledge
 * @param {*} handler
 * @param {*} cost
 * @param {*} interval
 * @param {*} description
 */
export async function createPledge(handler, cost, interval, description) {
  let handledInterval = 0;
  if (interval === "Monthly") {
    handledInterval = 30;
  } else if (interval === "Quarterly") {
    handledInterval = 90;
  } else if (interval === "Semi-annually") {
    handledInterval = 180;
  } else if (interval === "Annually") {
    handledInterval = 365;
  }

  try {
    const response = await fetch(`${BASE_URL}/pledges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handler: handler,
        cost: parseInt(cost),
        interval: parseInt(handledInterval),
        description: description,
      }),
    });
    const { status } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to create pledge");
    }
  } catch (err) {
    throw new Error(err);
  }
}
