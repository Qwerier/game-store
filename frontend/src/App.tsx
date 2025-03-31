import { Container, Typography } from "@mui/material";
import "./app/layout/App.css";
import Catalog from "./features/catalog/Catalog";

function App() {
  return (
    <Container maxWidth='xl'>
      <div className="center-spacing">
        <Typography variant='h3'>GameStore</Typography>
        <Catalog />
      </div>
    </Container>
  );
}

export default App;
