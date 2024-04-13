"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";

export function TopNavBar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
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
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="13 April, 2024"
              href="/history"
              src="/"
              description="Click to view"
            />
            <ProductItem
              title="14 Feb, 2024"
              href="/history"
              src="/"
              description="Click to view"
            />
            <ProductItem
              title="16 Oct, 2024"
              href="/history"
              src="/"
              description="Click to view"
            />
            <ProductItem
              title="21 Nov, 2024"
              href="/history"
              src="/"
              description="Click to view"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Real-Time">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="CCTV 01"
              href="/live-cctv"
              src="/"
              description="Click to view"
            />
            <ProductItem
              title="CCTV 02"
              href="/live-cctv"
              src="/"
              description="Click to view"
            />
            <ProductItem
              title="CCTV 03"
              href="/live-cctv"
              src="/"
              description="Click to view"
            />
            <ProductItem
              title="CCTV 04"
              href="/live-cctv"
              src="/"
              description="Click to view"
            />
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
