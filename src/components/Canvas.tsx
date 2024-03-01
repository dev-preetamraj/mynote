"use client";

import { MutableRefObject, RefObject, useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";

const canvasBackground = "hsl(20 14.3% 4.1%)";
const erasorColor = canvasBackground;

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
  contextRef: MutableRefObject<CanvasRenderingContext2D | null | undefined>;
  saveToHistory: () => void;
};

const Canvas = ({ canvasRef, contextRef, saveToHistory }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const erasorActive = useSelector(
    (state: RootState) => state.draw.erasorActive
  );
  const canvasHistory = useSelector(
    (state: RootState) => state.draw.canvasHistory
  );
  const currentStep = useSelector((state: RootState) => state.draw.currentStep);
  const lineColor = useSelector((state: RootState) => state.draw.lineColor);
  const lineWidth = useSelector((state: RootState) => state.draw.lineWidth);
  const erasorWidth = useSelector((state: RootState) => state.draw.erasorWidth);
  const [drawing, setDrawing] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -1, y: -1 });

  const startDrawing = () => {
    contextRef.current?.beginPath();
    setDrawing(true);
  };

  const draw = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = contextRef.current;
    if (!context) return;

    const r = canvas.getBoundingClientRect();
    if (!r) return;

    const currX = e.clientX - r.left;
    const currY = e.clientY - r.top;
    setCursorPos({ x: currX, y: currY });

    if (!drawing) return;

    context.lineCap = "round";

    if (erasorActive) {
      context.lineWidth = erasorWidth;
      context.strokeStyle = erasorColor;
    } else {
      context.lineWidth = lineWidth;
      context.strokeStyle = lineColor;
    }

    context.lineTo(currX, currY);
    context.stroke();
    context.beginPath();
    context.moveTo(currX, currY);
  };

  const stopDrawing = () => {
    saveToHistory();
    contextRef.current?.closePath();
    setDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;

    context.fillStyle = canvasBackground;
    context.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      context.fillStyle = canvasBackground;
      context.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current = context;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = contextRef.current;
    if (!context) return;

    if (currentStep < 0) {
      context.fillStyle = canvasBackground;
      context.fillRect(0, 0, canvas.width, canvas.height);
      contextRef.current = context;
      return;
    }

    const img = new Image();
    img.src = canvasHistory[currentStep];
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
      contextRef.current = context;
    };
  }, [currentStep]);

  return (
    <div className="w-full h-full relative cursor-none group">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        height={3000}
        width={600}
      />
      <div
        className="dot-pointer hidden group-hover:block"
        style={{
          width: erasorActive ? erasorWidth : lineWidth + 4,
          height: erasorActive ? erasorWidth : lineWidth + 4,
          left: cursorPos.x,
          top: cursorPos.y,
          background: erasorActive ? "gray" : lineColor,
        }}
      />
    </div>
  );
};

export default Canvas;
