"use client";
import React, { createContext } from "react";


export const themeColors = {
bgMain: "#ffffffff",
bgPanel: "#ffffffff",
textPrimary: "#060605ff",
textSecondary: "#7b5151ff",
border: "#b4a67eff",
accent: "#e5c795ff",
accentHover: "#b4af9eff",
priceHighlight: "#385528ff",
};


export const ThemeContext = createContext(themeColors);


export const ThemeProvider = ({ children, colors = themeColors }) => {
return (
<ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
);
};


export default ThemeProvider;