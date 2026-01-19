export function compilePageSpec(spec: any) {
  return spec // 简化：直接返回
}

export type RuntimeContext = {
  data: any
  page?: number
  pageSize?: number
  fetchRecords?: () => Promise<void>
  saveRecord?: (record: any) => Promise<void>
  deleteRecord?: (record: any) => Promise<void>
}
