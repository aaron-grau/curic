class PostsController < ApplicationController
  before_action :require_signed_in!, except: [:show]
  before_action :require_user_owns_post!, only: [:edit, :update]

  def new
    @post = Post.new
    render :new
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
    render :edit
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  def downvote; vote(-1); end
  def upvote; vote(1); end

  private
  def post_params
    params.require(:post).permit(
      :url, :title, :content, :user_id, sub_ids: []
    )
  end

  def require_user_owns_post!
    return if Post.find(params[:id]).author == current_user
    render json: "Forbidden", status: :forbidden
  end

  def vote(direction)
    @post = Post.find(params[:id])
    @user_vote = UserVote.find_by(
      votable_id: @post.id, votable_type: "Post", user_id: current_user.id
    )

    if @user_vote
      @user_vote.update(value: direction)
    else
      @post.user_votes.create!(
        user_id: current_user.id, value: direction
      )
    end

    redirect_to post_url(@post)
  end
end
