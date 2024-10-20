'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight
} from "react-icons/md";

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = (
    {
        hasNextPage,
        hasPrevPage,
    }
) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '12'

    return (
        <div className='flex items-center rounded-lg border-2 border-slate-200 w-fit'>
            <button
                className={!hasPrevPage ? 'text-xl opacity-50 p-2' : 'p-2 text-xl hover:bg-slate-200'}
                disabled={!hasPrevPage}
                onClick={() => {
                    router.push(`/dashboard/feedback?page=${Number(page) - 1}&per_page=${per_page}`)
                }}>
                <MdKeyboardArrowLeft className='text-xl' />
            </button>

            <div className='w-[1.5px] h-[24px] bg-slate-200'>

            </div>
            <button
                className={!hasNextPage ? 'text-xl opacity-50 p-2' : 'p-2 text-xl hover:bg-slate-200'}
                disabled={!hasNextPage}
                onClick={() => {
                    router.push(`/dashboard/feedback?page=${Number(page) + 1}&per_page=${per_page}`)
                }}>
                <MdKeyboardArrowRight className='text-xl' />
            </button>
        </div>
    )
}

export default PaginationControls