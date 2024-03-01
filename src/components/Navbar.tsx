"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { handleToolbarOpenClose } from "@/features/draw/drawSlice";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const toolbarOpen = useSelector((state: RootState) => state.draw.toolbarOpen);

  return (
    <div className="w-full h-[4rem] border-b bg-background sticky top-0 z-50 flex items-center justify-between px-10">
      <Link href="/" className="text-2xl">
        mynote
      </Link>
      <div>
        <Button
          variant={toolbarOpen ? "secondary" : "outline"}
          onClick={() => dispatch(handleToolbarOpenClose(!toolbarOpen))}
        >
          Toolbar
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
