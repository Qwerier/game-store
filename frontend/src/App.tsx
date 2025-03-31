import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "./app/layout/App.css";
import Catalog from "./features/catalog/Catalog";
import NavBar from "./app/layout/Navbar";

function App() {
  const darkMode = true;
  const palleteType = darkMode ? "dark": "light"

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
      <NavBar />
      <Box 
        sx={{
        minHeight: '100vh',
        background: darkMode
          ? 'radial-gradient(circle,rgb(44, 54, 99), #111B27)' 
          : 'radial-gradient(circle, #baecf9, #f0f9ff)',
      }}>
        <Container maxWidth="xl" sx ={{pt:14}}>
            <Catalog />
        </Container>
      </Box>
    </ThemeProvider>

  );
}

export default App;
