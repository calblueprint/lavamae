Rails.application.routes.draw do

  root 'pages#home'
  get '/static_discussion', to: 'static_pages#discussion'
  devise_for :users, skip: [:registrations]

  devise_scope :user do
    get '/sign_up' => 'registrations#new'
    post '/sign_up' => 'registrations#create'
  end

  resources :discussions do
    resources :responses
  end

  resources :documents, only: [:index, :new, :create, :destroy]
end
