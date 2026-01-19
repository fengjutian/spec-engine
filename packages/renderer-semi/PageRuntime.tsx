import React, { useState, useEffect } from 'react'
import { Table, Button, Drawer, Form, Input, Select, Toast } from '@douyinfe/semi-ui'

export function PageRuntime({ spec, ctx }) {
  const [data, setData] = useState({ editingRecord: null, drawerOpen: false })

  useEffect(() => { ctx.fetchRecords?.() }, [])

  const deleteRecord = async (record) => {
    if (window.confirm(spec.actions.row.delete.confirmText)) {
      await ctx.deleteRecord?.(record)
      Toast.success('删除成功')
    }
  }

  return (
    <>
      {spec.compose.includes('module.drawer') && (
        <Button onClick={() => setData({ ...data, drawerOpen: true, editingRecord: null })}>+ 新增</Button>
      )}
      <Table
        dataSource={ctx.data.records || []}
        columns={spec.entity.fields.map(f => ({ title: f.name, dataIndex: f.name })).concat([{
          title: '操作',
          render: (_, record) => (
            <>
              {spec.compose.includes('module.drawer') && <Button onClick={() => setData({ ...data, editingRecord: record, drawerOpen: true })}>编辑</Button>}
              <Button theme="borderless" onClick={() => deleteRecord(record)}>删除</Button>
            </>
          )
        }])}
      />
      {data.drawerOpen && (
        <Drawer
          title={data.editingRecord ? '编辑' : '新增'}
          visible={true}
          onCancel={() => setData({ ...data, drawerOpen: false, editingRecord: null })}
        >
          <Form
            initialValues={data.editingRecord || Object.fromEntries(spec.entity.fields.map(f => [f.name, '']))}
            onSubmit={async (values) => {
              await ctx.saveRecord?.({ ...data.editingRecord, ...values })
              setData({ ...data, drawerOpen: false, editingRecord: null })
              Toast.success('保存成功')
            }}
          >
            {spec.entity.fields.filter(f => f.name !== 'id').map(f => (
              <Form.Item key={f.name} label={f.name} field={f.name} rules={[{ required: f.required }]}>
                {f.type === 'enum' ? <Select options={f.options} /> : <Input />}
              </Form.Item>
            ))}
            <Button htmlType="submit" type="primary">提交</Button>
          </Form>
        </Drawer>
      )}
    </>
  )
}
