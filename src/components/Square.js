import React from "react";
import '../index.css';

const Square = ({ shade, onClick, style }) => {
    return (
        <button 
            className={"square " + shade}
            onClick={onClick}
            style={style}
        />
    )
}

export default Square;