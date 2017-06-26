import UsersCtrl from './users.controller'

export default app => {
  app
    .route('/users')
    .get((req, res) => {
      UsersCtrl
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
    })
    .post((req, res) => {
      UsersCtrl
        .create(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
    })

  app
    .route('/users/:id')
    .get((req, res) => {
      UsersCtrl
        .getById(req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
    })
    .put((req, res) => {
      UsersCtrl
        .update(req.body, req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
    })
    .delete((req, res) => {
      UsersCtrl
        .remove(req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
    })
}
