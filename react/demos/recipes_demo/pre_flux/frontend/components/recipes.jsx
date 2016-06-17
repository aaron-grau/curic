const React = require('react');
const RecipesForm = require('./recipes_form');
const RecipesList = require('./recipes_list');
const RecipeStore = require('../stores/recipe');

const Recipes = React.createClass({
  getInitialState() {
    return { recipes: RecipeStore.all() };
  },
  createRecipe(recipe) {
    RecipeStore.create(recipe);
  },
  _recipesChanged() {
    this.setState({recipes: RecipeStore.all()});
  },
  componentDidMount() {
    RecipeStore.addChangeHandler(this._recipesChanged);
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
