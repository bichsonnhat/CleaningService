import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

interface QuickPopupAdminProps {
  toggle: () => void;
}
import { useState } from 'react';

const QuickPopupFeedback: React.FC<QuickPopupAdminProps> = ({ toggle }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (star: number) => {
    setRating(star);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={toggle}>
      <div className="flex flex-col bg-white rounded-lg shadow-lg px-[50px] py-[30px] w-[40%] h-fit gap-[20px]" onClick={(e) => e.stopPropagation()}>
        <div className='flex w-full h-[10%]'>
            <button onClick={toggle} className='ml-auto'>
              <Image src='/images/ProgressBar/Group.svg' alt='exitButton' width={20} height={20}/>
            </button>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className='text-[#1a78f2] text-[32px] font-Averta-Bold leading-[62px] self-start'>
            - Rate our Services
            </p>
            <p className='text-[#170f49] text-[32px] font-Averta-Bold leading-[62px]'>
            Fill the form to submit your feedback
            </p>
        </div>
        <div className='flex flex-col w-[90%] justify-center items-center mx-auto'>
          <div className='flex flex-col w-full h-fit gap-[11px] px-[16px] py-[13px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>order selection</p>
            <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg'>
                <div className='flex flex-row gap-[10px] items-center justify-center'>
                  <Image src='/images/About/Google.png' alt='avatar' width={20} height={20}/>
                  <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>Long Nhat dep trai</p>
                </div>
              <div className='flex flex-col divide-y-2 h-full'>
                <p className='text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold'>
                  <span className='text-[#677482]'>8 AM</span> - to <span className='text-[#677482]'>6 PM</span>
                </p>
                <p className='text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold text-center'>
                  10/29/2024
                </p>
              </div>
              <div className='bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center'>
                <p className='text-[#1a78f2] text-xs font-bold'>Home Cleaning</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full h-fit gap-[11px] p-[16px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>title</p>
            <input className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[2px] p-[15px] rounded-lg border-[#d3d8dd]' placeholder='Type your feedback title'/>
          </div>
          <div className='flex flex-col w-full h-fit gap-[11px] p-[16px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>your service rating</p>
            <div className='flex flex-row h-fit py-[13px]'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src={rating >= star ? '/images/QuickPopUp/StarRating.svg' : '/images/QuickPopUp/UnRating.svg'}
                alt='star'
                width={35}
                height={35}
                onClick={() => handleRating(star)}
              />
            ))}
            </div>
          </div>
          <div className='flex flex-col w-full h-fit gap-[11px] p-[16px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>Feedback content (Optional)</p>
            <textarea
            placeholder='Type your feedback content'
            className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[130px] px-[10px] py-[16px] resize-none'/>
          </div>
          <Button className="w-[30%] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold my-3">Submit</Button>
        </div>
      </div>
   </div>
  )
}

export default QuickPopupFeedback