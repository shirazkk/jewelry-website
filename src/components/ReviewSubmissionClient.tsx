// 'use client';

// import React from 'react';
// import ReviewForm from "@/components/ReviewForm";
// import { client } from "@/sanity/lib/client"; // Import Sanity client

// interface ReviewSubmissionClientProps {
//   productId: string;
// }

// const ReviewSubmissionClient: React.FC<ReviewSubmissionClientProps> = ({ productId }) => {

//   const addReview = async (rating: number, reviewText: string) => {
//     if (!productId) {
//       console.error("Product ID is not available for review submission.");
//       // Optionally show an error to the user
//       return;
//     }

//     try {
//       await client
//         .patch(productId) // Document ID of the product
//         .setIfMissing({ reviewsList: [] }) // Ensure reviewsList is an array
//         .insert('after', 'reviewsList[-1]', [{
//           _key: Math.random().toString(36).substring(2, 15), // Simple unique key
//           _type: 'review', // Use the type defined in schema for array objects
//           rating: rating,
//           reviewText: reviewText,
//           // Add other fields here if you added them to the schema
//         }])
//         .commit();

//       console.log("Review submitted successfully!");
//       // You might want to refresh the page or update state to show the new review
//       // For now, the user might need to manually refresh.

//     } catch (error) {
//       console.error("Error submitting review:", error);
//       // Optionally show an error to the user
//       throw error; // Re-throw to allow ReviewForm to handle error state
//     }
//   };

//   return (
//     <ReviewForm onSubmit={addReview} />
//   );
// };

// export default ReviewSubmissionClient; 