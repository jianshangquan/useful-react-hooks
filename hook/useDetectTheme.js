const { createContext, useContext, useEffect, useState } = require('react');


const ThemeContext = createContext();


const Themes = Object.freeze({
    dark: 'dark',
    light: 'light'
})


function useDetectTheme() {
    return useContext(ThemeContext);
}

function ThemeProvider({ children }) {


    const [theme, setTheme] = useState();


    useEffect(() => {
        const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        isDarkTheme.addEventListener('change', e => {
            if (e.matches) setTheme(Themes.dark)
            else setTheme(Themes.light);
        })
    }, [])

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            isDarkTheme: theme == Themes.dark,
            isLightTheme: theme == Themes.light
        }}>
            {children}
        </ThemeContext.Provider>
    )
}


const Theme = module.exports = ThemeProvider;
Theme.Themes = Themes;
Theme.useDetectTheme = useDetectTheme;