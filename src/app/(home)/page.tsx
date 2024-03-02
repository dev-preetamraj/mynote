"use client";

import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import { AppDispatch, RootState } from "@/features/store";
import jsPDF from "jspdf";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setCanvasHistory, setCurrentStep } from "@/features/draw/drawSlice";
import { canvasBackground } from "@/lib/colors";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const canvasHistory = useSelector(
    (state: RootState) => state.draw.canvasHistory
  );
  const toolbarOpen = useSelector((state: RootState) => state.draw.toolbarOpen);
  const currentStep = useSelector((state: RootState) => state.draw.currentStep);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null | undefined>(null);
  const [localSnapAvailable, setLocalSnapAvailable] = useState(false);

  useEffect(() => {
    if (!localStorage.canvasSnapshot) return;

    setLocalSnapAvailable(true);
    fetchCanvasContentFromLocal();
    setLocalSnapAvailable(false);
  }, []);

  const takeSnapshotOfCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return "";

    const snapshot = canvas.toDataURL();
    return snapshot;
  };

  const saveToHistory = () => {
    const snapshot = takeSnapshotOfCanvas();
    localStorage.canvasSnapshot = snapshot;
    const newHistory = canvasHistory.slice(0, currentStep + 1);
    dispatch(setCanvasHistory([...newHistory, snapshot]));
    dispatch(setCurrentStep(currentStep + 1));
  };

  const fetchCanvasContentFromLocal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = contextRef.current;
    if (!context) return;

    const imgUrl = localStorage.canvasSnapshot;
    if (!imgUrl) return;

    const img = new Image();
    img.src = imgUrl;
    dispatch(setCanvasHistory([imgUrl]));
    dispatch(setCurrentStep(currentStep + 1));
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = canvasBackground;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
      contextRef.current = context;
    };
  };

  const handleRestore = () => {
    if (!localSnapAvailable) return;

    fetchCanvasContentFromLocal();

    setLocalSnapAvailable(false);
  };

  const handleEraseAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const snapshot = canvas.toDataURL();
    localStorage.canvasSnapshot = snapshot;

    const context = contextRef.current;
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "hsl(20 14.3% 4.1%)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const snapForRedux = takeSnapshotOfCanvas();
    const newHistory = canvasHistory.slice(0, currentStep + 1);
    dispatch(setCanvasHistory([...newHistory, snapForRedux]));
    dispatch(setCurrentStep(currentStep + 1));
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

  const undo = useCallback(() => {
    if (currentStep >= 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  }, [currentStep]);

  const redo = useCallback(() => {
    if (currentStep < canvasHistory.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    }
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey && e.key === "z") {
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Z")) {
        redo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return (
    <ScrollArea className="w-full min-w-[40em] h-[calc(100vh-4rem)]">
      {toolbarOpen && (
        <Toolbar
          handleEraseAll={handleEraseAll}
          handleExportToPng={handleExportToPng}
          handleExportToPdf={handleExportToPdf}
          undo={undo}
          redo={redo}
          handleRestore={handleRestore}
          localSnapAvailable={localSnapAvailable}
        />
      )}
      <Canvas
        canvasRef={canvasRef}
        contextRef={contextRef}
        saveToHistory={saveToHistory}
        fetchCanvasContentFromLocal={fetchCanvasContentFromLocal}
      />
    </ScrollArea>
  );
};

export default HomePage;
