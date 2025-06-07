let consolesCache = null;
const apiKey = import.meta.env.VITE_RA_APIKEY;
const baseUrl = "https://retroachievements.org/API";

// Reintentos automáticos con espera
async function safeFetch(url, options = {}, retries = 2, delay = 500) {
  try {
    const response = await fetch(url, {
      ...options,
      mode: "cors",
      keepalive: true,
    });
    if (!response.ok) throw new Error("Error de red");
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise((res) => setTimeout(res, delay));
      return safeFetch(url, options, retries - 1, delay);
    } else {
      console.error("Fallo permanente al consultar:", url, error);
      throw error;
    }
  }
}

export async function fetchGameById(gameId) {
  const url = `${baseUrl}/API_GetGame.php?i=${gameId}&y=${apiKey}`;
  return await safeFetch(url);
}

export async function fetchGameListByConsoleId(consoleId) {
  const url = `${baseUrl}/API_GetGameList.php?i=${consoleId}&y=${apiKey}&h=1&f=1`;
  return await safeFetch(url);
}

export async function fetchAllConsoles() {
  if (consolesCache) return consolesCache;

  const url = `${baseUrl}/API_GetConsoleIDs.php?y=${apiKey}`;
  consolesCache = await safeFetch(url);
  return consolesCache;
}
