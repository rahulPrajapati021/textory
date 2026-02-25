import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        if(theme == "light") {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }
    const value = {
        theme:"dark",
        toggleTheme,
    }
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error("Invalid theme context");
    }
    return context;
}