"use client"

import React, { useState } from "react";

import { Media } from "../../../public/media";

import img1 from "../../../public/images/img1.jpeg";
import { TopNavBar } from "@/components/home/TopNavBar";

const HistoryPage: React.FC = () => {
  const data = [
    {
      id: 1,
      poster: img1,
      videoUri: "",
    },
    {
      id: 2,
      poster: img1,
      videoUri: "",
    },
    {
      id: 3,
      poster: img1,
      videoUri: "",
    },
    {
      id: 3,
      poster: img1,
      videoUri: "",
    },
    {
      id: 3,
      poster: img1,
      videoUri: "",
    },
  ];

  const [file, setFile] = useState<{ type: string; url: string; } | null>(null);

  return (

    <div className="w-[95%] min-h-screen relative mx-auto my-[100px]">
      <TopNavBar />

      <h1 className="text-[#555] text-center p-4 text-[40px] font-bold mb-10">
        Footage Hostory
      </h1>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"}} className="gap-4 mx-5 my-auto">
        {/* {data.map((item, index) => {
          return (
            <div className="video" key={index}>
              <div className="video-container" onClick={() => setFile(item.id)}>
                <video src="/videos/video1.mp4" width={540} controls autoPlay loop muted/>
              </div>
            </div>
          );
        })} */}

        {
          Media.map((file, index) => (
            <div className="h-[220px] w-full overflow-hidden cursor-pointer" key={index} onClick={() => setFile(file)}>
              {
                file.type === "image"
                ? <img className="h-full w-full object-cover transition-all duration-300 ease-linear hover:scale-110" src={file.url} alt="image" width={540} height={300} />
                : <video className="h-full w-full object-cover transition-all duration-300 ease-linear hover:scale-110" src={file.url} muted/>
              }
            </div>
          ))
        }
      </div>

      <div className={`fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.8)] w-full h-full ${file ? 'block' : 'hidden'}`}>
          <span className="absolute top-1 right-5 text-[50px] font-extrabold z-50 cursor-pointer text-white" onClick={() => setFile(null)}>&times;</span>
          {
            file?.type === "image"
            ? <img className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] block max-w-[95%] max-h-[95%] object-contain border-[3px] border-solid border-white" src={file?.url} alt="image" width={540} height={300} />
            : <video className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] block max-w-[95%] max-h-[95%] object-contain border-[3px] border-solid border-white" src={`${file?.url}#t-0.001`} width={540} controls autoPlay loop muted preload="metadata"/>
          }
        </div>
    </div>
  );
};

export default HistoryPage;
