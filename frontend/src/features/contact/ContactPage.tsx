import { decrement, increment } from "./counterReducer"
import { Button, ButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { concat, decat, replace } from "./nameReducer";

export default function ContactPage() {
  const states = useAppSelector(state => ({
    counterState : state.counter,
    identityState: state.identity,
  }));
  const dispatch = useAppDispatch();
  
  return (
    <>
      <div>ContactPage views: {states.counterState.data} {states.identityState.name}</div>
      <ButtonGroup>
        <Button onClick={() => dispatch(decrement(1))} color= 'primary'>Decrement</Button>
        <Button onClick={() => dispatch(increment(1))} color= 'secondary'>Increment</Button>
        <Button onClick={() => dispatch(concat('k'))} color= 'secondary'>Concatenate</Button>
        <Button onClick={() => dispatch(decat())} color= 'primary'>Decatenate</Button>
        <Button onClick={() => dispatch(replace({char: 'k', replacement: 'p'}))} color= 'secondary'>Replace</Button>
      </ButtonGroup>
    </>
  )
}