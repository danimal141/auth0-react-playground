function addEmailToAccessToken(user, context, callback) {
  const namespace = configuration.namespace

  context.accessToken[namespace + 'email'] = user.email
  return callback(null, user, context)
}
