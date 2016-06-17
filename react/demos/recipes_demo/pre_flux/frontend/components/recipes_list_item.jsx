const React = require('react');

const RecipesListItem = React.createClass({
  getInitialState(){
    return { expanded: false };
  },
  toggleExpand(){
    this.setState({expanded: !this.state.expanded});
  },
  render() {
    let steps = "";
    if (this.state.expanded){
      steps = this.props.recipe.ingredients.map(function(ingredient){
        return <li key={ingredient.id}>{ingredient.name}</li>;
      });
    }
    return (
      <div onClick={this.toggleExpand}>
        {this.props.recipe.name}
        <ul>{steps}</ul>
      </div>
    );
  }
});

module.exports = RecipesListItem;
