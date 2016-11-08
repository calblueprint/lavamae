Rails.application.routes.draw do

  root 'pages#home'
  get '/static_discussion', to: 'static_pages#discussion'
  devise_for :users, skip: [:registrations, :passwords]

  devise_scope :user do
    get '/sign_up' => 'registrations#new'
    post '/sign_up' => 'registrations#create'
    get '/password_update' => 'registrations#password_update', :as => :password_update
  end

  resources :users, only: [:show, :update]
  resources :passwords, only: [:update]

  resources :discussions do
    resources :responses
  end
end
