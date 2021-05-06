# frozen_string_literal: true

module Mutations
  class LoginRequiredMutation < Mutations::BaseMutation
    def authorized?(*args)
      super
      unless context.current_user
        raise GraphQL::ExecutionError.new('Unauthorized!!!', options: { status: :unauthorized, code: 401 })
      end

      true
    end
  end
end
