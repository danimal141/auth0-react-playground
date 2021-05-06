# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :auth_id, String, null: false
  end
end
