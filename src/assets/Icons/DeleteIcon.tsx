import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { Colors } from "../../constants/styles";


interface DeleteIconProps extends SvgProps {
    size?: number; // Boyutunu ayarlamak için
    color?: string; // Rengini ayarlamak için
}


const DeleteIcon: React.FC<DeleteIconProps> = ({ size = 24, color = Colors.red, ...props }) => (
    <Svg width={size}
        height={size} fill="none" {...props}>
        <Path
            fill={color}
            d="M10 5.25v.25h4v-.25a2 2 0 1 0-4 0Zm-1.25.25v-.25a3.25 3.25 0 0 1 6.5 0v.25h5.625a.625.625 0 1 1 0 1.25h-1.459l-1 11.928A3.625 3.625 0 0 1 14.804 22H9.196a3.625 3.625 0 0 1-3.612-3.322l-1-11.928H3.125a.625.625 0 0 1 0-1.25H8.75ZM6.83 18.573a2.375 2.375 0 0 0 2.366 2.177h5.608a2.375 2.375 0 0 0 2.367-2.177l.991-11.823H5.838l.992 11.823Zm3.92-8.448a.625.625 0 0 0-1.25 0v7.25a.625.625 0 0 0 1.25 0v-7.25Zm3.125-.625c.345 0 .625.28.625.625v7.25a.624.624 0 1 1-1.25 0v-7.25c0-.345.28-.625.625-.625Z"
        />
    </Svg>
)
export default DeleteIcon