// import { client } from "../lib/client";


// export const getProducts = async () => {
//   const query = `
//     *[_type == "product" && featured == true]{
//       id,
//       name,
//       price,
//       oldPrice,
//       rating,
//       reviews,
//       image{
//         asset->{
//           url
//         },
//       },
//       category,
//       tag,
//       isNew,
//       discount,
//       featured
//     }
//   `;
  
//   const products = await client.fetch(query);
//   return products;
// };
