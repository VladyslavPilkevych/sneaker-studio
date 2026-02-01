import { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { RefreshCw, ShoppingCart, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useCartStore } from "../../store/cart-store";
import { Separator } from "../../components/ui/separator";
import { toast } from "react-toastify";
import { CustomizerScene } from "../../components/canvas/CustomizerScene";
import { useCustomizerStore } from "../../store/customizer-store";
import { SNEAKER_MODELS } from "../../data/models";
import allSneakersData from "../../../public/data/sneakers.json";
import { Seo } from "../../components/ui/Seo";
import { Loader } from "../../components/canvas/Loader";
import { CanvasErrorBoundary } from "../../components/3d/CanvasErrorBoundary";
import { Skeleton } from "../../components/ui/skeleton";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";

const PRESET_COLORS = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#808080",
];

function formatPartName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function SneakerPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMoreParts, setShowMoreParts] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>([]);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState("#000000");

  const ALL_SNEAKERS = [
    ...SNEAKER_MODELS,
    ...allSneakersData.filter(
      (s) => !SNEAKER_MODELS.find((m) => m.id === s.id),
    ),
  ] as unknown as typeof SNEAKER_MODELS;
  const currentModel = ALL_SNEAKERS.find((m) => m.id === id);
  const addItem = useCartStore((state) => state.addItem);

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
    if (currentModel && Object.keys(partColors).length > 0) {
      const configString = JSON.stringify(partColors);
      const currentParam = searchParams.get("config");
      if (currentParam !== configString) {
        setSearchParams({ config: configString }, { replace: true });
      }
    }
  }, [partColors, currentModel, setSearchParams, searchParams]);

  const handleAddToCart = () => {
    if (currentModel) {
      const customPrice = Number((currentModel.price * 1.5).toFixed(2));
      const customId = `${currentModel.id}-custom-${Date.now()}`;

      addItem({
        ...currentModel,
        id: customId,
        name: `${currentModel.name} (Custom)`,
        price: customPrice,
        image: currentModel.image,
        defaultConfig: partColors,

        materials: currentModel.materials,
        silhouette: currentModel.silhouette,
        colorways: currentModel.colorways,
        releaseDate: currentModel.releaseDate,
        tags: currentModel.tags,
        imageAlt: currentModel.imageAlt,
        description: currentModel.description,
        colors: currentModel.colors,
        badges: currentModel.badges,
        glb: currentModel.glb,
      });
      toast.success("Model added to cart!");
    }
  };

  const handleReset = () => {
    if (currentModel) {
      resetColors(currentModel.defaultConfig || {});
      setCustomColors([]);
      setSearchParams({});
    }
  };

  const cancelColorPicker = () => {
    setShowColorPicker(false);
  };

  const confirmColorPicker = () => {
    if (selectedPart) {
      setPartColor(selectedPart, tempColor);
      if (!customColors.includes(tempColor)) {
        setCustomColors([...customColors, tempColor]);
      }
    }
    setShowColorPicker(false);
  };

  if (!currentModel) {
    return (
      <div className="flex items-center justify-center h-screen">
        Model not found
      </div>
    );
  }

  const visibleParts = showMoreParts
    ? availableParts
    : availableParts.slice(0, 4);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row relative">
      <div className="absolute top-4 left-4 z-10 hidden md:block">
        <Breadcrumbs />
      </div>
      <Seo
        title={`Customize ${currentModel.name}`}
        description={`Customize your own ${currentModel.name}. Choose colors, materials and make it yours.`}
      />
      <div className="flex-1 bg-muted/20 flex items-center justify-center relative min-h-[50vh] md:min-h-auto border-b md:border-b-0">
        {currentModel.glb ? (
          <CanvasErrorBoundary>
            <Suspense fallback={<Loader />}>
              <CustomizerScene modelUrl={currentModel.glb || ""} />
            </Suspense>
          </CanvasErrorBoundary>
        ) : (
          <img
            src={currentModel.image}
            alt={currentModel.imageAlt}
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-xl"
          />
        )}
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
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Select Part
              </h3>
              {availableParts.length > 4 && (
                <button
                  onClick={() => setShowMoreParts(!showMoreParts)}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  {showMoreParts ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {visibleParts.map((part) => (
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
              {customColors.map((color, index) => (
                <button
                  key={`${color}-${index}`}
                  className="w-8 h-8 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring ring-offset-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    selectedPart && setPartColor(selectedPart, color)
                  }
                  title={color}
                  aria-label={`Select custom color ${color}`}
                />
              ))}
              <div
                className="relative w-8 h-8 rounded-full border border-border overflow-hidden hover:scale-110 transition-transform bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  if (selectedPart) {
                    setTempColor(partColors[selectedPart] || "#000000");
                    setShowColorPicker(true);
                  }
                }}
              >
                <Plus className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {showColorPicker && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1a1a33] p-4 rounded-lg shadow-xl border border-gray-200 dark:border-[#2d2d4a] z-50 flex flex-col gap-4">
                <h4 className="text-sm font-bold text-center">Pick a Color</h4>
                <input
                  type="color"
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="w-full h-10 cursor-pointer"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelColorPicker}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={confirmColorPicker}>
                    OK
                  </Button>
                </div>
              </div>
            )}
            {!selectedPart && (
              <p className="text-xs text-muted-foreground">
                Click a part on the model or list to change its color.
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t bg-muted/10 space-y-3">
          <div className="text-xs text-muted-foreground text-center">
            Custom design price:{" "}
            <span className="font-bold text-primary">
              ${(currentModel.price * 1.5).toFixed(2)}
            </span>{" "}
            (+50%)
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              className="flex-[2]"
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
