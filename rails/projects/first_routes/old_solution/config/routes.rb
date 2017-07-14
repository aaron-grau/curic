FirstRoutes::Application.routes.draw do
  resources :users

  ## The above line is shorthand for all of the following 8 lines...

  # get "/users", to: "users#index", as: "users"
  # post "/users", to: "users#create"
  # get "/users/new", to: "users#new", as: "new_user"
  # get "/users/:id/edit", to: "users#edit", as: "edit_user"
  # get "/users/:id", to: "users#show", as: "user"
  # patch "/users/:id", to: "users#update"
  # put "/users/:id", to: "users#update"
  # delete "/users/:id", to: "users#destroy"
end
