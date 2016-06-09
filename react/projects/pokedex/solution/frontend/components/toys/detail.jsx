const React = require('react');
const PokemonStore = require('../../stores/pokemon.js');
const ToyActions = require('../../actions/toy_actions.js');
const HashHistory = require('react-router').hashHistory;

module.exports = React.createClass({
  getStateFromStore () {
    const pokemon = PokemonStore.find(parseInt(this.props.params.pokemonId));
    let toy;
    pokemon && pokemon.toys && pokemon.toys.forEach((t) => {
      if(t.id === parseInt(this.props.params.toyId)) { toy = t; }
    });
    return {toy: toy};
  },

  _onChange () {
    this.setState(this.getStateFromStore());
  },

  getInitialState () {
    return this.getStateFromStore();
  },

  componentDidMount () {
    this.pokemonListener = PokemonStore.addListener(this._onChange);
  },

  componentWillUnmount () {
    this.pokemonListener.remove();
  },

  componentWillReceiveProps (newProps) {
    this._onChange();
  },


  changeOwner (event) {
    this.state.toy.pokemon_id = event.target.value;

    ToyActions.updateToy(this.state.toy, (pokemon) => {
      HashHistory.push(`/pokemon/${pokemon.id}/toys/${this.state.toy.id}`);
    });
  },

  render () {
    if (typeof this.state.toy === 'undefined') { return <div></div>; }

    return(
      <div className="toy-detail-pane">
        <div className="detail">
          <img className="toy-image" src={this.state.toy.image_url} />
          {['name', 'happiness', 'price'].map((attr) => {
            return <p key={attr}>{attr}: {this.state.toy[attr]}</p>;
          })}
          <h2>Pokemon: </h2>
          <select value={this.state.toy.pokemon_id} onChange={this.changeOwner}>
            {PokemonStore.all().map((p) => {
              return <option key={p.id} value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
        </div>
    );
  }
});
