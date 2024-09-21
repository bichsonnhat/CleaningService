import React from 'react';

const SubscriptionForm: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-5 items-start p-8 rounded-2xl bg-sky-950 max-md:px-5 max-md:max-w-full">
      <h2 className="text-2xl font-bold leading-9 text-white capitalize w-[389px] font-gilroy-bold">
        Register now so you don't miss our programs
      </h2>
      <form className="flex flex-wrap gap-3 items-center p-3 font-medium bg-white rounded-2xl min-w-[240px] w-[707px] max-md:max-w-full">
        <label htmlFor="emailInput" className="sr-only">Enter your Email</label>
        <input
          id="emailInput"
          type="email"
          placeholder="Enter your Email"
          className="flex-1 shrink gap-2.5 self-stretch px-7 py-3.5 my-auto text-sm leading-none bg-white rounded-lg border border-solid border-zinc-400 min-w-[240px] text-zinc-400 max-md:px-5 max-md:max-w-full font-gilroy-regular"
          aria-label="Enter your Email"
        />
        <button type="submit" className="gap-2.5 self-stretch pt-3.5 pb-2.5 my-auto text-base text-white rounded-lg bg-sky-950 w-[163px] max-md:px-5 font-gilroy-regular">
          Subscribe Now
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;