GoalingApp::Application.routes.draw do
  resource :session, :only => [:new, :create, :destroy]
  resources :users, :only => [:new, :create, :show, :index]
  root :to => "users#index"
  resources :goals do
    resources :cheers, :only => [:create]
  end
  resources :cheers, :only => [:index]
  resources :comments, :only => [:create]
end
