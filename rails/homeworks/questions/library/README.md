
```ruby
Rails.application.routes.draw do
  resources :books, only: [:index, :destroy]
end
```

```ruby
Rails.application.routes.draw do
  resources :books, only: [:new, :create, :index, :destroy]
end
```
