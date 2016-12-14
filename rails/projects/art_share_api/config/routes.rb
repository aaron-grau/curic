Rails.application.routes.draw do
  resources(
    :artworks,
    :only => [:create, :destroy, :show, :update]
  )
  resources :artwork_shares, :only => [:create, :destroy]

  resources :users, :only => [:create, :destroy, :index, :show, :update] do
    resources :artworks, :only => [:index]
  end
end
