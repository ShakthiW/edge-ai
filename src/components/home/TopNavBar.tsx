"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import { storage } from "@/app/firebaseConfig";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

export function TopNavBar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [videoURLs, setVideoURLs] = useState<string[]>([]);
  const [historyVideoURLs, setHistoryVideoURLs] = useState<string[]>([]);

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
        console.error("Error fetching live videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchHistoryVideos = async () => {
      try {
        const folderRef = ref(storage, "history");
        const files = await listAll(folderRef);
        const urlsPromises = files.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef);
          return url;
        });
        const urls = await Promise.all(urlsPromises);
        setHistoryVideoURLs(urls);
      } catch (error) {
        console.error("Error fetching history videos:", error);
      }
    };

    fetchHistoryVideos();
  }, []);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm text-white">
            <HoveredLink href="/">What is this app!</HoveredLink>
            <HoveredLink href="#about">About Us </HoveredLink>
            <HoveredLink href="#testemonials">Testemonials</HoveredLink>
            <HoveredLink href="#wishlist">Join Wishlist</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="History">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            {historyVideoURLs.map((url, index) => (
              <ProductItem
                key={index}
                title={new Date().toLocaleDateString()} // Use the date as the title
                href="/history"
                src={url} // Use the video URL as src
                description="Click to view"
              />
            ))}
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Real-Time">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            {videoURLs.map((url, index) => (
              <ProductItem
                key={index}
                title={`CCTV ${index + 1}`}
                href="/live-cctv"
                src={url} 
                description="Click to view"
              />
            ))}
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Contacts">
          <div className="flex flex-col space-y-4 text-sm text-black">
            <HoveredLink href="mailto:vinsuka@gmail.com">e-mail!</HoveredLink>
            <HoveredLink href="#about">Call </HoveredLink>
            <HoveredLink href="#testemonials">Request Demo</HoveredLink>
            <HoveredLink href="#wishlist">Join Wishlist</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Explore">
          <div className="flex flex-col space-y-4 text-sm text-black">
            <HoveredLink href="/login">LogIn</HoveredLink>
            <HoveredLink href="/signup">SignUp </HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
function setVideoURLs(urls: string[]) {
  throw new Error("Function not implemented.");
}

