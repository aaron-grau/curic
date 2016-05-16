var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ClientActions = require('../../actions/clientActions.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  blankAttrs: {
    name: '',
    image_url: '',
    poke_type: 'bug',
    attack: '',
    defense: '',
    move_1: '',
    move_2: ''
  },

  getInitialState: function () {
    return this.blankAttrs;
  },

  createPokemon: function (event) {
    event.preventDefault();
    var pokemon = {};
    Object.keys(this.state).forEach(function (key) {
      if(key != "move_1" && key != "move_2") { pokemon[key] = this.state[key]; }
    }.bind(this))
    pokemon.moves = [this.state.move_1, this.state.move_2];
    
    ClientActions.createPokemon(pokemon, function (id) {
      this.context.router.push("/pokemon/" + id);
    }.bind(this));
    this.setState(this.blankAttrs);
  },

  render: function () {
    return(
      <form className='new-pokemon' onSubmit={this.createPokemon}>
        <div>
          <label htmlFor='pokemon_name'>Name:</label>
          <input
            type='text'
            id='pokemon_name'
            valueLink={this.linkState("name")}
          />
        </div>

        <div>
          <label htmlFor='pokemon_image_url'>Image URL:</label>
          <input
            type='text'
            id='pokemon_image_url'
            valueLink={this.linkState("image_url")}
          />
        </div>

        <div>
          <label htmlFor='pokemon_poke_type'>Type:</label>
          <select className='type-selector' id='pokemon_poke_type' valueLink={this.linkState("poke_type")}>
            {window.pokemonTypes.map(function (type, i) {
              return <option value={type} key={i}>{type}</option>;
            })}
          </select>
        </div>

        <div>
          <label htmlFor='pokemon_attack'>Attack:</label>
          <input
            type='number'
            id='pokemon_attack'
            valueLink={this.linkState("attack")}
          />
        </div>

        <div>
          <label htmlFor='pokemon_defense'>Defense:</label>
          <input
            type='number'
            id='pokemon_defense'
            valueLink={this.linkState("defense")}
          />
        </div>

        <div>
          <label htmlFor='pokemon_move_1'>Move #1:</label>
          <input
            type='text'
            id='pokemon_move_1'
            valueLink={this.linkState("move_1")}
          />
        </div>

        <div>
          <label htmlFor='pokemon_move_2'>Move #2:</label>
          <input
            type='text'
            id='pokemon_move_2'
            valueLink={this.linkState("move_2")}
          />
        </div>

        <button>Create Pokemon</button>
        <br />
      </form>
    );
  }
});
