import React from 'react'

export default function SummaryContent({ summaryShortContent }) {
  return (
    <div className="content-section py-5">
    <p className="summary font-medium text-base text-[#222] line-clamp-4 ">
    {summaryShortContent}
    </p>
  </div>
  )
}
