class CheersController < ApplicationController
  before_filter :require_current_user!

  def create
    redirect_to(:back) if current_user.cheer_count <= 0

    @cheer = Cheer.new(giver_id: current_user.id,
    goal_id: params[:goal_id])
    if @cheer.save
      current_user.decrement_cheer_count!
      raise "went over cheer limit" if current_user.cheer_count < 0
      goal_owner_name = Goal.find(params[:goal_id]).author.username
      flash[:notices] = ["You cheered #{goal_owner_name}'s goal!"]
      redirect_to(:back)
    else
      flash[:errors] = @cheer.errors.full_messages
      redirect_to(:back)
    end
  end

  def index
    @cheers = current_user.cheers_received
  end

  private

  def cheer_params
    params.require(:cheer).permit(:giver_id, :goal_id)
  end
end
