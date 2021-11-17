# frozen_string_literal: true

class SecureRequestsController < ApplicationController
  before_action :authenticate_user!

  def new
    p '-----------'
    pp params
    render :new, layout: false
  end

  def create
    p '-------'
    pp session[:userinfo]
    redirect_to secure_requests_complete_url
  end

  def complete
  end

  private

  def authenticate_user!
    p '----------'
    return if logged_in?
    redirect_to auth_logout_url
  end

  def logged_in?
    userinfo = session[:userinfo]
    return false if userinfo.blank? || userinfo['auth_time'].blank?
    pp Time.zone.now.to_i
    pp userinfo['auth_time'].to_i
    return Time.zone.now.to_i - userinfo['auth_time'].to_i < 30
  end
end
