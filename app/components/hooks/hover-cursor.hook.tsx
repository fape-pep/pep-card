import {useEffect, useState} from "react";

export function useHoverCursor(defaultColor: string, hoverColor: string) {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    document.body.style.cursor = color !== defaultColor ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [color, defaultColor]);

  const onPointerOver = () => setColor(hoverColor);
  const onPointerOut = () => setColor(defaultColor);

  return {color, onPointerOver, onPointerOut};
}