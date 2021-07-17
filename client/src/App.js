import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Landing, RedirectHandler } from './container'
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem;
  color: #388fc9;
`;

const renderHeading = () => {
  return <Wrapper>
    URL SHORTENER
  </Wrapper>
}
function App() {
  return (
    <Router>
      {renderHeading()}
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
