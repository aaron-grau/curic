const React = require('react');
const PokemonActions = require('../../actions/pokemon_actions.js');
const HashHistory = require('react-router').hashHistory;

module.exports = React.createClass({

  blankAttrs: {
    name: '',
    image_url: '',
    poke_type: 'bug',
    attack: '',
    defense: '',
    move_1: '',
    move_2: ''
  },

  getInitialState () {
    return this.blankAttrs;
  },

  createPokemon (event) {
    event.preventDefault();
    const pokemon = {};

    Object.keys(this.state).forEach((key) => {
      if(key !== "move_1" && key !== "move_2") {
        pokemon[key] = this.state[key];
      }
    });

    pokemon.moves = [this.state.move_1, this.state.move_2];

    PokemonActions.createPokemon(pokemon, (poke) => {
      HashHistory.push(`/pokemon/${poke.id}`);
    });

    this.setState(this.blankAttrs);
  },

  onNameChange (e) {
    this.setState({name: e.target.value});
  },

  onImageChange (e) {
    this.setState({image_url: e.target.value});
  },

  onAttackChange (e) {
    this.setState({attack: e.target.value});
  },

  onDefenseChange (e) {
    this.setState({defense: e.target.value});
  },

  onPokeTypeChange (e) {
    this.setState({poke_type: e.target.value});
  },

  onMove1Change (e) {
    this.setState({move_1: e.target.value});
  },

  onMove2Change (e) {
    this.setState({move_2: e.target.value});
  },

  render () {
    return(
      <form className='new-pokemon' onSubmit={this.createPokemon}>
        <div>
          <label htmlFor='pokemon_name'>Name:</label>
          <input
            type='text'
            id='pokemon_name'
            value={this.state.name}
            onChange={this.onNameChange}
          />
        </div>

        <div>
          <label htmlFor='pokemon_image_url'>Image URL:</label>
          <input
            type='text'
            id='pokemon_image_url'
            value={this.state.image_url}
            onChange={this.onImageChange}
          />
        </div>

        <div>
          <label htmlFor='pokemon_poke_type'>Type:</label>
          <select className='type-selector'
                  id='pokemon_poke_type'
                  value={this.state.type}
                  onChange={this.onPokeTypeChange}>
            {window.pokemonTypes.map((type, i) => {
              return <option value={type} key={i}>{type}</option>;
            })}
          </select>
        </div>

        <div>
          <label htmlFor='pokemon_attack'>Attack:</label>
          <input
            type='number'
            id='pokemon_attack'
            value={this.state.attack}
            onChange={this.onAttackChange}
          />
        </div>

        <div>
          <label htmlFor='pokemon_defense'>Defense:</label>
          <input
            type='number'
            id='pokemon_defense'
            value={this.state.defense}
            onChange={this.onDefenseChange}
          />
        </div>

        <div>
          <label htmlFor='pokemon_move_1'>Move #1:</label>
          <input
            type='text'
            id='pokemon_move_1'
            value={this.state.move_1}
            onChange={this.onMove1Change}
          />
        </div>

        <div>
          <label htmlFor='pokemon_move_2'>Move #2:</label>
          <input
            type='text'
            id='pokemon_move_2'
            value={this.state.move_2}
            onChange={this.onMove2Change}
          />
        </div>

        <button>Create Pokemon</button>
        <br />
      </form>
    );
  }
});
