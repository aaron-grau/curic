const React = require('react');
const RecipesForm = require('./recipes_form');
const RecipesList = require('./recipes_list');
const RecipeStore = require('../stores/recipe');
const RecipeActions = require('../actions/recipe_actions');

const Recipes = React.createClass({
  getInitialState() {
    return { recipes: RecipeStore.all() };
  },
  createRecipe(recipe){
    RecipeActions.createRecipe(recipe);
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
