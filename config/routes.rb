Rails.application.routes.draw do

  root 'pages#home'
  get '/static_discussion', to: 'static_pages#discussion'
  get '/static_map', to: 'static_pages#map'
  get '/map', to: 'maps#map'
  devise_for :users, skip: [:registrations]

  devise_scope :user do
    get '/sign_up' => 'registrations#new'
    post '/sign_up' => 'registrations#create'
  end

  resources :discussions do
    resources :responses
  end
end
