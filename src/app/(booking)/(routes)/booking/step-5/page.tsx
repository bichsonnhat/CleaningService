'use client'

import React from 'react';
import Booking5Left from '@/components/booking/step-5/booking5_left';
import Booking5Right from '@/components/booking/step-5/booking5_right';

const Step_5: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full relative min-h-screen">
      {/* Section Left */}
      <Booking5Left />

      {/* Section Right */}
      <Booking5Right />
    </div >
  )
}

export default Step_5
