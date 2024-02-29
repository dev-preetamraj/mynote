import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
