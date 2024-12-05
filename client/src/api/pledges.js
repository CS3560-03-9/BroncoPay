const BASE_URL = "http://localhost:3000";

export async function fetchPledges(handler) {
  const response = await fetch(`${BASE_URL}/pledges/handler/${handler}`);
  const { status, data } = await response.json();

  if (!response.ok || status !== "success") {
    throw new Error("Failed to fetch pledges");
  }

  return data.pledges; // returns an array of pledge objects
}
