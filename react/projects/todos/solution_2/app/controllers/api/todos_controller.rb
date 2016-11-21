class Api::TodosController < Api::ApiController
  def index
    render json: Todo.all, include: :tags
  end

  def show
    render json: Todo.find(params[:id]), include: :tags
  end

  def create
    @todo = current_user.todos.new(todo_params)
    if @todo.save
      @todo.update_tags(tag_params)
      render json: @todo, include: :tags
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
    render json: @todo, include: :tags
  end

  def update
    @todo = Todo.find(params[:id])
    @todo.update(todo_params)
    @todo.update_tags(tag_params)
    render json: @todo, include: :tags
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end

  def tag_params
    params.require(:todo).permit(tags: [])[:tags] || []
  end
end
