Rails.application.routes.draw do

  root 'pages#home'

  devise_for :users, skip: [:registrations, :passwords], controllers: { confirmations: 'confirmations' }
  devise_scope :user do
    get '/sign_up' => 'registrations#new'
    post '/sign_up' => 'registrations#create'
    get '/users/password_reset' => 'registrations#password_reset', :as => 'edit_user_password'
  end

  resources :users, only: [:show, :update, :destroy]

  resources :users do
    put '/admin_approval', to: 'users#admin_approval_update'
  end

  resources :passwords, only: [:update]

  post '/passwords/request_reset', to: 'passwords#request_reset'
  post '/passwords/reset', to: 'passwords#reset'

  resources :images, only: [:create, :update, :destroy]

  resources :discussions, only: [:index, :create, :show, :update, :destroy] do
    resources :responses do
      post '/upvote', to: 'responses#upvote'
    end
    post '/upvote', to: 'discussions#upvote'
  end

  resources :resource_topics do
    get '/resource_topics/:id', to: 'resource_topics#get_resources'
  end
  resources :locations, :only =>[:create]

  get '/map', to: 'maps#map'
  post '/favorite_discussion/:id', to: 'discussions#favorite'
  delete '/favorite_discussion/:id', to: 'discussions#unfavorite'
  get '/about', to: 'pages#about'
  get '/admin_dashboard', to: 'pages#admin_dashboard'
  delete '/admin_dashboard', to: 'pages#admin_dashboard'
  get '/static_discussion', to: 'static_pages#discussion'
  get '/static_map', to: 'static_pages#map'
  put '/admin_tags/save', to: 'admin_tags#save'

  namespace :api do
    resources :resource_topics, only: [:index]
    resources :responses do
      get '/upvotes', to: 'responses#get_upvotes'
    end
    resources :users do
      get '/profilepic', to: 'users#get_profile_pic'
    end
  end

end
