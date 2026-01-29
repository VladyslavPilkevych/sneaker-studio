import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { RefreshCw, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { CustomizerScene } from "../components/canvas/CustomizerScene";
import { useCustomizerStore } from "../store/customizer-store";
import { Suspense } from "react";
import { SNEAKER_MODELS } from "../data/models";
import { Seo } from "../components/Seo";
import { Loader } from "../components/canvas/Loader";
import { CanvasErrorBoundary } from "../components/3d/CanvasErrorBoundary";
import { Skeleton } from "../components/ui/skeleton";

const PRESET_COLORS = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#9b59b6",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#34495e",
];

function formatPartName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function SneakerPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentModel = SNEAKER_MODELS.find((m) => m.id === id);

  const {
    initModel,
    availableParts,
    selectedPart,
    selectPart,
    partColors,
    setPartColor,
    resetColors,
  } = useCustomizerStore();

  useEffect(() => {
    if (currentModel) {
      const configParam = searchParams.get("config");
      let initialConfig = currentModel.defaultConfig || {};

      if (configParam) {
        try {
          const parsed = JSON.parse(configParam);
          initialConfig = { ...initialConfig, ...parsed };
        } catch (e) {
          console.error("Failed to parse config from URL", e);
        }
      }

      initModel(currentModel.id, initialConfig);
    }
  }, [currentModel, initModel]);

  useEffect(() => {
    if (currentModel) {
      const configString = JSON.stringify(partColors);
      setSearchParams({ config: configString }, { replace: true });
    }
  }, [partColors, currentModel, setSearchParams]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleReset = () => {
    if (currentModel) {
      resetColors(currentModel.defaultConfig || {});
    }
  };

  if (!currentModel) {
    return (
      <div className="flex items-center justify-center h-screen">
        Model not found
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row">
      <Seo
        title={`Customize ${currentModel.name}`}
        description={`Customize your own ${currentModel.name}. Choose colors, materials and make it yours.`}
      />
      <div className="flex-1 bg-muted/20 flex items-center justify-center relative min-h-[50vh] md:min-h-auto border-b md:border-b-0">
        <CanvasErrorBoundary>
          <Suspense fallback={<Loader />}>
            <CustomizerScene modelUrl={currentModel.glb || ""} />
          </Suspense>
        </CanvasErrorBoundary>
      </div>

      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l bg-background flex flex-col">
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{currentModel.name}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {currentModel.description}
          </p>

          <Separator className="my-4" />

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Select Part
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availableParts.map((part) => (
                <Button
                  key={part}
                  variant={selectedPart === part ? "default" : "outline"}
                  className="w-full justify-start text-xs h-9"
                  onClick={() => selectPart(part)}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2 border border-border"
                    style={{ backgroundColor: partColors[part] || "#ffffff" }}
                  />
                  {formatPartName(part)}
                </Button>
              ))}
              {availableParts.length === 0 && (
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {selectedPart
                ? `Color: ${formatPartName(selectedPart)}`
                : "Select a part to edit"}
            </h3>
            <div
              className={`grid grid-cols-5 gap-2 ${!selectedPart ? "opacity-50 pointer-events-none" : ""}`}
            >
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring ring-offset-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    selectedPart && setPartColor(selectedPart, color)
                  }
                  title={color}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            {!selectedPart && (
              <p className="text-xs text-muted-foreground">
                Click a part on the model or list to change its color.
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t bg-muted/10">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button className="flex-1" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
