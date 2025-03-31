import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./app/layout/App.css";
import NavBar from "./app/layout/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const palleteType = darkMode ? "dark": "light"

  // a theme provider as dictated by MUI
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === "light" ? "#121212" : "#eaeaea",
      },
    }
  });

  function changeThemeMode() {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar darkMode={darkMode} changeThemeMode={changeThemeMode} />
      <Box 
        sx={{
        minHeight: '100vh',
        background: darkMode
          ? 'radial-gradient(circle,rgb(44, 54, 99), #111B27)' 
          : 'radial-gradient(circle, #baecf9, #f0f9ff)',
      }}>
        <Container maxWidth="xl" sx ={{pt:14}}>
            <Outlet /> {/* filler for child components */}
        </Container>
      </Box>
    </ThemeProvider>

  );
}

export default App;
