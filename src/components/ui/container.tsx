import * as React from "react";
import { cn } from "@/lib/utils";

const Container = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div className={cn("container mx-auto", className)} ref={ref} {...props} />
));
Container.displayName = "Container";

export { Container };
