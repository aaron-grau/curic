class ContactSharesController < ApplicationController
  def create
    @share = ContactShare.create(contact_share_params)
    render :json => @share
  end

  def destroy
    @share = ContactShare.find(params[:id])
    @share.destroy
    render :json => @share
  end

  private
  def contact_share_params
    params.require(:contact_share).permit(:contact_id, :user_id)
  end
end
