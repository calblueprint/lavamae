Rails.application.routes.draw do

  root 'pages#home'
  get '/discussion', to: 'static_pages#discussion'
  devise_for :users
  resources :discussions do
    resources :responses
  end
end
