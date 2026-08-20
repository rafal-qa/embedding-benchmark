function ratioFor(widthRatio, heightRatio, mode) {
  let ratio;
  if (mode === "cover") {
    ratio = Math.max(widthRatio, heightRatio);
  } else {
    ratio = Math.min(widthRatio, heightRatio);
  }

  return ratio;
}

export function fit(sourceWidth, sourceHeight, boxWidth, boxHeight, mode) {
  const widthRatio = boxWidth / sourceWidth;
  const heightRatio = boxHeight / sourceHeight;

  const ratio = ratioFor(widthRatio, heightRatio, mode);

  const width = Math.round(sourceWidth * ratio);
  const height = Math.round(sourceHeight * ratio);

  const verticalGap = boxHeight - height;

  return {
    width: width,
    height: height,
    offsetX: Math.round((boxWidth - width) / 2),
    offsetY: Math.round(verticalGap / 2)
  };
}
