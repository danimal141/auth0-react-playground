# frozen_string_literal: true

class AppSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  context_class(AppSchema::CustomContext)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections

  def self.id_from_object(object, type, _ctx)
    Base64.urlsafe_encode64("#{type.name}/#{object.id}")
  end
end
