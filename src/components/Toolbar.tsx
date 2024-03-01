import { DownloadIcon, EraserIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { colors } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import {
  handleErasorActivity,
  setCurrentStep,
  setLineColor,
  setLineWidth,
} from "@/features/draw/drawSlice";
import { Slider } from "./ui/slider";

type Props = {
  handleEraseAll: () => void;
  handleExportToPng: () => void;
  handleExportToPdf: () => void;
  undo: () => void;
  redo: () => void;
  handleRestore: () => void;
  localSnapAvailable: boolean;
};

const Toolbar = ({
  handleEraseAll,
  handleExportToPng,
  handleExportToPdf,
  undo,
  redo,
  handleRestore,
  localSnapAvailable,
}: Props) => {
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

  return (
    <Card className="max-w-[400px] absolute right-4 top-4 z-10">
      <CardHeader>
        <CardTitle>Toolbar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              variant={erasorActive ? "outline" : "secondary"}
              onClick={() => dispatch(handleErasorActivity(false))}
            >
              <Pencil1Icon className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant={erasorActive ? "secondary" : "outline"}
              onClick={() => dispatch(handleErasorActivity(true))}
            >
              <EraserIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleEraseAll}>
              Erase everything
            </Button>
          </div>

          <Slider
            defaultValue={[lineWidth]}
            max={10}
            step={1}
            onValueChange={(value) => dispatch(setLineWidth(value[0]))}
          />

          <div className="flex items-center space-x-4">
            <Button
              onClick={undo}
              disabled={currentStep < 0}
              variant="secondary"
            >
              Undo
            </Button>
            <Button
              onClick={redo}
              disabled={currentStep >= canvasHistory.length - 1}
              variant="secondary"
            >
              Redo
            </Button>
            <Button
              variant="secondary"
              onClick={handleRestore}
              disabled={!localSnapAvailable}
            >
              Restore saved
            </Button>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="border-b pb-1">Color Palette</div>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((item) => (
                <div
                  key={item.id}
                  className={cn("w-9 h-9 rounded-sm", {
                    "rounded-full": item.hex === lineColor,
                  })}
                  style={{ background: item.hex }}
                  onClick={() => {
                    if (!erasorActive) dispatch(setLineColor(item.hex));
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button variant="secondary" onClick={handleExportToPdf} disabled>
              <div className="flex items-center space-x-2">
                <span>Export to PDF</span>
                <DownloadIcon className="h-4 w-4" />
              </div>
            </Button>
            <Button variant="secondary" onClick={handleExportToPng}>
              <div className="flex items-center space-x-2">
                <span>Export to PNG</span>
                <DownloadIcon className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Toolbar;
