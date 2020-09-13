import { iContent } from './types/Content'
import { iMenu } from './types/Menu'

import SchemaContent from './schema/Content'
import SchemaMenu from './schema/Menu'

// mocking
export async function getContent(): Promise<iContent> {
  try {
    return SchemaContent
  }
  catch (error) { throw error }
}

// mocking
export async function getMenu(): Promise<iMenu[] | []> {
  try {
    return SchemaMenu
  }
  catch (error) { throw error }
}
