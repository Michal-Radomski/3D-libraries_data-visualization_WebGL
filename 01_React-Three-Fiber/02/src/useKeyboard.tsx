import React from "react";

export default function useKeyboard(): Record<string, boolean> {
  const keyMap = React.useRef<Record<string, boolean>>({});

  React.useEffect(() => {
    const onDocumentKey = (e: KeyboardEvent): void => {
      keyMap.current[e.code] = e.type === "keydown";
    };

    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("keyup", onDocumentKey);

    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyup", onDocumentKey);
    };
  }, []);

  return keyMap.current;
}
