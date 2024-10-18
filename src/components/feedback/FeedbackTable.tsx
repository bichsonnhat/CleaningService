import React from 'react';
import FeedbackRow from './FeedbackRow';

const feedbackData = [
  { id: 1, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 2, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Free Classifieds Using Them To Promote Your Stuff Online", date: "OCT 15 - 8:13 AM" },
  { id: 3, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Vacation Home Rental Success", date: "OCT 15 - 8:13 AM" },
  { id: 4, name: "Jullu Jalal", sentiment: "Neutral" as "Neutral", message: "Enhance Your Brand Potential With Giant Advertising Blimps", date: "OCT 15 - 8:13 AM" },
  { id: 5, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Always Look On The Bright Side Of Life", date: "OCT 15 - 8:13 AM" },
  { id: 6, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 7, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 8, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 9, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 10, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
];

const FeedbackTable: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-8 py-7 mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full rounded max-md:max-w-full">
        <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
          {feedbackData.map((feedback, index) => (
            <FeedbackRow key={feedback.id} {...feedback} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackTable;