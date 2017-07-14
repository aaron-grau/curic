GoalingApp::Application.routes.draw do
  root to: "users#index"
  
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show, :index]
  resources :goals do
    resources :cheers, only: [:create]
  end
  resources :cheers, only: [:index]
  resources :comments, only: [:create]
end
