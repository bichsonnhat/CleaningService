import React from 'react';
import FeedbackRow from './FeedbackRow';
import PaginationControls from './PaginationControls';

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
  { id: 11, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 12, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 13, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 14, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 15, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 16, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 17, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 18, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 19, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Free Classifieds Using Them To Promote Your Stuff Online", date: "OCT 15 - 8:13 AM" },
  { id: 20, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Vacation Home Rental Success", date: "OCT 15 - 8:13 AM" },
  { id: 21, name: "Jullu Jalal", sentiment: "Neutral" as "Neutral", message: "Enhance Your Brand Potential With Giant Advertising Blimps", date: "OCT 15 - 8:13 AM" },
  { id: 22, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Always Look On The Bright Side Of Life", date: "OCT 15 - 8:13 AM" },
  { id: 23, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 24, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 25, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 26, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
  { id: 27, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", date: "OCT 15 - 8:13 AM" },
];

export default function FeedbackTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '12'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = (start + Number(per_page)) > feedbackData.length ? feedbackData.length : (start + Number(per_page)) // 5, 10, 15 ...

  const entries = feedbackData.slice(start, end)
  return (
    <>
      <div className='flex flex-row items-center justify-between my-4'>
        <div className='self-stretch my-auto text-[15px] font-Averta-Semibold bg-blend-normal text-neutral-800'>
          Showing {start + 1}-{end} of {feedbackData.length}
        </div>
        <PaginationControls
          hasNextPage={end < feedbackData.length}
          hasPrevPage={start > 0}
        />
      </div>
      <div className="flex flex-col justify-center px-8 py-7 mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {entries.map((feedback, index) => (
              <FeedbackRow key={feedback.id} {...feedback} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>


    </>

  );
};