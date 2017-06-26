import MembersCtrl from './members.controller'

export default (app) => {
  app
    .route('/members')
    .get((req, res) => {
      const pagination = {
        limit: req.query.limit,
        offset: req.query.offset
      }
      MembersCtrl
        .getAll()
        .then(response => res.status(response.statusCode).json(response.data))
    })
    .post((req, res) => {
      MembersCtrl
        .create(req.body)
        .then(response => res.status(response.statusCode).json(response.data))
    })

  app
    .route('/members/:id')
    .get((req, res) => {
      MembersCtrl
      .getById(req.params.id)
      .then(response => res.status(response.statusCode).json(response.data))
    })
    .put((req, res) => {
      MembersCtrl
        .update(req.body, req.params.id)
        .then(response => res.status(response.statusCode).json(response.data))
    })
    .delete((req, res) => {
      MembersCtrl
        .remove(req.params.id)
        .then(response => res.sendStatus(response.statusCode))
    })
}
