const Eyes = ({eyeOffSetX, eyeOffSetY, eyeRadius}) => {
  return (
    <g>
        <circle 
        cx={eyeOffSetX} 
        cy={-eyeOffSetY}
        r={eyeRadius}>
        </circle>
        <circle 
        cx={-eyeOffSetX} 
        cy={-eyeOffSetY}
        r={eyeRadius}>
        </circle>
    </g>
  );
};