class ArtworkSharesController < ApplicationController
  def create
    @share = ArtworkShare.create(artwork_share_params)
    render :json => @share
  end

  def destroy
    @share = ArtworkShare.find(params[:id])
    @share.destroy
    render :json => @share
  end

  private
  def artwork_share_params
    params.require(:artwork_share).permit(:artwork_id, :viewer_id)
  end
end
