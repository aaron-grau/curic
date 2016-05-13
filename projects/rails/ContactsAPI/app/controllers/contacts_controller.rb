class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      render :json => @contact, :status => :created
    else
      render(
        :json => @contact.errors.full_messages,
        :status => :unprocessable_entity
      )
    end
  end

  def destroy
    @contact = Contact.find(params[:id])
    render :json => @contact.destroy
  end

  def index
    render :json => Contact.contacts_for_user_id(params[:user_id])
  end

  def show
    render :json => Contact.find(params[:id])
  end

  def update
    @contact = Contact.find(params[:id])

    if @contact.update_attributes(contact_params)
      render :json => @contact
    else
      render(
        :json => @contact.errors.full_messages,
        :status => :unprocessable_entity
      )
    end
  end

  private
  def contact_params
    params.require(:contact).permit(:name, :email, :user_id)
  end
end
