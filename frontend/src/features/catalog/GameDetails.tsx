// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Game } from "../../app/models/Game";
import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Euro } from "@mui/icons-material";
import { useFetchGameDetailsQuery } from "./catalogApi";


export default function GameDetails() {
  const { id } = useParams<string>();

  // const [game, setGame] = useState<Game | null>(null); // could be a non existing product

  // useEffect(() => {
  //   fetch(`https://localhost:5200/api/games/${id}`)
  //     .then((response) => {
  //       if(response.status === 404) return null;
  //       return response.json();
  //     })
  //     .then(data => setGame(data))
  //     .catch(err => console.log(err));
  // }, [id]);

  // // temporary solution
  // if (game === null) {
  //   return <div>Game not found...</div>;
  // }
  
  const {data: game, isLoading} = useFetchGameDetailsQuery(id!);

  if (!game || isLoading) return <div>Game Not Found</div>


  const gameDetails = [
    { label: "Name", text: game.name },
    { label: "Description", text: game.description },
    { label: "Developer", text: game.developer },
    { label: "Genre", text: game.genre },
    { label: "Player Mode", text: game.playerMode.playerMode },
    { label: "Publisher", text: game.publisher },
    {
      label: "Release Date",
      text: game.releaseDate ? game.releaseDate.split("T")[0] : "N/A",
    },
  ];

  return (
    <>
      <Grid container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
        <Grid size={3}>
          <img
            src={game?.pictureUrl}
            alt={game?.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid size={6}>
          <Typography sx={{ fontSize: "2rem" }}>{game?.name}</Typography>
          <Divider />
          <Typography sx={{ fontSize: "2rem" }}>
            <Euro sx={{ fontSize: "1.5rem" }} />
            {game?.price ? game.price.toFixed(2) : "N/A"}
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                {gameDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {detail.label}
                    </TableCell>
                    <TableCell>{detail.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid
            container
            sx={{ display: "flex", flexDirection: "column" }}
            spacing={2}
            marginY={3}
          >
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              sx={{ width: "20vh" }}
              defaultValue={0}
            />
          </Grid>

          <Grid size={6}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ width: "20vh" }}
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
