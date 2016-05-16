class Api::TodosController < ApplicationController
  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo
    else
      render json: todo.errors.full_messages, status: 422
    end
  end

  def index
    render json: Todo.all
  end

  def show
    render json: Todo.find(params[:id])
  end

  def destroy
    if Todo.find(params[:id]).try(:destroy!)
      render json: { message: 'destroyed' }
    else
      render json: { message: 'invalid todo', status: 404 }
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo
      todo.update(todo_params)
      render json: todo
    else
      render json: { message: 'not found', status: 404 }
    end
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :done, :body)
  end
end
