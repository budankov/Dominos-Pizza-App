import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const DominosPizzaLogoIcon = (props: SvgProps) => (
  <Svg
    height={20}
    width={60}
    viewBox="-24.42795 -40.893 211.7089 245.358"
    {...props}
  >
    <Path
      d="M52.389 52.643l49.6-49.6c3.7-3.7 7.9-4.4 12.4 0l46.1 46.1c3.3 3.3 3 8.3 0 11.3l-100.3 100.2c-3.6 3.6-8.3 4.2-12.5 0l-45.1-45.1c-3.6-3.6-3.3-9.3 0-12.6z"
      fill="#FFF"
    />
    <Path
      d="M53.189 57.743l51.9 51.9-47.2 47.2c-2.9 2.9-5.9 3-8.9 0l-43.2-43.2c-2.7-2.7-2.5-5.7 0-8.2z"
      fill="#006491"
    />
    <Path
      d="M108.389 106.543l-51.9-51.9 47.2-47.2c2.9-2.9 5.9-3 8.9 0l43.2 43.2c2.7 2.7 2.5 5.7 0 8.2z"
      fill="#E31837"
    />
    <Circle r={12.8} cy={54.743} cx={108.089} fill="#FFF" />
    <Circle r={12.8} cy={109.643} cx={72.189} fill="#FFF" />
    <Circle r={12.8} cy={109.643} cx={34.789} fill="#FFF" />
  </Svg>
);
export default DominosPizzaLogoIcon;
