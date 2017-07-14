Rails.application.routes.draw do
  get 'users/new'

  get 'sessions/new'

  resources :cats, except: :destroy
  resources :cat_rental_requests, only: %i(create new) do
    post "approve", on: :member
    post "deny", on: :member
  end

  root to: redirect("/cats")

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
