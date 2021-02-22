import React, { Component } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import PokemonCard from"./PokemonCard"

import loading from "../layout/images/loading.gif";
import grass from "../layout/images/grass.png";
import bug from "../layout/images/bug.png";
import dark from "../layout/images/dark.png";
import dragon from "../layout/images/dragon.png";
import electric from "../layout/images/electric.png";
import fairy from "../layout/images/fairy.png";
import fighting from "../layout/images/fighting.png";
import fire from "../layout/images/fire.png";
import flying from "../layout/images/flying.png";
import ghost from "../layout/images/ghost.png";
import ground from "../layout/images/ground.png";
import ice from "../layout/images/ice.png";
import normal from "../layout/images/normal.png";
import poison from "../layout/images/poison.png";
import psychic from "../layout/images/psychic.png";
import rock from "../layout/images/rock.png";
import steel from "../layout/images/steel.png";
import water from "../layout/images/water.png";

const Sprite = styled.img`
    width: 10em;
    height: 10em,
    display: none
`;

export default class Pokemon extends Component {
  state = {
    show: false,
    imageUrl: null,
    imageUrl2: null,
    imageLoading: true,
    request: false,
    pokemonsSameTypeUrls: [],
    types: [],
    name: "",
    pokemonIndex: "",
    description: "",
    height: "",
    weight: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
    },
    images: "",
    seccondUrl: null,
    firstUrl: null,
    pokemon: null,
    firstType: null,
    seccondType: null,
  };

  async componentDidMount() {
    //pokemon index
    const { pokemonIndex } = this.props.match.params;

    //pokemon urls for information
    const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

    //information
    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;
    const imageUrl2 = pokemonRes.data.sprites.back_default;

    const types = pokemonRes.data.types.map((type) => type.type.name);

    const pokemonsSameTypeUrls = pokemonRes.data.types.map(
      (type) => type.type.url
    );
    const firstType = types[0];
    const seccondType = types[1];
    const firstUrl = pokemonsSameTypeUrls[0];
    const pokemonData = await axios.get(firstUrl);
    const pokemon = pokemonData.data["pokemon"];
    if (pokemonsSameTypeUrls[1]){
      const seccondUrl = pokemonsSameTypeUrls[1];
      const pokemonData2 = await axios.get(seccondUrl);
      const pokemon2 = pokemonData2.data["pokemon"];
      this.setState({seccondUrl,pokemon2})
    } else {null}
    //const pokemonData2 = await axios.get(seccondUrl);
    //const pokemon2 = pokemonData2.data["pokemon"];

    let { hp, attack, defense, speed } = "";

    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        default:
          return null;
      }
    });

    //weight = Hektogram tp KG *10
    const weight = pokemonRes.data.weight / 10;
    //weight = DDEC tp CM /10
    const height = pokemonRes.data.height * 10;

    //setting all data into state
    this.setState({
      firstType,
      seccondType,
      pokemon,
      firstUrl,
      name,
      imageUrl,
      imageUrl2,
      weight,
      height,
      pokemonsSameTypeUrls,
      types,
      pokemonIndex,
      stats: {
        hp,
        attack,
        defense,
        speed,
      },
      openModal: false
    });
  }

  //switch for images for types of pokemons
  typeImage(params) {
    switch (params) {
      case "grass":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={grass}
          />
        );
      case "bug":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={bug}
          />
        );
      case "dark":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={dark}
          />
        );
      case "dragon":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={dragon}
          />
        );
      case "electric":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={electric}
          />
        );
      case "fairy":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={fairy}
          />
        );
      case "fighting":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={fighting}
          />
        );
      case "fire":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={fire}
          />
        );
      case "flying":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={flying}
          />
        );
      case "ghost":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={ghost}
          />
        );
      case "ground":
        return (
          <img
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={ground}
          />
        );
      case "ice":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={ice}
          />
        );
      case "normal":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={normal}
          />
        );
      case "poison":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={poison}
          />
        );
      case "psychic":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={psychic}
          />
        );
      case "rock":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={rock}
          />
        );
      case "steel":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={steel}
          />
        );
      case "water":
        return (
          <img
            className="typetransition"
            style={{ width: "7em", height: "7em" }}
            alt="type"
            src={water}
          />
        );
      default:
        return null;
    }
  }

  update(){
    this.forceUpdate();
  }

  Modal({ children }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
      <>
        <button
          type="button"
          className="btn btn-secondary mt-3 ml-4"
          onClick={handleShow}
        >
          Pokemons same type
        </button>
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>All pokemons same type</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary "
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  render() {
    return (
      <div className="col pokemonmargin">
        <div className="card">
          {/* Button for going back to list of pokemons */}
          <Link to={`/`}>
            <button type="button" className="btn btn-secondary mt-2 ml-2">
              Go Back
            </button>
          </Link>
          {/* Card for pokemon with all informations and images */}
          <h2 className="card-header mt-2 pokefont">
            <div className="row">
              <div className="col-md-12 headlineshadow">
                {this.state.pokemonIndex}. {this.state.name.toUpperCase()}
              </div>
            </div>
          </h2>
          <div className="container mt-5">
            {/* Statement for loading gif */}
            {this.state.imageLoading ? (
              <img
                src={loading}
                style={{ width: "6em", height: "6em" }}
                className="card-img-top mx-auto mt-2"
                alt=""
              />
            ) : null}
            <div className="card-body mx-auto">
              <div className="row justify-content-center">
                <div className="col-md-4 mb-5">
                  {/* images for pokemons */}
                  <Sprite
                    className="card-image-top mx-auto mt-2 imagetransition"
                    onLoad={() => this.setState({ imageLoading: false })}
                    onError={() => this.setState({ request: true })}
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
                <div className="col-md-4">
                  <Sprite
                    className="card-image-top mx-auto mt-2 imagetransition"
                    onLoad={() => this.setState({ imageLoading: false })}
                    onError={() => this.setState({ request: true })}
                    src={this.state.imageUrl2}
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
              {/* Information, height, hp, weight etc */}
              <div className="row">
                <div className="col-md-2">
                  <h4>Height:</h4>
                </div>
                <div className="col-md-10">
                  <p>{this.state.height} centimeters</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <h4>Weight:</h4>
                </div>
                <div className="col-md-10">
                  <p>{this.state.weight} kilos</p>
                </div>
              </div>
              <hr />
              {/* Progress bars */}
              <div className="row">
                <div className="col-md-2">
                  <h4>HP:</h4>
                </div>
                <div className="col-md-10">
                  <div className="progress mt-2">
                    <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressBar"
                      style={{ width: `${this.state.stats.hp / 1.5}%` }}
                      aria-valuelow="0"
                      aria-valuemin="20"
                      aria-valuemax="130"
                    >
                      <small>{this.state.stats.hp}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <h4>Speed:</h4>
                </div>
                <div className="col-md-10">
                  <div className="progress mt-2">
                    <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressBar"
                      style={{ width: `${this.state.stats.speed / 1.5}%` }}
                      aria-valuelow="0"
                      aria-valuemin="20"
                      aria-valuemax="130"
                    >
                      <small>{this.state.stats.speed}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <h4>Attack:</h4>
                </div>
                <div className="col-md-10">
                  <div className="progress mt-2">
                    <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressBar"
                      style={{ width: `${this.state.stats.attack / 1.5}%` }}
                      aria-valuelow="0"
                      aria-valuemin="20"
                      aria-valuemax="130"
                    >
                      <small>{this.state.stats.attack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <h4>Defense:</h4>
                </div>
                <div className="col-md-10">
                  <div className="progress mt-2">
                    <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressBar"
                      style={{ width: `${this.state.stats.defense / 1.5}%` }}
                      aria-valuelow="0"
                      aria-valuemin="20"
                      aria-valuemax="130"
                    >
                      <small>{this.state.stats.defense}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body mx-auto">
              {/* Inserting images for types of pokemon */}
              <div className="mx-auto">
                {this.state.types.map((type) => this.typeImage(type))}
              </div>
              {/* Inserting modal, and list of pokemons that are same type */}
              <this.Modal>
                <div className="noclick">
                {this.state.pokemon ? (
                  <div className="row">
                    <div className="col-12">
                    <h1>{this.state.firstType}:</h1>
                    </div>
                    
                    {this.state.pokemon.map((pokemon) => (
                      <PokemonCard
                        key={pokemon.pokemon.name}
                        pokemonName={pokemon.pokemon.name}
                        url={pokemon.pokemon.url}
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
                {this.state.pokemon2 ? (
                  <div className="row">
                    <div className="col-12">
                    <h1>{this.state.seccondType}:</h1>
                    </div>

                    {this.state.pokemon2.map((pokemon2) => (
                      <PokemonCard
                        key={pokemon2.pokemon.name}
                        pokemonName={pokemon2.pokemon.name}
                        url={pokemon2.pokemon.url}
                        clickeable ={false}
                      />
                    ))}
                  </div>
                ) : (
          null
                )}
                </div>
                
              </this.Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
