Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :pokemon, only: [:create, :destroy, :index, :show, :update]
    resources :toys, only: [:show, :update]
  end
end

