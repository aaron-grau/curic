Rails.application.routes.draw do
  namespace :api do
    resources :todos, only: [:index, :show, :create, :destroy, :update] do 
      resources :steps, only: [:create, :destroy, :index]
    end
    resources :steps, only: [:update]
  end

  root to: 'static_pages#root'
end

