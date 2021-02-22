import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./Components/layout/NavBar";
import Dashboard from "./Components/layout/Dashboard";
import Pokemon from "./Components/pokemon/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* 2 routes for a list of pokemons, and when user click on some pokemon, there is another route for that pokemon and all information */}
        <div className="container">
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
        </div>
      </div>
    </Router>
  );
}

export default App;
