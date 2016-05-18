class Api::RecipesController < ApplicationController
  def index
    sleep 1
    render json: Recipe.all.includes(:ingredients).to_json(include: :ingredients)
  end

  def create
    recipe = Recipe.new(recipe_params)
    if recipe.save
      render json: recipe
    else
      render json: { errors: recipe.errors.full_messages }, status: 422
    end
  end

  def recipe_params
    params.require(:recipe).permit(:name)
  end
end
