import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Game } from "../../app/models/Game";

type Props = {
  game: Game;
};

// represents a single Game object
export default function GameCard({ game }: Props) {
  return (
    <>
      <Card
        elevation={3}
        sx={{
          width: 280,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          backgroundColor: 'navajowhite'
        }}
      >
        <CardMedia
          sx={{height: 240, backgroundSize: 'cover'}}
          image={game.pictureUrl}
          title={game.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            sx={{color: 'primary.main'}}
            variant='subtitle2'
            >
              {game.name.toUpperCase()}
          </Typography>
          <Typography
            variant="h6"
            sx={{color: 'secondary.main'}}
          >
            €{game.price}
          </Typography>
        </CardContent>

        <CardActions
          sx={{justifyContent: 'space-between'}}
        >
          <Button>Details</Button>
        </CardActions>
      </Card>
    </>
  );
}
