"use client"
import FeedbackTable from '@/components/feedback/FeedbackTable'
import PaginationControls from '@/components/feedback/PaginationControls'
//import Pagination from '@/components/feedback/Pagination'
import SearchAndFilter from '@/components/feedback/SearchAndFilter'
import React from 'react'

export default function FeedbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  return (
    <div>
      <SearchAndFilter />
      <FeedbackTable searchParams={searchParams} />
    </div>
  )
}
