class BasketballTeamsController < ApplicationController
  # before_filter :authenticate_user

  def index
    @teams = BasketballTeam.all
  end
end
