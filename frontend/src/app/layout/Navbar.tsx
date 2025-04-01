import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

type Props = {
  darkMode: boolean;
  changeThemeMode: () => void;
};

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
export default function NavBar({ darkMode, changeThemeMode }: Props) {
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
          <Switch onClick={changeThemeMode}></Switch>
          <IconButton>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex", flexDirection: "row" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={title} sx={navLinkStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <IconButton size="large">
            <Badge color="secondary" sx={{ color: "inherit" }}>
              <ShoppingCart />
            </Badge>
          </IconButton>

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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
