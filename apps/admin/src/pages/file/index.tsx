import React from 'react'
import { PageRuntime } from '@renderer/PageRuntime'
import { runtimeSpec } from './runtime'
import { initFileEffects } from '../../effects/fileEffects'

const ctx: any = { data: {}, page: 1, pageSize: 10 }
initFileEffects(ctx)

export default function FilePage() {
  return <PageRuntime spec={runtimeSpec} ctx={ctx} />
}
