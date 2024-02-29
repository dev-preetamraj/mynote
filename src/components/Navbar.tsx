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

      <div className="flex items-center space-x-4">
        <Button size="sm" variant="secondary">
          <div className="flex items-center space-x-2">
          <span>Export to PDF</span>
          <DownloadIcon className="h-4 w-4" />
          </div>
        </Button>
        <Button size="sm" variant="secondary">
          <div className="flex items-center space-x-2">
          <span>Export to PNG</span>
          <DownloadIcon className="h-4 w-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
