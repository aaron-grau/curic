JqueryUiDemo::Application.routes.draw do

  namespace "api", :defaults => { :format => :json } do
    resources :lists, :only => [:index, :create, :update, :destroy]
    resources :todos, :only => [:create, :update, :destroy]
  end

  root :to => "root#index"


end
