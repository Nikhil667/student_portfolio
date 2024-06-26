import React, { useState } from "react";
import heart from "/icons/Heart.svg";
import heart_filled from "/icons/Heart-filled.svg";
import ConfettiExplosion from "react-confetti-explosion";
import axios from "axios";

const likeSummary = async (id) => {
  try {
    const apiUrl =
      "https://us-central1-udhyam-tech.cloudfunctions.net/cloud_sql_api";
    const postData = {
      flow_id: "0",
      query: `UPDATE student_portfolio.summaries SET likes = likes + 1 WHERE id = ${id}`,
    };

    const response = await axios.post(apiUrl, postData);
    console.log(response);
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

const dislikeSummary = async (id) => {
  try {
    const apiUrl =
      "https://us-central1-udhyam-tech.cloudfunctions.net/cloud_sql_api";
    const postData = {
      flow_id: "0",
      query: `UPDATE student_portfolio.summaries SET likes = likes - 1 WHERE id = ${id}`,
    };

    const response = await axios.post(apiUrl, postData);
    console.log(response);
  } catch (error) {
    console.error("POST Error:", error);
    throw error;
  }
};

export default function SummaryFooter({
  summaryLikes,
  summaryUploadedOn,
  summaryId,
}) {
  const [isClick, setClick] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [likeCount, setLikeCount] = useState(summaryLikes);
  const [isLoading, setIsLoading] = useState(false);

  // const handleLike = () => {
  //   if (!isClick) {
  //     setLikeCount(likeCount + 1);
  //   } else {
  //     setLikeCount(likeCount - 1);
  //   }
  //   setClick(!isClick);
  //   setIsExploding(!isExploding);
  // };

  // const handleLike = async () => {
  //   if (!isClick) {
  //     await likeSummary(summaryId);
  //     setLikeCount(prevCount => prevCount + 1);
  //   } else {
  //     await dislikeSummary(summaryId);
  //     setLikeCount(prevCount => prevCount - 1);
  //   }
  //   setClick(prevClick => !prevClick);
  //   setIsExploding(prevExploding => !prevExploding);
  // };

  const handleLike = async () => {
    setIsLoading(true);
    try {
      if (!isClick) {
        await likeSummary(summaryId);
        setLikeCount((prevCount) => prevCount + 1);
      } else {
        await dislikeSummary(summaryId);
        setLikeCount((prevCount) => prevCount - 1);
      }
      setClick((prevClick) => !prevClick);
      setIsExploding((prevExploding) => !prevExploding);
    } catch (error) {
      console.error("Error handling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className="footer-section flex justify-between py-3 items-center border-t-2 border-gray-100">
        <div className="summary-date">
          {/* <p className='font-semibold text-sm text-[#888]'>Uploaded <span className='text-[#222] font-bold'>6 days</span> ago</p> */}
          <p className="font-semibold text-sm text-[#888]">
            Uploaded :{" "}
            <span className="text-[#222] font-bold">
              {new Date(summaryUploadedOn).toDateString()}
            </span>
          </p>
        </div>
        <div className="like-btn flex items-center gap-1">
          {isExploding && <ConfettiExplosion zIndex={10} particleCount={50} />}

          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm" id="counter">
                {likeCount}
              </span>
              <button
                onClick={handleLike}
                className="like-btn btn"
                disabled={isLoading}
              >
                <img src={isClick ? heart_filled : heart} alt="heart" />
              </button>
            </div>
          )}
        </div>
      </footer>
    </>
  );
}
