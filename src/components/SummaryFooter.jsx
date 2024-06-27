import React, { useState, useEffect } from "react";
import heart from "/icons/Heart.svg";
import heart_filled from "/icons/Heart-filled.svg";
import ConfettiExplosion from "react-confetti-explosion";
import axios from "axios";
import fetchData from "../services/fetchSummaryData";
import { useSummaryData } from "../context/SummaryContext";

const getLikesFromLocalStorage = () => {
  const likes = localStorage.getItem('likes');
  return likes ? JSON.parse(likes) : {};
};

const saveLikeToLocalStorage = (summaryId) => {
  const likes = getLikesFromLocalStorage();
  likes[summaryId] = true;
  localStorage.setItem('likes', JSON.stringify(likes));
};

const removeLikeFromLocalStorage = (summaryId) => {
  const likes = getLikesFromLocalStorage();
  delete likes[summaryId];
  localStorage.setItem('likes', JSON.stringify(likes));
};

const likeSummary = async (id) => {
  try {
    const apiUrl =
      "https://us-central1-udhyam-tech.cloudfunctions.net/cloud_sql_api";
    const postData = {
      flow_id: "0",
      query: `UPDATE student_portfolio.summaries SET likes = likes + 1 WHERE id = ${id}`,
    };

    const response = await axios.post(apiUrl, postData);
    console.log("first")
    
    //window.location.reload();
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

// const fetchSummaryLikes = async (summaryId) => {
//   try {
//     const apiUrl = 'https://us-central1-udhyam-tech.cloudfunctions.net/cloud_sql_api';
//     const postData = {
//       "flow_id" : "0",
//       "query" : "SELECT a.*,b.contact_name FROM student_portfolio.summaries a left join student_portfolio.users b on a.contact_id = b.contact_id where approved = 1"
//   };

//     const response = await axios.post(apiUrl, postData);
    
//     console.log(response.data.data.filter(el => el.id === summaryId))
//   } catch (error) {
//     console.error("GET Error:", error);
//     throw error;
//   }
// };

export default function SummaryFooter({
  summaryLikes,
  summaryUploadedOn,
  summaryId,
}) {
  const [isClick, setClick] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [likeCount, setLikeCount] = useState(summaryLikes);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchDataAsync } = useSummaryData()

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

  // const handleLike = async () => {
  //   setIsLoading(true);
  //   try {
  //     if (!isClick) {
  //       await likeSummary(summaryId);
  //       setLikeCount((prevCount) => prevCount + 1);
  //     } else {
  //       await dislikeSummary(summaryId);
  //       setLikeCount((prevCount) => prevCount - 1);
  //     }
  //     setClick(!isClick);
  //     setIsExploding(!isExploding);
  //   } catch (error) {
  //     console.error("Error handling like:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    const likes = getLikesFromLocalStorage();
    if (likes[summaryId]) {
      setClick(true);
    }
    
  }, [summaryId]);

  // useEffect(() => {
  //   const updateLikes = async () => {
  //     const updatedLikes = await fetchSummaryLikes(summaryId);
  //     setLikeCount(updatedLikes);
  //   };

  //   updateLikes();
  // }, [summaryId]);


  const handleLike = async () => {
    setIsLoading(true);
    try {
      if (!isClick) {
        await likeSummary(summaryId);
        saveLikeToLocalStorage(summaryId);
        setLikeCount((prevCount) => prevCount + 1);
        setIsExploding(true); 
        fetchDataAsync();
      } else {
        await dislikeSummary(summaryId);
        removeLikeFromLocalStorage(summaryId);
        setLikeCount((prevCount) => prevCount - 1);
        setIsExploding(false);
        fetchDataAsync();
      }
      setClick(!isClick);
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
