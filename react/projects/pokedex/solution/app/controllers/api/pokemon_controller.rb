class Api::PokemonController < ApplicationController
  def create
    pokemon = Pokemon.new(pokemon_params)

    if pokemon.save
      render json: pokemon
    else
      render json: pokemon.errors.full_messages, status: 422
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon
  end

  def index
    sleep 1
    pokemon_hash = {}
    Pokemon.all.each do |pokemon|
      pokemon_hash[pokemon.id] = pokemon
    end
    render json: pokemon_hash
  end

  def show
    sleep 1
    pokemon = Pokemon.find(params[:id])
    render json: pokemon, include: [:items]
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(
      :image_url, :attack, :defense, :name, :poke_type, moves: []
    )
  end
end
