# frozen_string_literal: true

class AppSchema::CustomContext < GraphQL::Query::Context
  def current_user
    self[:current_user]
  end

  def current_user=(new_current_user)
    self[:current_user] = new_current_user
  end

  def request
    self[:request]
  end

  def inspect
    "#<CustomContext viewer=#{current_user&.name.inspect}>"
  end
end
