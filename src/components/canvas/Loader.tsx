import { useProgress } from "@react-three/drei";

export function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center bg-background/80 backdrop-blur-md p-4 rounded-xl border shadow-lg">
        <div className="text-xl font-bold mb-2">Loading...</div>
        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {progress.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
