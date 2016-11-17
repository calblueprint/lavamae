Rails.application.routes.draw do

  root 'pages#home'
  get '/static_discussion', to: 'static_pages#discussion'
  get '/static_map', to: 'static_pages#map'

  devise_for :users, skip: [:registrations, :passwords]

  devise_scope :user do
    get '/sign_up' => 'registrations#new'
    post '/sign_up' => 'registrations#create'
  end

  resources :users, only: [:show, :update]
  resources :passwords, only: [:update]

  resources :discussions do
    resources :responses
  end
end
