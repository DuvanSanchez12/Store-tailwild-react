import { CompleteStar, MediumStar } from "../components/icons";

/**
 * 
 * @param {number} rating
 * @returns {JSX.Element[]}
 */
export function useStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<CompleteStar key={`full-${i}`} />);
  }
  if (hasHalfStar) {
    stars.push(<MediumStar key="half" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-gray-300">
        ★
      </span>
    );
  }
  return stars;
}
