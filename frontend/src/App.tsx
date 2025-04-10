import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./app/layout/App.css";
import NavBar from "./app/layout/Navbar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "./app/store/store";



function App() {
  const {isDarkMode} = useAppSelector(state => state.ui);
  const palleteType = isDarkMode ? "dark": "light"

  // a theme provider as dictated by MUI
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === "light" ? "#121212" : "#eaeaea",
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar/>
      <Box 
        sx={{
        minHeight: '100vh',
        background: isDarkMode
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
