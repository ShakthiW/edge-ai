"use client"

import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";
import { storage } from "@/app/firebaseConfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";

export function Features() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  useEffect(() => {
    const fetchImageURLs = async () => {
      try {
        const folderRef = ref(storage, "Features"); // Assuming your images are stored in a "skeletons" folder
        const imageFiles = await listAll(folderRef);
        const urlsPromises = imageFiles.items.map(async (fileRef) => {
          const url = await getDownloadURL(fileRef);
          return url;
        });
        const urls = await Promise.all(urlsPromises);
        setImageURLs(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageURLs();
  }, []);

  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={<Skeleton index={i + 1} imageURLs={imageURLs} />}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({
  index,
  imageURLs,
}: {
  index: number;
  imageURLs: string[];
}) => (
  <Image
    src={imageURLs[index - 1]} 
    width={100}
    height={100}
    className={cn("mx-auto object-cover w-full overflow-hidden")}
    alt={`skeleton-${index}`}
  />
);

const items = [
  {
    title: "Edge AI Technology",
    description:
      "Harness the power of Edge AI for real-time violence detection.",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "On-the-Go Protection",
    description:
      "Carry your safety net with Secureye's portable Edge AI device.",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Instant Threat Recognition",
    description:
      "Identify potential threats instantly with Secureye's Edge AI capabilities.",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Compact and Powerful",
    description:
      "Experience high-performance violence detection in a compact Edge AI device.",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Security Anywhere",
    description:
      "Bring intelligent security to any location with Secureye's Edge AI device.",
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Responsive Alert System",
    description:
      "Get notified immediately of detected violence, thanks to Secureye's Edge AI.",
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Efficient Monitoring",
    description:
      "Monitor your environment efficiently with Secureye's Edge AI device.",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
