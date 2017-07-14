Rails.application.routes.draw do
  resources :cats, except: :destroy
  resources :cat_rental_requests, only: %i(create new) do
    post "approve", on: :member
    post "deny", on: :member
  end
  resource :session, only: %i(create destroy new)
  resources :users, only: %i(create new)

  root to: redirect("/cats")

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
