const React = require('react');
const RecipesForm = require('./RecipesForm');
const RecipesList = require('./RecipesList');
const RecipeStore = require('../stores/recipe');
const recipeActions = require('../actions/recipe_actions');

const Recipes = React.createClass({
  getInitialState() {
    return { recipes: RecipeStore.all() };
  },
  createRecipe(recipe){
    recipeActions.createRecipe(recipe);
  },
  _recipesChanged () {
    this.setState({recipes: RecipeStore.all()});
  },
  componentDidMount(){
    RecipeStore.addListener(this._recipesChanged);
  },
  render() {
    return (
      <div>
          <RecipesForm create={this.createRecipe}/>
          <RecipesList recipes={this.state.recipes}/>
      </div>
    );
  }
});

module.exports = Recipes;
