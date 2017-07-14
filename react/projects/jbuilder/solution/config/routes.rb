Rails.application.routes.draw do
  get 'parties/index'

  get 'parties/show'

  get 'guests/index'

  get 'guests/show'

  get 'gifts/index'

  get 'gifts/show'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
