export function initFileEffects(ctx) {
  ctx.fetchRecords = async () => {
    const res = await fetch(`http://localhost:5000/files`)
    ctx.data.records = await res.json()
  }

  ctx.saveRecord = async (record) => {
    if (record.id) await fetch(`http://localhost:5000/files/${record.id}`, { method: 'PUT', body: JSON.stringify(record) })
    else await fetch('http://localhost:5000/files', { method: 'POST', body: JSON.stringify(record) })
    await ctx.fetchRecords()
  }

  ctx.deleteRecord = async (record) => {
    await fetch(`http://localhost:5000/files/${record.id}`, { method: 'DELETE' })
    await ctx.fetchRecords()
  }
}
