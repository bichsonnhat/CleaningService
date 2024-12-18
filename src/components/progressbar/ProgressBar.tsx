'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { bookingStore } from '@/utils/store/booking.store';

interface ServiceDetails {
  serviceType: string;
  bedrooms?: string;
  bathrooms?: string;
  cleanType?: string;
  serviceDetail?: string;
  howLong?: string;
  scheduleDate: string;
  address: string;
  subTotal: string;
}
const ProgressBar = () => {
  const [step, setStep] = useState(1)
  const bookingData = bookingStore((state: any) => state.bookingData);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    serviceType: '',
    bedrooms: '',
    bathrooms: '',
    cleanType: '',
    serviceDetail: '',
    howLong: '',
    scheduleDate: '',
    address: '',
    subTotal: ''
  })

  const [serviceType, setServiceType] = useState<string>('')
  const [homeCleaningDetail, setHomeCleaningDetail] = useState<{
    bedrooms: string;
    bathrooms: string;
    cleanType: string;
  }>({bedrooms: '', bathrooms: '', cleanType: ''})
  const [otherServicesDetail, setOtherServicesDetail] = useState<{
    serviceDetail: string;
    howLong: string;
  }>({serviceDetail: '', howLong: ''})
  const [dateTimeBooking, setDateTimeBooking] = useState<string>('')
  const [addressBooking, setAddressBooking] = useState<string>('')

  const mappingValue = (value: number) => {
    switch (value) {
      case 1:
      return 'Flexible';
      case 8:
      return '08:00am';
      case 8.5:
      return '08:30am';
      case 9:
      return '09:00am';
      case 9.5:
      return '09:30am';
      case 10:
      return '10:00am';
      default:
      break;
    }
  }
  const pathName = usePathname();
  const router = useRouter();
  const handleRoute = () => {
    router.push('/')
  }
  const handleNextBtn = () => {
    switch (pathName) {
      case '/booking/step-1':
        router.push('/booking/step-2')
        break;
      case '/booking/step-2':
        router.push('/booking/step-3')
        break;
      case '/booking/step-3':
        router.push('/booking/step-4')
        break;
      case '/booking/step-4':
        router.push('/booking/step-5')
        break;
      case '/booking/step-5':
        router.push("/payment-success");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setServiceDetails({
      serviceType: serviceType,
      bedrooms: homeCleaningDetail.bedrooms,
      bathrooms: homeCleaningDetail.bathrooms,
      cleanType: homeCleaningDetail.cleanType,
      serviceDetail: otherServicesDetail.serviceDetail,
      howLong: otherServicesDetail.howLong,
      scheduleDate: dateTimeBooking === 'Invalid Date at Invalid Date' ? '-' : dateTimeBooking,
      address: addressBooking === 'undefined undefined' ? '-' : addressBooking,
      subTotal: bookingData.totalPrice})
  }, [serviceType, homeCleaningDetail, otherServicesDetail, dateTimeBooking, addressBooking])

  useEffect(() => {
    switch (pathName) {
      case '/booking/step-1':
        setStep(1)
        const serviceType = bookingData.serviceCategory?.name || 'Other Services';
        setServiceType(serviceType)
        break;
      case '/booking/step-2':
        setStep(2)
        if (bookingData.serviceCategory?.name === 'Home Cleaning') {
          const bedrooms = bookingData.bookingInfomation[0]?.value || '0';
          const bathrooms = bookingData.bookingInfomation[1]?.value || '0';
          const cleanType = bookingData.bookingInfomation[2]?.value || 'Standard';
          setHomeCleaningDetail({bedrooms, bathrooms, cleanType})
        } else {
          const serviceDetail = bookingData.bookingInfomation[0]?.value || 'Other Services';
          const howLong = bookingData.bookingInfomation[1]?.value || '1 hour';
          setOtherServicesDetail({serviceDetail, howLong})
        }
        break;
      case '/booking/step-3':
        setStep(2)
        break;
      case '/booking/step-4':
        setStep(3)
        const dateTimeBooking = new Date(bookingData.bookingDate).toLocaleDateString('en-GB', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }) + ' at ' + mappingValue(bookingData.bookingTiming) || 'Time Booking';
        setDateTimeBooking(dateTimeBooking)
        break;
      case '/booking/step-5':
        setStep(4)
        const addressBooking = bookingData.APT + ', ' + bookingData.bookingAddress;
        setAddressBooking(addressBooking)
        break;
      default:
        break;
    }
  }, [pathName])

  return (
    <div className='w-full h-[75px] flex flex-row sm:shadow-xl bg-white'>
      <div className='max-sm:hidden h-full w-[5.2%]'>
        <div className='h-full w-full flex justify-center items-center hover:cursor-pointer' onClick={handleRoute}>
            <Image src='/images/ProgressBar/Group.svg' alt='exitButton' width={20} height={20}/>
        </div>
      </div>
      <div className='max-sm:hidden relative h-full w-[90%] flex flex-row'>
          <div className={`h-full ${serviceDetails.serviceType === 'Home Cleaning' ? 'w-1/6' : 'w-1/5'}`}>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/House.svg' alt='serviceType' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.serviceType ? serviceDetails.serviceType : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Service type</p>
                </div>
              </div> 
            </div>
          </div>
          {serviceDetails.serviceType === 'Home Cleaning' &&(
          <>
          <div className='h-full w-1/6'>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Bedroom.svg' alt='bedroom' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.bedrooms ? serviceDetails.bedrooms : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Bedrooms</p>
                </div>
              </div>    
            </div>
          </div>
          <div className='h-full w-1/6'>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Bathroom.svg' alt='bathroom' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.bathrooms ? serviceDetails.bathrooms : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Bathrooms</p>
                </div>
              </div> 
            </div>
          </div>
          <div className='h-full w-1/6'>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Cleaner.svg' alt='cleanType' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.cleanType ? serviceDetails.cleanType : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Cleantype</p>
                </div>
              </div>
            </div>
          </div>
          </>   
          )}
          {serviceDetails.serviceType === 'Other Services' &&(
          <>
          <div className='h-full w-1/5'>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Layers.svg' alt='bedroom' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.serviceDetail ? serviceDetails.serviceDetail : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Service Detail</p>
                </div>
              </div>    
            </div>
          </div>
          <div className='h-full w-1/5'>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Alarm.svg' alt='bathroom' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.howLong ? serviceDetails.howLong : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>For How Long</p>
                </div>
              </div> 
            </div>
          </div>
          </>   
          )}
          <div className={`h-full ${serviceDetails.serviceType === 'Home Cleaning' ? 'w-1/6' : 'w-1/5'}`}>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Calendar.svg' alt='scheduleDate' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.scheduleDate ? serviceDetails.scheduleDate : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Schedule Date</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`h-full ${serviceDetails.serviceType === 'Home Cleaning' ? 'w-1/6' : 'w-1/5'}`}>
            <div className='h-full w-full flex justify-center items-center'>
              <div className='flex flex-row gap-2'>
                <div>
                  <Image src='/images/ProgressBar/Location.svg' alt='location' width={28} height={28}/>
                </div>
                <div>
                  <p className='text-[#12153a] text-xl font-Averta-Semibold leading-[25px]'>{`${serviceDetails.address ? serviceDetails.address : '-' }`}</p>
                  <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight'>Address</p>
                </div>
              </div>
            </div>
          </div>
        {(step === 1 && serviceDetails.serviceType === 'Home Cleaning') && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[50%]`}></div>
        )}
        {(step === 2 && serviceDetails.serviceType === 'Home Cleaning') && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[65%]`}></div>
        )}
        {(step === 3 && serviceDetails.serviceType === 'Home Cleaning') && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[78%]`}></div>
        )}
        {(step === 1 && serviceDetails.serviceType === 'Other Services') && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[43%]`}></div>
        )}
        {(step === 2 && serviceDetails.serviceType === 'Other Services') && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[60%]`}></div>
        )}
        {(step === 3 && serviceDetails.serviceType === 'Other Services') && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[75%]`}></div>
        )}
        {step === 4 && (
          <div className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-full`}></div>
        )}
      </div>
      <div className='h-full w-[12%] max-sm:w-[40%] bg-[#2B3641]'>
        <div className='h-full w-full flex justify-center items-center'>
          <div className='flex flex-col'>
            <div className='flex flex-row m-auto'>
              <span className='text-white text-sm font-Averta-Bold leading-[19px] tracking-tight'>$</span>
              <p className='text-white text-[34px] font-Averta-Bold leading-[42px]'>{`${serviceDetails.subTotal ? serviceDetails.subTotal : '$$$' }`}</p>
            </div>
            <div>
              <p className='text-[#9ea7af] text-xs font-Averta-Semibold uppercase tracking-wide text-center'>Sub Total</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden w-[60%]">
          <Button className="h-full rounded-none w-full bg-[#1A78F2] text-lg text-white font-Averta-Semibold" onClick={handleNextBtn}>Next</Button>
      </div>
    </div>
  )
}

export default ProgressBar