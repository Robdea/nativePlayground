import { applyActionCode } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { Appearance} from "react-native";
import { lightStyle } from "../../assets/Styles/lightStyle";
import { darkStyle } from "../../assets/Styles/darkStyle";
const ThemeContext = createContext();

export default function ThemeProvider({children}) {
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === "dark")
    
    console.log(isDarkMode)

    useEffect(() =>{
        const listener = Appearance.addChangeListener(({colorSheme}) =>{
            setIsDarkMode(colorSheme === "dark")
        })
        return () => listener.remove();
    },[])

    return(
        <ThemeContext.Provider value={{isDarkMode, toggleTheme: () => setIsDarkMode(!isDarkMode), lightStyle, darkStyle}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext)
