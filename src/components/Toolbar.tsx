import { EraserIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { colors } from "@/lib/colors";
import { cn } from "@/lib/utils";

type Props = {
  erasor: boolean;
  lineColor: string;

  setErasor: (value: boolean) => void;
  setLineColor: (value: string) => void;
  handleEraseAll: () => void;
};

const Toolbar = ({
  setErasor,
  erasor,
  setLineColor,
  lineColor,
  handleEraseAll,
}: Props) => {
  return (
    <div className="min-w-[500px] h-full p-2 border-r flex flex-col space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          size="icon"
          variant={erasor ? "outline" : "secondary"}
          onClick={() => setErasor(false)}
        >
          <Pencil1Icon className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={erasor ? "secondary" : "outline"}
          onClick={() => setErasor(true)}
        >
          <EraserIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleEraseAll}>
          Erase everything
        </Button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="border-b pb-1">Color Palette</div>
        <div className="grid grid-cols-10 gap-4">
          {colors.map((item) => (
            <div
              key={item.id}
              className={cn("w-9 h-9 rounded-sm", {
                "rounded-full": item.hex === lineColor,
              })}
              style={{ background: item.hex }}
              onClick={() => {
                if (!erasor) setLineColor(item.hex);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
