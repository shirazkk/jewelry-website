// 'use client'
// import React, { useState } from 'react';
// import { Star } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';

// interface ReviewFormProps {
//   onSubmit: (rating: number, reviewText: string) => Promise<void>;
//   disabled?: boolean;
// }

// const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, disabled }) => {
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [hoverRating, setHoverRating] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     if (rating === 0 || reviewText.trim() === '') {
//       setError('Please provide a rating and review text.');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await onSubmit(rating, reviewText);
//       // Optionally clear the form on success
//       setRating(0);
//       setReviewText('');
//       setHoverRating(0);
//     } catch (err) {
//       console.error('Error submitting review:', err);
//       setError('Failed to submit review. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <Label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Your Rating</Label>
//         <div className="flex items-center">
//           {[...Array(5)].map((_, i) => {
//             const ratingValue = i + 1;
//             return (
//               <label key={i}>
//                 <input
//                   type="radio"
//                   name="rating"
//                   value={ratingValue}
//                   onClick={() => setRating(ratingValue)}
//                   className="hidden"
//                   disabled={disabled || isSubmitting}
//                 />
//                 <Star
//                   className={`cursor-pointer w-6 h-6 transition-colors duration-200
//                     ${(hoverRating || rating) >= ratingValue ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}
//                   `}
//                   onMouseEnter={() => setHoverRating(ratingValue)}
//                   onMouseLeave={() => setHoverRating(0)}
//                 />
//               </label>
//             );
//           })}
//         </div>
//       </div>

//       <div>
//         <Label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">Your Review</Label>
//         <Textarea
//           id="reviewText"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           rows={4}
//           className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
//           disabled={disabled || isSubmitting}
//         />
//       </div>

//       {error && <p className="text-sm text-red-500">{error}</p>}

//       <Button type="submit" disabled={disabled || isSubmitting}>
//         {isSubmitting ? 'Submitting...' : 'Submit Review'}
//       </Button>
//     </form>
//   );
// };

// export default ReviewForm; 