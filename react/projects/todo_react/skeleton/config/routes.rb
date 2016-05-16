Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defualts: { format: :json } do
    resources :todos, except: [:new, :edit]
  end
end
