import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

const Navbar = () => {
  return (
    <div className="w-full h-[4rem] border-b bg-background sticky top-0 z-50 flex items-center justify-between px-10">
      <Link href="/" className="text-2xl">
        mynote
      </Link>
    </div>
  );
};

export default Navbar;
