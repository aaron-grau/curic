FirstRoutes::Application.routes.draw do
  resources(
    :contacts,
    :only => [:create, :destroy, :show, :update]
  )
  resources :contact_shares, :only => [:create, :destroy]

  resources :users, :only => [:create, :destroy, :index, :show, :update] do
    resources :contacts, :only => [:index]
  end
end
