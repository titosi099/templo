import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import cors from 'cors'
import authorization from './auth/auth.strategy'
import membersRoute from './members/members.route'
import usersRoute from './users/users.router'
import authRoute from './auth/auth.route'

const app = express()
app.config = config

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('../app'))
const auth = authorization(app)
app.use(auth.initialize())
app.auth = auth

membersRoute(app)
usersRoute(app)
authRoute(app)

export default app
