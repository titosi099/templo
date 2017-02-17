import MembersController from './members.controller'

export default (app) => {
  const membersController = new MembersController()
  app
    .route('/members')
    .get((req, res) => {
      const pagination ={
        limit: req.query.limit,
        offset: req.query.offset
      }
      membersController
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .post((req, res) => {
      membersController
        .create(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
    })

  app
    .route('/members/:id')
    .get((req, res) => {
      membersController
      .getById(req.params.id)
      .then(response => res.status(response.statusCode).json(response.data))
      .catch(() => res.sendStatus(500))
    })
    .put((req, res) => {
      membersController
        .update(req.body, req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
        .catch(() => res.sendStatus(500))
    })
    .delete((req, res) => {
      membersController
        .delete(req.params.id)
        .then(response => res.sendStatus(response.statusCode))
        .catch(() => res.sendStatus(500))
    })
}
