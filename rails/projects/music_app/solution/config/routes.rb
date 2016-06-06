Musicapp::Application.routes.draw do
  root to: redirect("/bands")

  resource :session, only: [:create, :destroy, :new]
  resources :users, only: [:create, :new, :show] do
    get :activate, on: :collection
  end

  resources :bands do
    resources :albums, only: [:new]
  end

  resources :albums, only: [:create, :destroy, :edit, :show, :update] do
    resources :tracks, only: [:new]
  end

  resources :tracks, only: [:create, :destroy, :edit, :show, :update]

  resources :notes, only: [:create, :destroy]
end
