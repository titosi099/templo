import Members from './members.model'

const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
})

const errorResponse = (message, statusCode = 422) => defaultResponse({
  error: message
}, statusCode)

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}

function getAll (paginaion) {
  return Members
    .forge()
    .getAll()
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function getById (idMember) {
  return Members
    .forge()
    .getById(idMember)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function create (data) {
  return Members
    .forge()
    .create(data)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function update (data, idMember) {
  return Members
    .forge()
    .update(idMember, data)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function remove (idMember) {
  return Members
    .forge()
    .remove(idMember)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}
