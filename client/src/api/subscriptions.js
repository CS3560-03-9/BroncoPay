const BASE_URL = "http://localhost:3000";

/**
 * Retrieves all subscriptions for a specific handler
 * To retrieve the subscription info (e.g., pricing), the pledge object is included in each subscription object
 * @param {*} handler
 */
export async function fetchSubscriptions(handler) {
  try {
    const response = await fetch(`${BASE_URL}/subscriptions/${handler}`);
    const { status, data } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to fetch subscriptions");
    }

    const subscriptions = data.subscriptions;
    const pledges = subscriptions.map((subscription) => subscription.pledge);

    return pledges;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Retrieves a list of pledges for a specific handler
 * @param {} handler
 */
export async function fetchPledgeList(handler) {
  try {
    const response = await fetch(`${BASE_URL}/pledges/handler/${handler}`);
    const { status, data } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to fetch subscriptions");
    }

    return data.pledges;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Retrieves a pledge by its ID
 * @param {*} pledgeID
 */
export async function fetchPledge(pledgeID) {
  try {
    const response = await fetch(`${BASE_URL}/pledge/id/${pledgeID}`);
    const { status, data } = await response.json();

    if (!response.ok || status !== "success") {
      throw new Error("Failed to fetch pledge");
    }

    return data.pledge;
  } catch (err) {
    throw new Error(err);
  }
}
