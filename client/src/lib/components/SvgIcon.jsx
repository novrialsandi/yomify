import React from 'react';

const SVGIcon = ({ svg, color = '#848E9E', width = 20, height = 20 }) => {
	// Clone the SVG element and modify its properties
	const modifiedSvg = React.cloneElement(svg, {
		width,
		height,
		fill: color
	});

	// Modify the path element to use the new color
	const modifiedChildren = React.Children.map(modifiedSvg.props.children, (child) => {
		if (child.type === 'path') {
			return React.cloneElement(child, { fill: color });
		}
		return child;
	});

	// Create a new SVG element with modified properties and children
	return React.cloneElement(modifiedSvg, {}, modifiedChildren);
};

export default SVGIcon;
