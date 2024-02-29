"use client";

import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import { colors } from "@/lib/colors";
import { useRef, useState } from "react";

const HomePage = () => {
  const [erasor, setErasor] = useState(false);
  const [lineColor, setLineColor] = useState(
    colors.find((item) => item.id === 1)?.hex
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const handleEraseAll = () => {
    if (canvasRef.current && contextRef.current)
      contextRef.current?.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center space-x-2">
      <Toolbar
        erasor={erasor}
        setErasor={setErasor}
        setLineColor={setLineColor}
        lineColor={lineColor!}
        handleEraseAll={handleEraseAll}
      />
      <Canvas
        canvasRef={canvasRef}
        contextRef={contextRef}
        erasor={erasor}
        lineColor={lineColor!}
        setLineColor={setLineColor}
      />
    </div>
  );
};

export default HomePage;
