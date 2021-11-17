# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    ENV['AUTH0_RAILS_APP_CLIENT_ID'],
    ENV['AUTH0_RAILS_APP_CLIENT_SECRET'],
    ENV['AUTH0_DOMAIN'],
    callback_path: '/auth/auth0/callback',
    authorize_params: {
      scope: 'openid',
      max_age: 1000,
    },
    # provider_ignores_state: true
  )
end
