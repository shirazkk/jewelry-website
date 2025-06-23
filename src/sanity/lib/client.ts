import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-05-09', // Use the date of your latest schema
  useCdn: false, // `false` ensures fresh data
  token: process.env.SANITY_AUTH_TOKEN
});

export default client;

