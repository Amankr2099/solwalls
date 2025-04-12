'use client'

const { useContext } = require("react");
const { ThemeContext } = require("./themeContext");

// 3. A custom hook to use the theme context
export default useTheme = () => {
    return useContext(ThemeContext);
  };