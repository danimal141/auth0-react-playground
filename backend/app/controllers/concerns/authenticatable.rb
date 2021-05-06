# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  SCOPES = {}.freeze

  # included do
  #   before_action :authenticate_request!
  # end

  def current_user
    @current_user ||= User.from_token_payload(auth_payload)
  end

  private

  def auth_payload
    auth_payload, = retrieve_auth_token
    auth_payload
  rescue JWT::VerificationError, JWT::DecodeError, ActiveRecord::RecordInvalid
    nil
  end

  # def authenticate_request
  #   @auth_payload, @auth_header = auth_token
  #   @user = User.from_token_payload(@auth_payload)
  #   render json: { errors: ['Insufficient scope'] }, status: :forbidden unless scope_included
  # rescue JWT::VerificationError, JWT::DecodeError, ActiveRecord::RecordInvalid
  #   render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  # end

  def http_token
    request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?
  end

  def retrieve_auth_token
    JsonWebToken.verify(http_token)
  end

  def scope_included
    # The intersection of the scopes included in the given JWT and the ones in the SCOPES hash needed to access
    # the PATH_INFO, should contain at least one element
    return true if SCOPES[request.env['PATH_INFO']].nil?

    (String(@auth_payload['scope']).split(' ') & (SCOPES[request.env['PATH_INFO']])).any?
  end
end
