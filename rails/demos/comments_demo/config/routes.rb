Rails.application.routes.draw do
  root to: "static_pages#root"
  resources(
    :comments,
    defaults: { format: :json },
    only: [:create, :destroy, :index]
  ) do
    post :mark_read, on: :collection
  end
end
