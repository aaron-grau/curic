RedditOnRails::Application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  resources :comments, only: [:create, :show] do
    member do
      post "downvote"
      post "upvote"
    end
  end
  resources :subs, except: [:destroy]
  resources :posts, except: [:destroy, :index] do
    resources :comments, only: [:new]
    member do
      post "downvote"
      post "upvote"
    end
  end

  root to: redirect("/subs")
end
