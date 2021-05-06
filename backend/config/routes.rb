# frozen_string_literal: true

Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'

  mount ActionCable.server, at: '/cable'
end
