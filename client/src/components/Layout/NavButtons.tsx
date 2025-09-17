import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const NavButtons = {
  New: () => (
    <Link to="/">
      <Button variant="contained">Open a ticket</Button>;
    </Link>
  ),
  Search: () => (
    <Link to="/search">
      <Button variant="contained">Search</Button>;
    </Link>
  ),
};
