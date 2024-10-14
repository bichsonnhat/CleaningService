import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react'

const Booking5Right = () => {
  return (
    <div className="w-full md:w-1/3 p-4 bg-gray-100 min-h-screen">
      <p className="text-4xl mx-auto font-Averta-Bold mb-4 mt-[50px]">Billing</p>
      <div className="my-4 border-gray-300 rounded-lg">
        <div className="p-6 bg-white rounded-lg">
          <div className="flex justify-between ">
            <div className="text-gray-600 font-Averta-Regular">Studio</div>
            <Separator orientation='vertical' className='border-gray-300 mx-4 h-9' />
            <div className="text-gray-600 font-Averta-Regular">3 Bathrooms</div>
            <Separator orientation='vertical' className='border-gray-300 mx-4 h-9' />
            <div className="text-gray-600 font-Averta-Regular">Standard</div>
          </div>
          <div className="mb-4 border-t pt-4 flex">
            {/* <p className=" text-gray-600 font-semibold">Every 2 weeks</p> */}
            <p className="text-gray-600 font-Averta-Semibold">Tuesday, July 17, 2018 at 2.30pm</p>
          </div>
          <div className="mb-4 border-t pt-4">
            <p className=" text-gray-600 font-Averta-Semibold">114 Broadway Newyork, NY 10005</p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className=" text-gray-600 font-Averta-Semibold">Add-on: Inside oven</p>
          </div>
        </div>
      </div>

      <div className="flex mt-[40px]">
        <Input type="text" placeholder="Discount" className="bg-white border-gray-300 h-[50px] font-Averta-Regular" />
        <Button className="bg-[#1A78F2] h-[50px] md:w-1/3 ml-[8px] font-Averta-Semibold text-[16px]">Apply</Button>
      </div>

      <div className=" my-[40px] border-gray-300 rounded-lg">
        <div className="p-6 bg-white rounded-lg">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex">
              <p className="text-gray-600 font-Averta-Semibold">Appointment Value</p>
              <p className="text-blue-600 font-Averta-Semibold ml-[10px]">- Details</p>
            </div>
            <p className="text-gray-600 font-Averta-Semibold ">$ 125.99</p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex">
              <p className=" text-gray-600 font-Averta-Semibold">Discounts</p>
              <p className="text-blue-600 font-Averta-Semibold ml-[10px]">- Details</p>
            </div>
            <p className="text-gray-600 font-Averta-Semibold ">-$ 15.89</p>
          </div>
          <div className="mb-4 border-t pt-4 flex justify-between items-center">
            <p className=" text-gray-600 font-Averta-Semibold">Subtotal</p>
            <p className="text-gray-600 font-Averta-Semibold ">$ 110.01</p>
          </div>
          <div className="mb-4 border-t pt-4 flex justify-between items-center">
            <p className=" text-gray-600 font-Averta-Semibold">Tax</p>
            <p className="text-gray-600 font-Averta-Semibold">+$ 5.20</p>
          </div>
          <div className="border-t pt-4 justify-between items-center flex">
            <p className=" text-gray-600 text-[18px] font-Averta-Bold">Total</p>
            <p className=" text-gray-600 text-[18px] font-Averta-Bold">$610.00</p>
          </div>

        </div>
      </div>

      <div className="flex justify-center items-center ">
        <Button className="md:w-1/3 h-[60px] bg-[#1A78F2] font-Averta-Semibold text-[16px]">Place order</Button>
      </div>
    </div>
  )
}

export default Booking5Right
