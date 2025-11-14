const BackgroundCircle = ({ radius, strokeWidth }) => {
  return (
    <circle
      r={radius}
      stroke="black"
      strokeWidth={strokeWidth}
      fill="yellow"
    />
  );
};