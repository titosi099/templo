import bcrypt from 'bcrypt'
import Promisse from 'bluebird'
import Bookshelf from '../config/db'

const Users = Bookshelf.Model.extend({
  tableName: 'geral.usuarios',
  idAttribute: 'usu_codigo',
  hasTimestamps: true,
  getAll () {
    return this
      .fetchAll()
      .then(result => result ? result.toJSON() : [])
  },
  getById (id) {
    return this
      .where({usu_codigo: id})
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
      .where({ usu_codigo: id })
      .save(data, { method: 'update' })
      .then(result => result.toJSON())
  },
  remove (id) {
    return this
      .where({ usu_codigo: id })
      .destroy()
      .then(result => result.toJSON())
  },
  initialize () {
    this.on('creating', this.hashPassword, this)
  },
  hashPassword (model) {
    return new Promisse((resolve, reject) => {
      bcrypt.hash(model.attributes.usu_password, 10, (err, hash) => {
        if (err) reject(err)
        model.set({usu_password: hash})
        resolve(hash)
      })
    })
  },
  isPassword (encodedPassword, password) {
    return new Promisse((resolve, reject) => {
      bcrypt.compare(password, encodedPassword, (err, match) => {
        if (err) reject(err)
        resolve(match)
      })
    })
  }
})

export default Bookshelf.model('Users', Users)
