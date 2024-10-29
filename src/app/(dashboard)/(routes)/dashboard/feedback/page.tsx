"use client"
import FeedbackTable from '@/components/feedback/FeedbackTable'
import React from 'react'

export default function FeedbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  return (
    <div>
      {/* <SearchAndFilter /> */}
      <FeedbackTable />
    </div>
  )
}
