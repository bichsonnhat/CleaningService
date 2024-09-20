import React from 'react';

interface JoinCommunityButtonProps {
  text: string;
}

const JoinCommunityButton: React.FC<JoinCommunityButtonProps> = ({ text }) => {
  return (
    <button className="self-stretch px-7 py-2.5 text-white bg-sky-950 rounded-[57px] font-gilroy-bold">
      {text}
    </button>
  );
};

export default JoinCommunityButton;