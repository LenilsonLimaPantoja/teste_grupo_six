import { createContext } from "react";

export const ContextGlobal = createContext({});
export default function GlobalContext({ children }) {
    const token = "2A50C22E-7954-4C73-9CF9-F6D298C047A7";
    const BASE_URL = "https://api-candidate.ogruposix.com"

    return (
        <ContextGlobal.Provider value={{ token, BASE_URL }}>
            {children}
        </ContextGlobal.Provider>
    )
}