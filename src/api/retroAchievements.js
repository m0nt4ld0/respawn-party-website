export async function fetchGameById(gameId) {
    const apiKey = import.meta.env.VITE_RA_APIKEY;
    
    const url = `https://retroachievements.org/API/API_GetGame.php?i=${gameId}&y=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
}

export async function fetchGameListByConsoleId(consoleId) {
    const apiKey = import.meta.env.VITE_RA_APIKEY;
    
    const url = `https://retroachievements.org/API/API_GetGameList.php?i=${consoleId}&y=${apiKey}&h=1&f=1`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
}

export async function fetchAllConsoles() {
    const apiKey = import.meta.env.VITE_RA_APIKEY;
    
    const url = `https://retroachievements.org/API/API_GetConsoleIDs.php?y=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
}
