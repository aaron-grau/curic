class ArtworksController < ApplicationController
  def create
    @artwork = Artwork.new(artwork_params)

    if @artwork.save
      render :json => @artwork, :status => :created
    else
      render(
        :json => @artwork.errors.full_messages,
        :status => :unprocessable_entity
      )
    end
  end

  def destroy
    @artwork = Artwork.find(params[:id])
    render :json => @artwork.destroy
  end

  def index
    render :json => Artwork.artworks_for_user_id(params[:user_id])
  end

  def show
    render :json => Artwork.find(params[:id])
  end

  def update
    @artwork = Artwork.find(params[:id])

    if @artwork.update_attributes(artwork_params)
      render :json => @artwork
    else
      render(
        :json => @artwork.errors.full_messages,
        :status => :unprocessable_entity
      )
    end
  end

  private
  def artwork_params
    params.require(:artwork).permit(:title, :image_url, :artist_id)
  end
end
