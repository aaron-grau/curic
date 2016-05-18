NewAuthDemo::Application.routes.draw do
  get "static_pages/index"

  get "static_pages/about"

  get "static_pages/contact"

  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]

  root :to => "users#show"
end
