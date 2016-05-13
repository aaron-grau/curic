module ApplicationHelper
  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def authenticate_user
    if logged_in?
      return true
    else
      user = User.find_by_username(params[:username])
      if user.password == params[:password]
        @current_user = user
        return true
      end
      false
    end
  end
end
