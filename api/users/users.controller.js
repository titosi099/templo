import Users from './users.model'

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
function getAll () {
  return Users
    .forge()
    .getAll()
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function getById (idUser) {
  return Users
    .forge()
    .getById(idUser)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function create (data) {
  return Users
    .forge()
    .create(data)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function update (data, idUser) {
  return Users
    .forge()
    .update(idUser, data)
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}

function remove (idUser) {
  return Users
    .forge()
    .where({usu_codigo: idUser})
    .destroy()
    .then(result => defaultResponse(result))
    .catch(err => errorResponse(err.message))
}
