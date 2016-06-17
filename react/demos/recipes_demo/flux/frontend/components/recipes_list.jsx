const React = require('react');
const RecipesListItem = require('./recipes_list_item');

const RecipesList = React.createClass({
  render: function () {
    return (
      <ul>
        {
          this.props.recipes.map( (recipe) =>{
            return <RecipesListItem key={recipe.id} recipe={recipe}/>
          })
        }
      </ul>
    );
  }
});

module.exports = RecipesList;
