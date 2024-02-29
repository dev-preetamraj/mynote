"use client";

import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import { colors } from "@/lib/colors";
import jsPDF from "jspdf";
import { useRef, useState } from "react";

const HomePage = () => {
  const [erasor, setErasor] = useState(false);
  const [lineColor, setLineColor] = useState(
    colors.find((item) => item.id === 1)?.hex
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(null);

  const handleEraseAll = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "hsl(20 14.3% 4.1%)";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleExportToPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgDataUri = canvas.toDataURL("image/png", 1);
    const a = document.createElement("a");
    a.href = imgDataUri;
    a.download = "mynote_export.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportToPdf = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgDataUri = canvas.toDataURL("image/png", 1);
    const pdf = new jsPDF();

    pdf.addImage(imgDataUri, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("mynote_export.pdf");
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center space-x-2">
      <Toolbar
        erasor={erasor}
        setErasor={setErasor}
        setLineColor={setLineColor}
        lineColor={lineColor!}
        handleEraseAll={handleEraseAll}
        handleExportToPng={handleExportToPng}
        handleExportToPdf={handleExportToPdf}
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
