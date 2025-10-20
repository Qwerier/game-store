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
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "../basket/basketApi";
import { useFetchBasketQuery } from "../basket/basketApi";
import { ChangeEvent, useEffect, useState } from "react";

export default function GameDetails() {
  const { id } = useParams<string>();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const {data: basket} = useFetchBasketQuery();
  const item = basket?.items.find(i => i.gameId === id);

  const [quantity, setQuantity] = useState<number>(item? item.quantity : 0);

  // handle of component re-rendering when item changes due to an external API call
  useEffect(()=>{
    if (item) setQuantity(item.quantity);
  }, [item]);


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

  const { data: game, isLoading } = useFetchGameDetailsQuery(id? id: "0");

  if(isLoading) return <div>Please wait</div>;
  if (!game) return <div>Game Not Found</div>;

  // a function to post the updated quantities to the basket
  const updateQuantityInBasket = ()=>{
    // amount to add or remove from basket
    const updatedQuantity = item? Math.abs(quantity - item.quantity) : quantity;

    if (item && quantity < item.quantity) {
      removeBasketItem({gameId: item.gameId, quantity: updatedQuantity});
    }
    else if (item && quantity > item.quantity) {
      addBasketItem({game: item, quantity: updatedQuantity});
  }
}
  // event to handle changes in the quantity textfield
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>{
    const value = Number.parseInt(event.currentTarget.value);
    if(value && value >= 0) setQuantity(value);
  }

  const gameDetails = [
    { label: "Name", text: game.name },
    { label: "Description", text: game.description },
    { label: "Developer", text: game.developer },
    { label: "Genre", text: game.genre },
    { label: "Player Mode", text: game.playerMode },
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
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid size={6}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ width: "20vh" }}

              onClick={updateQuantityInBasket}
              disabled={quantity === 0 || quantity === item?.quantity }
            >
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
