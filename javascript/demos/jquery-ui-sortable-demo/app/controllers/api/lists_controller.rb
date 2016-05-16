class Api::ListsController < ApplicationController
  def index
    @lists = List.all(:include => :todos)
    puts @lists.to_json(include: :todos)
    # render :json => @lists.to_json(include: :todos)
    render "api/lists/index"
  end

  def create
    @list = List.new(list_params)
    if @list.save
      # render :json => @list
      render "api/lists/show"
    else
      render :json => @list.errors.full_messages
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update_attributes(list_params)
      render "lists/show"
    else
      render :json => @list.errors.full_messages
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render status: 200, json: {}
  end

  private
  def list_params
    params.require(:list).permit(:title)
  end

end
