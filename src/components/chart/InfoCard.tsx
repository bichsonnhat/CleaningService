import React from 'react'
import Image from 'next/image'

interface InfoCardProps {
    titleInfo: string;
    dataInfo: string;
    urliconInfo: string;
    percentageChangeInfo: string;
    trend: string;    
}

export const InfoCard:React.FC<InfoCardProps> = ({titleInfo, dataInfo, urliconInfo, percentageChangeInfo, trend}) => {
    const bgIconColor = titleInfo === "Total User" ? 'bg-[#caf0ff]' : 
                        titleInfo === "Total Order" ? 'bg-[#f8e0c9cc]' : 
                        titleInfo === "Total Income" ? 'bg-[#cefad8]' : 'bg-[#ffd2d1]';
    const urlTrend = trend === "down" ? "/images/Chart/down.svg" : "/images/Chart/up.svg";
    const textColorTrend = trend === "down" ? "text-[#B60000]" : "text-[#00B69B]";
    const changeInfoText = trend === "down" ? "Down from yesterday" : "Up from yesterday";
  return (
    <div className='sm:flex sm:flex-col justify-center items-center w-[24%] max-sm:w-full bg-white py-[25px] px-[25px] gap-[32px] rounded-xl'>
        <div className='inline-flex w-full justify-between'>
            <div className='text-left'>
                <div className='opacity-70 text-[#202224] text-base font-gilroy-regular text-[17px] font-bold mb-[10px]'>{titleInfo}</div>
                <div className='text-[#202224] text-[28px] font-normal font-gilroy-bold tracking-wide'>{dataInfo}</div>
            </div>
            <div className={`h-[60px] w-[60px] flex justify-center items-center ${bgIconColor} rounded-3xl`}>
                <Image src={urliconInfo} alt='totalUser' width={35} height={30}/>
            </div>
        </div>
        <div className='flex flex-row w-full items-start'>
            <Image src={`${urlTrend}`} alt='down' width={26} height={26} className='pr-[8px]'/>
            <p className='text-[#606060] text-[16px] not-italic font-[600] leading-normal'><span className={`${textColorTrend}}`}>{percentageChangeInfo}</span> {`${changeInfoText}`}</p>
        </div>
    </div>
  )
}
