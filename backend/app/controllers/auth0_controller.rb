# frozen_string_literal: true

class Auth0Controller < ApplicationController
  def callback
    p '----------authinfo'
    auth_info = request.env['omniauth.auth']
    pp auth_info
    pp params
    session[:userinfo] = (auth_info['extra']['raw_info']).merge(new_email: params[:email])
    redirect_to secure_requests_new_url
  end

  def failure
    error_msg = request.env['omniauth.error']
    error_type = request.env['omniauth.error.type']

    # It's up to you what you want to do with the error information
    # You could display it to the user or log it somehow.
    Rails.logger.debug("Auth0 Error: #{error_msg}. Error Type: #{error_type}")

    render body: nil
  end

  def logout
    reset_session
    redirect_to logout_url
  end

  private

  def logout_url
    request_params = {
      returnTo: root_url,
      client_id: ENV['AUTH0_RAILS_APP_CLIENT_ID']
    }

    URI::HTTPS.build(host: ENV['AUTH0_DOMAIN'], path: '/v2/logout', query: to_query(request_params)).to_s
  end

  def to_query(hash)
    hash.map { |k, v| "#{k}=#{CGI.escape(v)}" unless v.nil? }.reject(&:nil?).join('&')
  end
end
