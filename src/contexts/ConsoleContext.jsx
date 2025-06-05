import { createContext, useEffect, useState } from 'react';
import { fetchAllConsoles } from '../api/retroAchievements';

export const ConsoleContext = createContext();

export function ConsoleProvider({ children }) {
  const [consoles, setConsoles] = useState([]);
  const [loadingConsoles, setLoadingConsoles] = useState(true);

  useEffect(() => {
    fetchAllConsoles()
      .then(data => {
        setConsoles(data);
        setLoadingConsoles(false);
      })
      .catch(error => {
        console.error('Error al cargar consolas:', error);
        setLoadingConsoles(false);
      });
  }, []);

  return (
    <ConsoleContext.Provider value={{ consoles, loadingConsoles }}>
      {children}
    </ConsoleContext.Provider>
  );
}
