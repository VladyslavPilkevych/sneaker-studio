import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in 3D scene:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center justify-center p-6 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 backdrop-blur-sm">
            <AlertTriangle className="w-10 h-10 mb-2" />
            <h3 className="font-bold">Failed to load 3D Content</h3>
            <p className="text-sm opacity-80 max-w-[200px] text-center">
              There was an error loading the 3D model. Please try refreshing.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
