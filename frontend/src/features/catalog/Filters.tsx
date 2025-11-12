import {
  Box,
  Button,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { reset, setGenres, setOrderBy } from "./catalogSlice";
import CheckboxButtons from "../../shared/components/CheckboxButtons";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: Highest to lowest" },
  { value: "price", label: "Price: Lowest to highest" },
];

type Props ={
  propFilters: {
    genres: string[],
    publishers: string[]
  }
}

export default function Filters({propFilters}: Props) {
  const { orderBy, genres, publishers } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  if (!propFilters?.genres || !propFilters.publishers) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          selectedValue={orderBy}
          options={sortOptions}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={propFilters.genres}
          checked={genres}
          onChange={(genres) => dispatch(setGenres(genres))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          <CheckboxButtons
            items={propFilters.publishers}
            checked={publishers}
            onChange={(publishers) => dispatch(setGenres(publishers))}
          />
        </FormGroup>
      </Paper>
      <Button onClick={() => dispatch(reset())}>Reset</Button>
    </Box>
  );
}
