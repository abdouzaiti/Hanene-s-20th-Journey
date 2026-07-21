import * as React from "react"
import { cn } from "../lib/utils"
import { balloons, textBalloons } from "balloons-js"

export interface BalloonsProps {
  type?: "default" | "text"
  text?: string
  fontSize?: number
  color?: string
  className?: string
  onLaunch?: () => void
  autoLaunch?: boolean
}

const Balloons = React.forwardRef<any, BalloonsProps>(
  ({ type = "default", text, fontSize = 120, color = "#000000", className, onLaunch, autoLaunch = true }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    
    const launchAnimation = React.useCallback(() => {
      if (type === "default") {
        balloons()
      } else if (type === "text" && text) {
        textBalloons([
          {
            text,
            fontSize,
            color,
          },
        ])
      }
      
      if (onLaunch) {
        onLaunch()
      }
    }, [type, text, fontSize, color, onLaunch])

    // Auto-launch on mount if enabled
    React.useEffect(() => {
      if (autoLaunch) {
        const timer = setTimeout(() => {
          launchAnimation();
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [autoLaunch, launchAnimation])

    // Export launchAnimation method
    React.useImperativeHandle(ref, () => ({
      launchAnimation,
      ...(containerRef.current || {})
    }), [launchAnimation])

    return <div ref={containerRef} className={cn("balloons-container", className)} />
  }
)
Balloons.displayName = "Balloons"

export { Balloons }
