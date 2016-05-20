var React = require('react');
var RecipesListItem = require('./RecipesListItem');

var RecipesList = React.createClass({
  render: function () {
    return (
      <ul>
        {
          this.props.recipes.map(function(recipe){
            return <RecipesListItem key={recipe.id} recipe={recipe}/>
          })
        }
      </ul>
    );
  }
});

module.exports = RecipesList;
