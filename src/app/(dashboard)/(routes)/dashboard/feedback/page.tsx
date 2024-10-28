"use client"
import FeedbackTable from '@/components/feedback/FeedbackTable'
import Pagination from '@/components/feedback/Pagination'
import SearchAndFilter from '@/components/feedback/SearchAndFilter'
import React from 'react'

const FeedbackPage = () => {
  return (
    <div>
      {/* <SearchAndFilter /> */}
      <FeedbackTable />
      <Pagination />
    </div>
  )
}

export default FeedbackPage
