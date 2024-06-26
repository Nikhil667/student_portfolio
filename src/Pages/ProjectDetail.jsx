import { useParams, Link } from "react-router-dom";
import { useSummaryData } from "../context/SummaryContext";
import Header from "../components/Header";
import avatar from "/avatar.png";
import badge1 from "/badges/badge1.png";
import badge2 from "/badges/badge2.png";
import badge3 from "/badges/badge3.png";
import badge4 from "/badges/badge4.png";
import backButton from "/icons/CaretLeft.svg";
import { motion, useIsPresent } from "framer-motion";
import video from "/3mb-video.mp4";
import arrow from "/icons/ArrowDownRight.svg";

export const slideIn = {
  initial: {
    opacity: 0,
    y: 80,
  },

  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),

  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

export default function ProjectDetail() {
  let { id } = useParams();

  const { summaryData } = useSummaryData();

  let filterDataOfLevel = summaryData.filter(
    (item) => Number(item.id) === Number(id)
  );

  console.log("fil", filterDataOfLevel);
  //console.log(summaryData);
  console.log(id);

  const isPresent = useIsPresent();

  return (
    <>
      <div className="user-container-wrapper">
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0,
            transition: { duration: 0.5, ease: "circOut" },
          }}
          exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
          style={{ originX: isPresent ? 0 : 1 }}
          className="privacy-screen"
        />
        <Header
          title={"Portfolio"}
          bgColor={"bg-teal-900"}
          textColor={"text-white"}
        />

        {filterDataOfLevel.length === 0 ? (
          <section className="summaries-container flex items-start justify-center pt-16">
            <h2 className="text-xl font-semibold">Loading Portfolio...</h2>
          </section>
        ) : (
          <motion.div
            variants={slideIn}
            animate="enter"
            exit="exit"
            initial="initial"
          >
            {/* <button className="ms-6 mt-2 px-4 py-2 text-xl font-bold rounded-full aspect-square  bg-gray-200">{"<"}</button> */}

            <section className="profileNavigationContainer p-6 flex justify-between items-center bg-white">
              <Link to="/">
                <img
                  className="bg-gray-100 p-2 rounded-full"
                  src={backButton}
                  alt="back-button"
                />
              </Link>
              <div className="project-detail-link cursor-pointer">
                <Link to="/">
                  <div className="py-2 px-4 flex border-2 border-teal-600 rounded-full items-center">
                    <p className="text-teal-700 text-sm font-medium">Profile</p>
                    <img src={arrow} alt="arrow" className="max-w-6 max-h-4" />
                  </div>
                </Link>
              </div>
            </section>

            <section className="user-details-section flex items-center gap-4 px-6 rounded-lg relative bg-white">
              {/* <div className="profile-image w-[112px] h-[112px] rounded-full bg-black border-4 border-white"> */}
              {/* <div className="bg-blue-600 absolute h-[50%] w-full top-0 z-10 clip"></div>
            <div className="bg-blue-400 absolute h-[63%] w-full top-0 z-0 clip2"></div> */}
              {/* <div className="bg-white rounded-lg absolute h-[60%] w-full bottom-0 z-10"></div> */}

              <button className="profile-image w-[200px] h-[200px] rounded-lg z-20 cursor-pointer">
                <img
                  className="rounded-lg border-4 border-white"
                  src={filterDataOfLevel[0]?.generated_image_link}
                  alt="avatar"
                />
              </button>
              <div className="user-headings flex flex-col ">
             
                <h2 className="font-bold text-2xl text-black">
                  {filterDataOfLevel[0]?.idea_title}
                </h2>
                <p className="author font-medium text-sm text-teal-700">
                  {filterDataOfLevel[0]?.category}
                </p>
              </div>
            </section>

            <div className="userDetails-container pb-2">
              {/* <div className="wrapper"> */}

              {/* <div className="summary mb-2 relative bg-white">
              
            </div> */}
              {/* </div> */}
              <div className="wrapper summary py-6">
                <section className="summary-detail-section ">
                  <div className="user-headings flex flex-col">
                    {/* <div className="flex gap-2 items-center mb-2">
                <img src={Board} alt="board icon" />
                <h2 className="font-bold text-base ">Short summary about my project</h2>
              </div> */}
                    <h2 className="font-bold text-lg mb-3">
                      {/* <h2 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-2"> */}
                      Short summary about project
                    </h2>
                    <p className="author font-medium text-base text-[#222]">
                      {/* <p className="author font-medium text-base text-[#222] p-4 rounded-lg bg-blue-50"> */}
                      {filterDataOfLevel[0]?.long_description}
                    </p>
                  </div>
                </section>
              </div>
              <div className="wrapper summary py-6">
                <section className="user-submitted-video-section">
                  <div className="user-submitted-video-container">
                    <h2 className="font-bold text-lg mb-3">
                      {/* <h2 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-2"> */}
                      Submitted Video
                    </h2>
                    <video
                      src={video}
                      type="video/mp4"
                      controls
                      className="aspect-video"
                    ></video>
                    {/* <video src={video} type="video/mp4" controls className="aspect-auto p-4 bg-blue-50 rounded-lg"></video> */}
                  </div>
                </section>
              </div>

              <div className="wrapper summary py-6">
                <section className="user-badges-section">
                  <div className="user-badges-container">
                    <h2 className="font-bold text-lg mb-3">
                      {/* <h2 className="font-bold text-lg mb-3 border-l-4 border-blue-600 pl-2"> */}
                      Badges
                    </h2>
                    <div className="badges-container grid grid-cols-3 gap-4 ">
                      <div className="badge flex flex-col items-center bg-teal-50 rounded-lg" id="1">
                        <img src={badge3} alt="/" className="rounded-lg" />
                        <p className="text-sm font-medium  text-center p-1">
                          Performance Badge
                        </p>
                      </div>
                      <div className="badge flex flex-col items-center bg-teal-50 rounded-lg" id="2">
                        <img src={badge4} alt="/" className="rounded-lg" />
                        <p className="text-sm font-medium text-center p-1">
                          Performance Badge
                        </p>
                      </div>
                      <div className="badge flex flex-col items-center bg-teal-50 rounded-lg" id="3">
                        <img src={badge2} alt="/" className="rounded-lg" />
                        <p className="text-sm font-medium text-center p-1">
                          Performance
                        </p>
                      </div>
                      <div className="badge flex flex-col items-center bg-teal-50 rounded-lg" id="4">
                        <img src={badge1} alt="/" className="rounded-lg" />
                        <p className="text-sm font-medium text-center p-1">
                          Performance
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
