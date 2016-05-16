Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resources :todos, only: [:index, :show, :update, :create, :destroy] do
      resources :steps, only: [:create, :destroy, :index]
    end

    resources :steps, only: [:update]
  end
end
