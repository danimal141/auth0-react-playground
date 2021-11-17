# frozen_string_literal: true

Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'

  root to: 'top#index'
  get '/auth/auth0/callback' => 'auth0#callback'
  get '/auth/failure' => 'auth0#failure'
  get '/auth/logout' => 'auth0#logout'

  get '/secure_requests/new' => 'secure_requests#new'
  get '/secure_requests/complete' => 'secure_requests#complete'
  post '/secure_requests' => 'secure_requests#create'

  mount ActionCable.server, at: '/cable'
end
