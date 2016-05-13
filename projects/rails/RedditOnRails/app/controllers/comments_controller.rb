class CommentsController < ApplicationController
  before_action :require_signed_in!, only: [:new, :create]

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      redirect_to post_url(@comment.post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      redirect_to new_post_comment_url(@comment.post_id)
    end
  end

  def new
    @comment = Comment.new(post_id: params[:post_id])
    render :new
  end

  def show
    @comment = Comment.find_by_id(params[:id])
    @new_comment = Comment.new(
      post_id: @comment.post_id, parent_comment_id: @comment.id
    )

    render :show
  end


  def downvote; vote(-1); end
  def upvote; vote(1); end

  private
  def comment_params
    params.require(:comment).permit(:body, :post_id, :parent_comment_id)
  end

  def vote(direction)
    @comment = Comment.find(params[:id])
    @user_vote = UserVote.find_by(
      votable_id: @comment.id, votable_type: "Comment", user_id: current_user.id
    )

    if @user_vote
      @user_vote.update(value: direction)
    else
      @comment.user_votes.create!(
        user_id: current_user.id, value: direction
      )
    end

    redirect_to comment_url(@comment)
  end
end
