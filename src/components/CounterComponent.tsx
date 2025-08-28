import { animate, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

export const AnimatedCounter = ({ value }: { value: number }) => {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return controls.stop
  }, [value, count])

  return <>{display}+</>
}