import spec from './page.spec.yaml'
import { compilePageSpec } from '@runtime'

export const runtimeSpec = compilePageSpec(spec)
