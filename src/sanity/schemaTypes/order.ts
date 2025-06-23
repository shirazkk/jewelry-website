import { defineType, defineField } from 'sanity'

const orderSchema = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
          type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
          type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
          name: 'address',
          title: 'Address',
          type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
          name: 'city',
          title: 'City',
          type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
          type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
  ],
});

export default orderSchema; 