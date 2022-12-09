import * as React from 'react';
import Svg, {Circle, G, Ellipse} from 'react-native-svg';

const ReactLogo = () => (
  <Svg viewBox="-11.5 -10.232 23 20.463">
    <Circle fill="#61dafb" r={2.05} />
    <G fill="none" stroke="#61dafb">
      <Ellipse rx={11} ry={4.2} />
      <Ellipse rx={11} ry={4.2} transform="rotate(60)" />
      <Ellipse rx={11} ry={4.2} transform="rotate(120)" />
    </G>
  </Svg>
);

export default ReactLogo;
