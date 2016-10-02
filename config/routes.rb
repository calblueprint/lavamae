Rails.application.routes.draw do

  devise_for :users
  root 'pages#home'
  get '/discussion', to: 'static_pages#discussion'

  resources :responses
  resources :discussions
end
