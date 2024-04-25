"use client"

import { TopNavBar } from "@/components/home/TopNavBar";
import React, { useEffect, useState } from "react";

import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../firebaseConfig";

const LiveCCTV = () => {
  const [videoURLs, setVideoURLs] = useState<string[]>([]);
  const [focusVideoIndex, setFocusVideoIndex] = useState<number>(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const folderRef = ref(storage, "live");
        const files = await listAll(folderRef);

        const urlsPromises = files.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef);
          return url;
        });

        const urls = await Promise.all(urlsPromises);
        setVideoURLs(urls);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (index: number) => {
    setFocusVideoIndex(index);
  };

  return (
    <div className="grid gap-4 w-full bg-white bg-dot-black/[0.2] relative items-center justify-center overflow-x-hidden mt-20 mb-24">
      <TopNavBar />

      <div className="grid gap-4 justify-center items-center rounded-md">
        {/* Display the focus video */}
        {focusVideoIndex !== null && (
          <video
            className="rounded-lg"
            src={videoURLs[focusVideoIndex]}
            controls
            autoPlay
            loop
            muted
          />
        )}
      </div>
      <div className="grid grid-cols-5 gap-4 mx-auto max-w-[1500px]">
        {/* Display other videos */}
        {videoURLs.map((url, index) => (
          <div
            key={index}
            className={`grid gap-4 justify-between items-evenly rounded-md ${
              index === focusVideoIndex ? 'focus-video' : ''
            }`}
            onClick={() => handleVideoClick(index)}
          >
            <div>
              <video
                className="rounded-lg"
                src={url}
                width={"300px"}
                controls
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveCCTV;
