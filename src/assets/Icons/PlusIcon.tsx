import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface PlusIcon extends SvgProps {
  size?: number; // Boyutunu ayarlamak için
  color?: string; // Rengini ayarlamak için
}
const PlusIcon: React.FC<PlusIcon> = ({size = 24, color = '#000', ...props}) => (
  <Svg width={size} height={size} fill="none" {...props}>
    <Path fill={color} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
  </Svg>
);
export default PlusIcon;
