import sequelize from './shared/database/database.js'
import { usersRouter } from './users/router.js'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 8000

// La base ya no se borra en cada arranque (antes: force: true)
sequelize.sync().then(() => console.log('db is ready'))

app.use(express.json())

// Endpoint usado por los probes de Kubernetes y el HEALTHCHECK de Docker
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))

app.use('/api/users', usersRouter)

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export { app, server }
