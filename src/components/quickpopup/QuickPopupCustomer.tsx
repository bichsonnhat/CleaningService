import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

interface QuickPopupCustomer {
  toggle: () => void;
}
const QuickPopupCustomer: React.FC<QuickPopupCustomer> = ({ toggle }) => {
  //assume that you have booking state
  const bookingState: string = "Pending"

  const [cancelService, setCancelService] = React.useState(false);
  const style = 
  bookingState === "Completed" 
  ?(<div className='w-[60%] h-full bg-[#00b69b] p-[13px] bg-opacity-20 rounded-lg'>
      <p className='flex h-full justify-center items-center text-[#00b69b] text-xl font-bold'>{bookingState}</p>
    </div>): 
  bookingState === "In Progress" 
  ?(<div className='w-[60%] h-full bg-[#1a78f2] p-[13px] bg-opacity-20 rounded-lg'>
      <p className='flex h-full justify-center items-center text-[#1a78f2] text-xl font-bold'>{bookingState}</p>
    </div>): 
  bookingState === "Pending" 
  ?(<div className='w-[60%] h-full bg-[#ffd154] p-[13px] bg-opacity-20 rounded-lg'>
    <p className='flex h-full justify-center items-center text-[#ff9400] text-xl font-bold'>{bookingState}</p>
    </div>):"";

  const styleBtn = 
  bookingState === "Completed" 
    ?(<Button className="w-full h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold">Feedback</Button>): 
  bookingState === "In Progress" 
    ?(<Button className="w-full h-[55px] bg-[#000000] text-lg text-white font-Averta-Semibold" disabled>Feedback</Button>):
  bookingState === "Pending" && cancelService
    ?(<Button className="w-full h-[55px] bg-[#00b69b] text-lg text-white font-Averta-Semibold hover:bg-[#00b69b] hover:bg-opacity-70"
    onClick={() => setCancelService(!cancelService)}>Don't Cancel The Service</Button>):
  bookingState === "Pending" && !cancelService
    ?(<Button className="w-full h-[55px] bg-[#e01a1a] text-lg text-white font-Averta-Semibold hover:bg-[#e01a1a] hover:bg-opacity-70"
    onClick={() => setCancelService(!cancelService)}>Cancel The Service</Button>): "";

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={toggle}>
      <div className="flex flex-col bg-white rounded-lg shadow-lg px-[50px] py-[40px] w-fit lg:w-[45%] h-fit max-h-[95%] " onClick={(e) => e.stopPropagation()}>
        <div className='flex w-full h-[10%]'>
            <button onClick={toggle} className='ml-auto'>
              <Image src='/images/ProgressBar/Group.svg' alt='exitButton' width={20} height={20}/>
            </button>
        </div>
        <div className='flex flex-row w-full h-[90%] mt-5 gap-10'>
          <div className='w-[50%] h-full flex flex-col gap-[32px] content-between'>
            <div className='w-full h-full flex flex-col gap-[8px]'>
              <p className='text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight'>helper selection</p>
              <div className='flex flex-col p-[16px] gap-[11px] rounded-lg'>
                <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>helper</p>
                <div className='flex flex-row justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                  <div className='flex flex-row h-fit gap-[10px]'>
                    <Image src='/images/About/Google.png' alt='avatar' width={20} height={20} className='max-lg:hidden'/>
                    <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>Long Nhat dep trai</p>
                  </div>
                  <div className='flex flex-row h-fit gap-[2px]'>
                    <p className='text-[#88929c] text-xl font-Averta-Semibold leading-[25px]'>3</p>
                    <Image src='/images/QuickPopUp/StarRating.svg' alt='avatar' width={18} height={18}/>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-full flex flex-col gap-[8px]'>
              <p className='text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight'>service details</p>
              <div className='flex flex-col h-full px-[16px] pt-[16px] rounded-lg gap-5 pb-7'>
                <div className='flex flex-col w-full h-fit gap-[11px]'>
                  <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>service type</p>
                  <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                    <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>Other Services</p>
                  </div>
                </div>
                <div className='flex flex-col w-full h-fit gap-[11px]'>
                  <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>other service type</p>
                  <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                    <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>Baby-Sitting</p>
                  </div>
                </div>
                <div className='flex flex-col w-full h-fit gap-[11px]'>
                  <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>duration type</p>
                  <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                    <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>1-3 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[50%] h-full flex flex-col gap-[8px]'>
            <p className='text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight'>customer-related info</p>
            <div className='w-full h-full flex flex-col p-[16px] rounded-lg gap-6'>
              <div className='flex flex-col w-full h-fit gap-[11px]'>
                <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>customer</p>
                <div className='flex flex-row gap-[10px] w-full h-fit p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                  <Image src='/images/About/Google.png' alt='avatar' width={20} height={20} className='max-lg:hidden'/>
                  <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>Long Nhat dep trai</p>
                </div>
              </div>
              <div className='flex flex-col w-full h-fit gap-[11px]'>
                <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>address</p>
                <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                  <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>Address</p>
                </div>
              </div>
              <div className='flex flex-col w-full h-fit gap-[11px]'>
                <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>time</p>
                <div className='flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                  <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'><span className='max-lg:hidden'>From </span>8 AM <span className='max-lg:hidden'>to</span><span className='lg:hidden'>-</span> 6 PM | 29/10/<span className='max-lg:hidden'>20</span>24</p>
                </div>
              </div>
              <div className='flex flex-col w-full h-full gap-[11px]'>
                <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>price</p>
                <div className='flex flex-row w-full h-full gap-[16px]'>
                  <div className='w-[40%] h-full justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]'>
                    <p className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight'>$50</p>
                  </div>
                  {style}
                </div>
              </div>
              <div className='h-[55px]'>
                {styleBtn}
              </div>
            </div>
          </div>
        </div>
        {cancelService ? 
        <div className='flex flex-col gap-[10px]'>
          <div className='h-fit w-full flex flex-col gap-[8px] mt-[10px]'>
            <p className='text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight'>cancellation reason</p>
            <textarea
            placeholder='CANCELLATION REASON'
            className='text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[130px] px-[10px] py-[16px] resize-none'/>
          </div>
          <Button className="w-[50%] m-auto h-[55px] bg-[#e01a1a] text-lg text-white font-Averta-Semibold hover:bg-[#e01a1a] hover:bg-opacity-70">Confirm</Button>
          </div> : ""}
      </div>
   </div>
  )
}

export default QuickPopupCustomer