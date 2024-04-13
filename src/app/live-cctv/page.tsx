"use client";

import { TopNavBar } from "@/components/home/TopNavBar";
import React, { useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig";

const LiveCCTV = () => {
  const [users, setUsers] = useState<{ id: string; [key: string]: any }[]>([]);

  useEffect(() => {
    const useRef = ref(database, "users");
    get(useRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...(typeof data === "object" && data !== null ? data : {}),
            })
          );

          setUsers(userArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="grid gap-4 w-full bg-white bg-dot-black/[0.2] relative items-center justify-center overflow-x-hidden mt-20 mb-24">
      <TopNavBar />

      <div className="grid gap-4 justify-center items-center rounded-md ">
        <video
          className="rounded-lg"
          src="/videos/video1.mp4"
          controls
          autoPlay
          loop
          muted
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mx-auto max-w-[1500px]">
        {users.map((user) => (
          <div
            key={user.id}
            className="grid gap-4 justify-between items-evenly rounded-md"
          >
            <div>
              <video
                className="rounded-lg"
                src={user.URL}
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
