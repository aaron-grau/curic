Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :todos, only: [:index, :show, :create, :destroy, :update] do
      resources :steps, only: [:create, :destroy, :index]
    end
    resources :steps, only: [:update]
  end

  root to: 'static_pages#root'
end
