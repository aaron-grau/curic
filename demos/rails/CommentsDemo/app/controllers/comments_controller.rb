class CommentsController < ApplicationController
  def create
    @comment = Comment.create!(comment_params)
    render json: @comment
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy!
    render json: @comment
  end

  def index
    # @comments_tree = Comment.tree
    @comments = Comment.all

    render :index
  end

  def mark_read
    @comments = Comment.find(params[:comment_ids])
    ActiveRecord::Base.transaction do
      @comments.each { |comment| comment.update!(read: params[:state]) }
    end

    render json: @comments
  end

  private
  def comment_params
    params.require(:comment).permit(:parent_comment_id, :text)
  end
end
