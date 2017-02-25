Rails.application.routes.draw do

  root 'pages#home'

  devise_for :users, skip: [:registrations, :passwords]
  devise_scope :user do
    get '/sign_up' => 'registrations#new'
    post '/sign_up' => 'registrations#create'
    get '/users/password_reset' => 'registrations#password_reset', :as => 'edit_user_password'
  end

  resources :users, only: [:show, :update]

  resources :users do
    put '/map_approval', to: 'users#map_approval_update'
  end

  resources :passwords, only: [:update]

  post '/passwords/request_reset', to: 'passwords#request_reset'
  post '/passwords/reset', to: 'passwords#reset'

  resources :discussions do
    resources :responses
  end

  resources :resources
  resources :resource_topics do
    get '/resource_topics/:id', to: 'resource_topics#get_resources'
  end
  resources :locations, :only =>[:create]

  get '/map', to: 'maps#map'
  post '/favorite_discussion/:id', to: 'discussions#favorite'
  delete '/favorite_discussion/:id', to: 'discussions#unfavorite'
  get '/static_discussion', to: 'static_pages#discussion'
  get '/static_map', to: 'static_pages#map'

end
