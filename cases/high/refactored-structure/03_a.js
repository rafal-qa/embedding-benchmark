export function fit(sourceWidth, sourceHeight, boxWidth, boxHeight, mode) {
  const widthRatio = boxWidth / sourceWidth;
  const heightRatio = boxHeight / sourceHeight;

  let ratio;
  if (mode === "cover") {
    ratio = Math.max(widthRatio, heightRatio);
  } else {
    ratio = Math.min(widthRatio, heightRatio);
  }

  const width = Math.round(sourceWidth * ratio);
  const height = Math.round(sourceHeight * ratio);

  const horizontalGap = boxWidth - width;
  const verticalGap = boxHeight - height;

  return {
    width: width,
    height: height,
    offsetX: Math.round(horizontalGap / 2),
    offsetY: Math.round(verticalGap / 2)
  };
}
