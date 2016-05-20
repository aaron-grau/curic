var React = require('react');
var RecipesForm = require('./RecipesForm');
var RecipesList = require('./RecipesList');
var RecipeStore = require('../stores/recipe');
var recipeActions = require('../actions/recipe_actions');

var Recipes = React.createClass({
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
