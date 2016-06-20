const React = require('react');

const RecipesListItem = React.createClass({
  getInitialState: function(){
    return { expanded: false };
  },
  toggleExpand: function(){
    this.setState({expanded: !this.state.expanded});
  },
  render: function () {
    let steps = "";
    if (this.state.expanded){
      steps = this.props.recipe.ingredients.map((ingredient) =>{
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
