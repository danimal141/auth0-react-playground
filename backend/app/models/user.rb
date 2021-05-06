# frozen_string_literal: true

class User < ApplicationRecord
  validates :auth_id, presence: true, uniqueness: { case_sensitive: false }

  class << self
    def from_token_payload(payload)
      return if payload.blank?

      self.find_or_create_by!(auth_id: payload['sub'])
    end
  end
end
