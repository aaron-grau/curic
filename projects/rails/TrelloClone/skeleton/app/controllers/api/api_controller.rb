module Api
  class ApiController < ApplicationController
    before_action :require_signed_in!

    def require_board_member!
      redirect_to new_session_url unless current_board.is_member?(current_user)
    end

    def require_signed_in!
      unless signed_in?
        render json: ["You must be signed in to perform that action!"], status: :unauthorized
      end
    end
  end
end
