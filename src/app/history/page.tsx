"use client"

import React, { useState, useEffect } from "react";
import { TopNavBar } from "@/components/home/TopNavBar";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";

const HistoryPage: React.FC = () => {
  const [videos, setVideos] = useState<{ id: number; poster: string; videoUri: string }[]>([]);
  const [file, setFile] = useState<{ type: string; url: string } | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const folderRef = ref(storage, "history");
        const files = await listAll(folderRef);

        const videoPromises = files.items.map(async (fileRef, index) => {
          const videoUrl = await getDownloadURL(fileRef);
          const posterUrl = `/images/img${index + 1}.jpeg`; // Assuming you have posters for each video
          return { id: index + 1, poster: posterUrl, videoUri: videoUrl };
        });

        const videoData = await Promise.all(videoPromises);
        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-[95%] min-h-screen relative mx-auto my-[100px]">
      <TopNavBar />
      <h1 className="text-[#555] text-center p-4 text-[40px] font-bold mb-10">
        Footage History
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }} className="gap-4 mx-5 my-auto">
        {videos.map((item) => (
          <div className="h-[220px] w-full overflow-hidden cursor-pointer" key={item.id} onClick={() => setFile({ type: 'video', url: item.videoUri })}>
            <video className="h-full w-full object-cover transition-all duration-300 ease-linear hover:scale-110" poster={item.poster} controls autoPlay loop muted>
              <source src={item.videoUri} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
      <div className={`fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.8)] w-full h-full ${file ? 'block' : 'hidden'}`}>
        <span className="absolute top-1 right-5 text-[50px] font-extrabold z-50 cursor-pointer text-white" onClick={() => setFile(null)}>&times;</span>
        {file?.type === "image" ? (
          <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block max-w-[95%] max-h-[95%] object-contain border-[3px] border-solid border-white" src={file?.url} alt="image" width={540} height={300} />
        ) : (
          <video className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block max-w-[95%] max-h-[95%] object-contain border-[3px] border-solid border-white" src={`${file?.url}#t-0.001`} width={540} controls autoPlay loop muted preload="metadata" />
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
