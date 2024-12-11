const BASE_URL = "http://localhost:3000";

/**
 * Retrieve a business handler if it exists
 */
export async function fetchBusiness(handler) {
  try {
    const response = await fetch(`${BASE_URL}/businesses/${handler}`);
    const data = await response.json();
    return data.data.business;
  } catch (err) {
    console.error(err);
  }
}
