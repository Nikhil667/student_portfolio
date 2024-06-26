import React from "react";
import avatar from "/avatar.png";
import arrow from "/icons/ArrowDownRight.svg";
import { Link } from "react-router-dom";

export default function SummaryHeader({ summaryId, summaryTitle, contact_name, generated_image }) {

  return (
    <header className="summary-header-section py-3 gap-2 flex items-center justify-between border-b-2 border-gray-100">
      <div className="flex items-start gap-3">
        <div className="profile-image w-[64px] h-[64px] rounded-full bg-black">
          <img className="rounded-full min-w-14 min-h-14" src={generated_image} alt="avatar" />
        </div>
        <div className="headings flex flex-col ">
          <h2 className="font-semibold text-xl">{summaryTitle}</h2>
          <p className="author font-medium text-sm text-gray-500">
            By {contact_name}
          </p>
        </div>
      </div>
      <div className="project-detail-link cursor-pointer bg-gray-100 p-2 rounded-full">
        <Link to={`/projectDetail/${summaryId}`}>
          <img className="max-h-6 max-w-6 " src={arrow} alt="arrow" />
        </Link>
      </div>
      
    </header>
  );
}
