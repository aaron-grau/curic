const React = require('react');
const RecipesListItem = require('./recipes_list_item');

const RecipesList = React.createClass({
  render() {
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
