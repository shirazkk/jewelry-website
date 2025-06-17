export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'customer',
      title: 'Customer Information',
      type: 'object',
      fields: [
        {
          name: 'firstName',
          title: 'First Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'lastName',
          title: 'Last Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule: any) => Rule.required().email(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'zipCode',
          title: 'ZIP Code',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Product Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      customerName: 'customer.firstName',
      total: 'totalAmount',
      status: 'status',
    },
    prepare({ orderNumber, customerName, total, status }: any) {
      return {
        title: `Order #${orderNumber}`,
        subtitle: `${customerName} - Rs.${total} (${status})`,
      };
    },
  },
}; 