# frozen_string_literal: true

module Resolvers
  class CurrentUserResolver < LoginRequiredResolver
    type Types::UserType, null: false

    def resolve
      context.current_user
    end
  end
end
