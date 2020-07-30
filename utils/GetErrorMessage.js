const getErrorMessage = (error) => {
  // eslint-disable-next-line camelcase
  const firstErrors = error?.response?.data?.first_errors ?? null
  const messages = Object.values(firstErrors)
  if (messages.length > 0) {
    return messages[0]
  }
  return 'Some error occurred'
}

export default getErrorMessage
