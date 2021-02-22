import React, { Component, useState } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";
import loading from "../layout/images/loading.gif";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0",
    pokemon: null,
    buttonsPage: true,
  };

  // Information about pokemon
  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data["results"] });
  }

  // function for loading all pokemons into list of pokemons, also hiding buttons next and previous
  async allData() {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
    );
    this.setState({ pokemon: res.data["results"] });
    this.state.buttonsPage = false;
    console.log(this.state.buttonsPage);
    this.forceUpdate();
  }

  // function for showing a list of pokemons with pagination, also showing buttons next and previous
  async pageView() {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"
    );
    this.setState({ pokemon: res.data["results"] });
    this.state.buttonsPage = true;
    console.log(this.state.buttonsPage);
    this.forceUpdate();
  }

  // function for next page
  async nextPage() {
    const res = await axios.get(this.state.url);
    this.setState({ url: res.data.next });
    const res2 = await axios.get(this.state.url);
    this.setState({ pokemon: res2.data["results"] });
  }

  //function for previous page
  async previousPage() {
    const res = await axios.get(this.state.url);
    console.log(res.data.previous);
    if (res.data.previous) {
      this.setState({ url: res.data.previous });
      const res2 = await axios.get(this.state.url);
      this.setState({ pokemon: res2.data["results"] });
    } else {
      this.setState({
        url: "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0",
      });
    }
  }

  

  render() {
   return (
      <>
      {/* buttons for listing all pokemons or going back to page view */}
        <button
          onClick={() => this.allData()}
          type="button"
          className="btn btn-secondary mt-2 ml-2 mb-2"
          style={{ display: this.state.buttonsPage ? "block" : "none" }}
        >
          All pokemons
        </button>
        <button
          onClick={() => this.pageView()}
          type="button"
          className="btn btn-secondary mt-2 ml-2 mb-2"
          style={{ display: this.state.buttonsPage ? "none" : "block" }}
        >
          Back to page view
        </button>
        {/* Listing all pokemons, or if pokemons are not loaded showing loading gif */}
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemonName={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <img
            src={loading}
            style={{ width: "15em", height: "15em" }}
            className="card-img-top mx-auto mt-2"
          />
        )}
        {/* Buttons for next and previous page */}
        <div
          className="container-fluid mx-auto"
          style={{ display: this.state.buttonsPage ? "block" : "none" }}
        >
          <button
            onClick={() => this.previousPage()}
            type="button"
            className="btn btn-secondary mt-4 ml-2 mb-2"
          >
            Previous page
          </button>
          <button
            onClick={() => this.nextPage()}
            type="button"
            className="btn btn-secondary mt-4 ml-2 mb-2 float-right"
          >
            Next page
          </button>
        </div>
      </>
    );
  }
}
