import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import { categorySchema } from './category'
import order from './order'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categorySchema,order],
}
