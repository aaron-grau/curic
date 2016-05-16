class Api::TodosController < ApplicationController
  def create
    @todo = todo.new(todo_params)
    if @todo.save
      render :json => @todo
    else
      render :json => @todo.errors.full_messages
    end
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update_attributes(todo_params)
      render :json => @todo
    else
      render :json => @todo.errors.full_messages
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render status: 200, json: {}
  end

  private
  def todo_params
    params.require(:todo).permit(:body, :todo_order, :list_id)
  end

end
