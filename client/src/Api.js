const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1337"
    : "https://travel-log.prakharj05.vercel.app";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/routes/logs`, { mode: "no-cors" });
  return response.json();
}

export async function createLogEntries(entry) {
  const apiKey = entry.apiKey;
  delete entry.apiKey;
  const response = await fetch(`${API_URL}/routes/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": apiKey,
    },
    body: JSON.stringify(entry),
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = error;
  throw error;
}
