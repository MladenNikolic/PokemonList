import React, { Component } from "react";
import styled from "styled-components";
import loading from "../layout/images/loading.gif";
import placeholder from "../layout/images/placeholder.jpg";
import { Link } from "react-router-dom";

const Sprite = styled.img`
    width: 10em;
    height: 10em,
    display: none
`;

export default class PokemonCard extends Component {
  state = {
    pokemonName: "",
    imageUrl: null,
    pokemonIndex: "",
    imageLoading: true,
    request: false,
  };

  // Information for pokemons
  componentDidMount() {
    const pokemonName = this.props.pokemonName;
    const url = this.props.url;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    // Setting all data into state
    this.setState({
      pokemonName,
      imageUrl,
      pokemonIndex,
    });
  }

  render() {
    return (
      <div className="col-md-4 col-sm-6 mb-3">
        <Link to={`/pokemon/${this.state.pokemonIndex}`} className="cardLink">
          <div className="card cardeffect">
            <h5 className="card-header pokefont">
              {this.state.pokemonIndex}. {this.state.pokemonName.toUpperCase()}
            </h5>
            <div className="card-body mx-auto">
              {/* Statement for loading gif */}
              {this.state.imageLoading ? (
                <img
                  src={loading}
                  style={{ width: "6em", height: "6em" }}
                  className="card-img-top mx-auto mt-2"
                />
              ) : null}
              {/* Image for pocemon card */}
              <Sprite
                className="card-image-top mx-auto mt-2"
                onLoad={() => this.setState({ imageLoading: false })}
                onError={() =>
                  this.setState({
                    request: true,
                    imageLoading: false,
                    imageUrl: placeholder,
                  })
                }
                src={this.state.imageUrl}
                style={
                  this.state.tooManyRequest
                    ? { display: "none" }
                    : this.state.imageLoading
                    ? { display: "none" }
                    : { display: "block" }
                }
              ></Sprite>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
