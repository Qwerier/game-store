import { Box, Container, Typography } from "@mui/material";
import "./app/layout/App.css";
import Catalog from "./features/catalog/Catalog";
import NavBar from "./app/layout/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{mt: 14}}>
          <Catalog />
      </Container>
    </>
  );
}

export default App;
