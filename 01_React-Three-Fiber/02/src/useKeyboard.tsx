import React from "react";

export default function useKeyboard(): Record<string, boolean> {
  const keyMap = React.useRef<Record<string, boolean>>({});

  React.useEffect(() => {
    const onDocumentKey = (event: KeyboardEvent): void => {
      keyMap.current[event.code] = event.type === "keydown";
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
