Rails.application.routes.draw do

  root 'pages#home'
  devise_for :users
  get '/discussion', to: 'static_pages#discussion'

  resources :responses
  resources :discussions
end
