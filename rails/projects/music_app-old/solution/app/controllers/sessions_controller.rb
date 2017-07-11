class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user.nil?
      flash[:errors] = ["Invalid credentials."]
      render :new

    # Notice we have User#activated? even though we didn't define it!
    # Rails gives you this method for free because it matches a column name.
    elsif !user.activated?
      redirect_to root_url, alert: "You must activate your account first! Check your email."
    else
      login_user!(user)
      redirect_to root_url
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil

    redirect_to new_session_url
  end

  def new
    render :new
  end
end
