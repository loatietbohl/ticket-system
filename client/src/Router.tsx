import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NewTicket } from "./pages/NewTicket";
import { SearchTickets } from "./pages/SearchTickets";
import { ViewTicket } from "./pages/ViewTicket";

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={NewTicket} />
      <Route exact path="/search" component={SearchTickets} />
      <Route exact path="/ticket/:id" component={ViewTicket} />
    </Switch>
  </BrowserRouter>
);
