import express from 'express'
import cors from 'cors'

import type { Request, Response } from 'express'

interface EntityRecord {
  id: string
  [key: string]: any
}

interface Database {
  files: EntityRecord[]
  users: EntityRecord[]
  roles: EntityRecord[]
  [key: string]: EntityRecord[]
}

const app = express()
app.use(cors())
app.use(express.json())

const db: Database = { files: [], users: [], roles: [] }

function generateCrudApi(entityName: string) {
  const base = `/${entityName.toLowerCase()}s`
  app.get(base, (req: Request, res: Response) => res.json(db[entityName.toLowerCase() + 's']))
  app.post(base, (req: Request, res: Response) => {
    const record = { ...req.body, id: Date.now().toString() }
    db[entityName.toLowerCase() + 's'].push(record)
    res.json(record)
  })
  app.put(`${base}/:id`, (req: Request, res: Response) => {
    const records = db[entityName.toLowerCase() + 's']
    const idx = records.findIndex((r: EntityRecord) => r.id === req.params.id)
    records[idx] = { ...records[idx], ...req.body }
    res.json(records[idx])
  })
  app.delete(`${base}/:id`, (req: Request, res: Response) => {
    const records = db[entityName.toLowerCase() + 's']
    const idx = records.findIndex((r: EntityRecord) => r.id === req.params.id)
    records.splice(idx, 1)
    res.json({ ok: true })
  })
}

generateCrudApi('File')
generateCrudApi('User')
generateCrudApi('Role')

app.listen(5000, () => console.log('API Server running at http://localhost:5000'))
