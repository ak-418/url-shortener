import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Landing, RedirectHandler } from './container'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:shortened" exact={true}>
          <RedirectHandler />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
