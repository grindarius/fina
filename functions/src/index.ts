import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT = 3000

app.get('/', (_: Request, res: Response) => {
  res.send('hello lmao')
})

app.listen(PORT, () => {
  console.log(`We're listenting to changes at http://localhost:${PORT}`)
})