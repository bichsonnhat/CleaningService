"use client"
import React from 'react'
import RefundTable from '@/components/refund/RefundTable'
export default function FeedbackPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <div>
            <RefundTable />
        </div>
    )
}