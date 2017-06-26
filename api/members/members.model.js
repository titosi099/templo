import Bookshelf from '../config/db'

const Members = Bookshelf.Model.extend({
  tableName: 'geral.membros',
  idAttribute: 'mem_codigo',
  hasTimestamps: true,
  getAll () {
    return this
      .fetchAll()
      .then(result => result ? result.toJSON() : [])
  },
  getById (id) {
    return this
      .where({mem_codigo: id})
      .fetch()
      .then(result => result ? result.toJSON() : {})
  },
  create (data) {
    return this
      .save(data, { method: 'insert' })
      .then(result => result.toJSON())
  },
  update (id, data) {
    return this
      .where({ mem_codigo: id })
      .save(data, { method: 'update' })
      .then(result => result.toJSON())
  },
  remove (id) {
    return this
      .where({ mem_codigo: id })
      .destroy()
      .then(result => result.toJSON())
  }
})

export default Bookshelf.model('Members', Members)
