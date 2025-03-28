import { Rectangle } from "./Interfaces";

export const rectangularCollision = ({
  rectangle1,
  rectangle2,
}: {
  rectangle1: Rectangle;
  rectangle2: Rectangle;
}): boolean => {
  return (
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width
  );
};
