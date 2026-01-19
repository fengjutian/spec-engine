import express from 'express'
import cors from 'cors'

interface Record {
  id: string
  [key: string]: any
}

interface Database {
  files: Record[]
  users: Record[]
  roles: Record[]
  [key: string]: Record[]
}

const app = express()
app.use(cors())
app.use(express.json())

const db: Database = { files: [], users: [], roles: [] }

function generateCrudApi(entityName: string) {
  const base = `/${entityName.toLowerCase()}s`
  app.get(base, (req, res) => res.json(db[entityName.toLowerCase() + 's']))
  app.post(base, (req, res) => {
    const record = { ...req.body, id: Date.now().toString() }
    db[entityName.toLowerCase() + 's'].push(record)
    res.json(record)
  })
  app.put(`${base}/:id`, (req, res) => {
    const records = db[entityName.toLowerCase() + 's']
    const idx = records.findIndex((r: Record) => r.id === req.params.id)
    records[idx] = { ...records[idx], ...req.body }
    res.json(records[idx])
  })
  app.delete(`${base}/:id`, (req, res) => {
    const records = db[entityName.toLowerCase() + 's']
    const idx = records.findIndex((r: Record) => r.id === req.params.id)
    records.splice(idx, 1)
    res.json({ ok: true })
  })
}

generateCrudApi('File')
generateCrudApi('User')
generateCrudApi('Role')

app.listen(3000, () => console.log('API Server running at http://localhost:3000'))
