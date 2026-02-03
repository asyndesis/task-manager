import { Component } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <div className="flex flex-col items-center text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <div>
              <h3 className="text-lg font-semibold text-destructive mb-2">
                {this.props.title || "Something went wrong"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {this.props.message ||
                  "An error occurred while rendering this section."}
              </p>
            </div>
            <Button onClick={this.handleReset} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
