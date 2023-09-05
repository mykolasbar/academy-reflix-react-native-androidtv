import React, { createContext, useState }  from 'react';

interface ContextProps {
    readonly setColorTheme: (theme: string) => string
    readonly getColorTheme: () => string | null
  }

export let ThemeContext = createContext<ContextProps | null>(null)

export let ThemeProvider = ({children}: any) => {

    let [theme, setTheme] = useState<string>('dark')

    let setColorTheme = (theme: string) => {setTheme(theme); return theme}

    let getColorTheme = () => {return theme}

    return (
        <ThemeContext.Provider value={{ setColorTheme, getColorTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
