Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :benches, only: [:index, :create]
    resources :reviews, only: [:create]
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resource :favorites, only: [:create, :destroy]
  end

  root "static_pages#root"
end
