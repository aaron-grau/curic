const React = require('react');
const RecipesForm = require('./RecipesForm');
const RecipesList = require('./RecipesList');
const RecipeStore = require('../stores/recipe');
const recipeActions = require('../actions/recipe_actions');

const Recipes = React.createClass({
  getInitialState: function () {
    return { recipes: RecipeStore.all() };
  },
  createRecipe: function(recipe){
    recipeActions.createRecipe(recipe);
  },
  _recipesChanged: function () {
    this.setState({recipes: RecipeStore.all()});
  },
  componentDidMount: function(){
    RecipeStore.addListener(this._recipesChanged);
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
