const React = require('react');
const RecipesForm = require('./recipes_form');
const RecipesList = require('./recipes_list');
const RecipeStore = require('../stores/recipe');
const RecipeActions = require('../actions/recipe_actions');

const Recipes = React.createClass({
  getInitialState: function () {
    return { recipes: RecipeStore.all() };
  },
  createRecipe: function(recipe){
    RecipeActions.createRecipe(recipe);
  },
  _recipesChanged: function () {
    this.setState({recipes: RecipeStore.all()});
  },
  componentDidMount: function(){
    RecipeStore.addListener(this._recipesChanged);
    RecipeActions.fetchRecipes();
  },
  render: function () {
    return (
      <div>
          <RecipesForm create={this.createRecipe}/>
          <RecipesList recipes={this.state.recipes}/>
      </div>
    );
  }
});

module.exports = Recipes;
