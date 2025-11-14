window.Face = function Face({
  width, height, centerX, centerY, strokeWidth
}) {
  const [config, setConfig] = React.useState(generateRandomConfig());
  const previous = React.useRef(config);  // stores old values
  const startTime = React.useRef(null);

  // On mount: update every 500 ms
  React.useEffect(() => {
    const interval = setInterval(() => {
      previous.current = config;     // track old state
      setConfig(generateRandomConfig());
      startTime.current = performance.now(); // reset animation timer
    }, 1000);
    return () => clearInterval(interval);
  }, [config]);

  // Animation: interpolate old → new values
  const [animatedConfig, setAnimatedConfig] = React.useState(config);

  React.useEffect(() => {
    let frameId;

    function animateFrame(time) {
      if (!startTime.current) startTime.current = time;

      const progress = Math.min((time - startTime.current) / 750, 1);  
      // 500 ms animation duration

      const interpolated = {
        eyeOffSetX: d3.interpolate(previous.current.eyeOffSetX, config.eyeOffSetX)(progress),
        eyeOffSetY: d3.interpolate(previous.current.eyeOffSetY, config.eyeOffSetY)(progress),
        eyeRadius:  d3.interpolate(previous.current.eyeRadius,  config.eyeRadius)(progress),
        mouthWidth: d3.interpolate(previous.current.mouthWidth, config.mouthWidth)(progress),
        mouthRadius:d3.interpolate(previous.current.mouthRadius,config.mouthRadius)(progress)
      };

      setAnimatedConfig(interpolated);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateFrame);
      }
    }

    frameId = requestAnimationFrame(animateFrame);
    return () => cancelAnimationFrame(frameId);
  }, [config]);

  const { eyeOffSetX, eyeOffSetY, eyeRadius, mouthWidth, mouthRadius } = animatedConfig;

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        <BackgroundCircle 
          radius={centerY - strokeWidth / 2} 
          strokeWidth={strokeWidth} 
        />
        <Eyes 
          eyeOffSetX={eyeOffSetX}
          eyeOffSetY={eyeOffSetY}
          eyeRadius={eyeRadius}
        />
        <Mouth
          mouthRadius={mouthRadius}
          mouthWidth={mouthWidth}
        />
      </g>
    </svg>
  );
};

function generateRandomConfig() {
  return {
    eyeOffSetX: 30 + Math.random() * 15,
    eyeOffSetY: 30 + Math.random() * 5,
    eyeRadius: 5 + Math.random() * 10,
    mouthWidth: 7 + Math.random() * 3,
    mouthRadius: 40 + Math.random() * 10
  };
}
