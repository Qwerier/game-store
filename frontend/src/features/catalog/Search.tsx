import { debounce, TextField } from "@mui/material";
import { useAppSelector } from "../../app/store/store";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";

export default function Search() {
    const {searchTerm} = useAppSelector(state => state.catalog);
    const dispatch = useDispatch();

    const [localTerm, setLocalTerm] = useState(searchTerm);

    useEffect(()=>{
        setLocalTerm(searchTerm)
    }, [searchTerm]);

    const delayedSearch = debounce(event => {
        dispatch(setSearchTerm(event.target.value))
    }, 500);

    return (
        <TextField
          label='Search products'
          variant='filled'
          fullWidth
          type="search"
          value={localTerm}
          onChange={e => {
            setLocalTerm(e.target.value)
            delayedSearch(e);
          }}
        />
    )
}