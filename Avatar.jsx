import React, { Component } from 'react';

const Avatar = ({children,
    backgroundColor,
    padding,
    px,
    py,
    color,
    borderRadius,
    fontSize,
    width,
    textAlign,
    textdecoration

   }) => {
    const style = {
        backgroundColor,
        padding:"$(px) ${py}",
        color:color || "black",
        borderRadius,
        fontSize,
        width,
        textAlign:"center",
        cursor:"cursor" || null,
        textdecoration: "none"
    }
        return (
            <div style={style}>
                {children }
            </div>
        );
    
}

export default Avatar;