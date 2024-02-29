"use client";

import { colors } from "@/lib/colors";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
  contextRef: MutableRefObject<CanvasRenderingContext2D | null | undefined>;
  erasor: boolean;
  lineColor: string;
  setLineColor: (value: string) => void;
};

const Canvas = ({
  canvasRef,
  contextRef,
  erasor,
  lineColor,
  setLineColor,
}: Props) => {
  const [drawing, setDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [cursorPos, setCursorPos] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (erasor) {
      setLineWidth(40);
      setLineColor("hsl(20 14.3% 4.1%)");
    } else {
      setLineWidth(2);
      setLineColor(colors.find((item) => item.id === 1)?.hex!);
    }
  }, [erasor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    contextRef.current = context;
  }, []);

  const startDrawing = () => {
    contextRef.current?.beginPath();
    setDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setDrawing(false);
  };

  const draw = (e: any) => {
    const r = canvasRef.current?.getBoundingClientRect();

    if (r) {
      const currX = e.clientX - r.left;
      const currY = e.clientY - r.top;
      setCursorPos({ x: currX, y: currY });

      if (!drawing) return;

      if (contextRef.current) {
        contextRef.current.lineCap = "round";
        contextRef.current.strokeStyle = lineColor;
        contextRef.current.lineWidth = lineWidth;
      }

      contextRef.current?.lineTo(currX, currY);
      contextRef.current?.stroke();
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(currX, currY);
    }
  };

  return (
    <div className="w-full h-full relative cursor-none pr-2 group">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        height={840}
        width={1400}
        className="border shadow-md shadow-gray-500"
      />
      {cursorPos.x !== -1 && cursorPos.y !== -1 && (
        <div
          className="dot-pointer hidden group-hover:block"
          style={{
            width: erasor ? lineWidth : 4,
            height: erasor ? lineWidth : 4,
            left: cursorPos.x,
            top: cursorPos.y,
            background: erasor ? "gray" : lineColor,
          }}
        />
      )}
    </div>
  );
};

export default Canvas;
