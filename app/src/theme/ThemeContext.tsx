import React, {createContext, useState} from "react";

export type Theme = "dark" | "light";

type contextType = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type props = {
    children: React.ReactNode;
};

export const ThemeContext = createContext<contextType | null>(null);

export const ThemeContextProvider: React.FC<props> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};