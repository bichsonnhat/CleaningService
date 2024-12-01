"use client"
import React from 'react'
import IssueTable from '@/components/issue/IssueTable'
import IssueHistoryTable from '@/components/issue-history/IssueHistoryTable'

export default function IssuePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  return (
    <div>
      <IssueHistoryTable/>
    </div>
  )
}
