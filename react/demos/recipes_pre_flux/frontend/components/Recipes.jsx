var React = require('react');
var RecipesForm = require('./RecipesForm');
var RecipesList = require('./RecipesList');
var RecipeStore = require('../stores/recipe');

var Recipes = React.createClass({
  getInitialState: function () {
    return { recipes: RecipeStore.all() };
  },
  createRecipe: function(recipe){
    RecipeStore.create(recipe);
  },
  _recipesChanged: function () {
    this.setState({recipes: RecipeStore.all()});
  },
  componentDidMount: function(){
    RecipeStore.addChangeHandler(this._recipesChanged);
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
