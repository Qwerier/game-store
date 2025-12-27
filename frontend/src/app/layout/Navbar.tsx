import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import { useUserInfoQuery } from "../../features/account/accountApi";
import UserMenu from "./UserMenu";


const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navLinkStyles = {
  color: "inherit",
  typography: "h6",
  /* hover pseudoclass */
  "&:hover": {
    color: "grey.500",
  },
  /* active class */
  "&.active": {
    color: "lightgreen",
  },
};

// ListItem's behave as Links through components
export default function NavBar() {
  const { data: user } = useUserInfoQuery();
  const { isLoading, isDarkMode } = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  const { data: basket } = useFetchBasketQuery();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  console.log(user);
  
  return (
    <AppBar position="fixed" sx={{ display: "flex" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <Typography variant="h6">GameStore</Typography>
          <Switch onClick={() => dispatch(toggleDarkMode())}></Switch>
          <IconButton>
            {isDarkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex", flexDirection: "row" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={title} sx={navLinkStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" component={Link} to='/basket'>
            <Badge badgeContent={itemCount} color="secondary" sx={{ color: "inherit" }}>
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <UserMenu user={user} />
          ) :
            (
              <List sx={{ display: "flex", flexDirection: "row" }}>
                {rightLinks.map(({ path, title }) => (
                  <ListItem
                    component={NavLink}
                    to={path}
                    key={title}
                    sx={navLinkStyles}
                  >
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}

        </Box>
      </Toolbar>
      {
        isLoading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="primary" />
          </Box>
        )}
    </AppBar>
  );
}
