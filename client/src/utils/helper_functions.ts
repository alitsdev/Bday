import Moment from 'moment';
const rough = require('roughjs/bundled/rough.esm.js');
// Functions that were on editor.js
// 2 hacky things to resolve, the any at line 35. and the bang operator at line 202

type style = {
	fontSize?: number;
	fontFamily?: string;
	color?: string;
	textAlign?: string;
	textBaseline?: string;
};
type info = {
	text: string;
	x: number;
	y: number;
};
type text = {
	name: string;
	age: number;
	date: Date;
	time: Date;
	address: string;
};
type element = {
	type: string;
	x1: number;
	x2: number;
	y1: number;
	y2: number;
};

const generator = rough.generator();

export const writeText = function (info: info, style: style = {}, medium: any) {
	const { text, x, y } = info;
	const {
		fontSize = 40,
		fontFamily = 'Annie Use Your Telescope',
		color = 'black',
		textAlign = 'left',
		textBaseline = 'top',
	} = style;

	medium.beginPath();
	medium.font = fontSize + 'px ' + fontFamily;
	medium.textAlign = textAlign;
	medium.textBaseline = textBaseline;
	medium.fillStyle = color;
	medium.fillText(text, x, y);
	medium.stroke();
};

export const writeDetails = function (
	text: text,
	medium: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) {
	writeText(
		{ text: `${text.name}`, x: medium.width / 2, y: 100 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: 'is turning', x: medium.width / 2, y: 150 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: `${text.age}`, x: medium.width / 2, y: 200 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: 'Join us for lots of fun on', x: medium.width / 2, y: 250 },
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{
			text: `${Moment(text.date).format('MMM Do')} at ${text.time}`,
			x: medium.width / 2,
			y: 300,
		},
		{ textAlign: 'center' },
		ctx
	);
	writeText(
		{ text: `${text.address}`, x: medium.width / 2, y: 350 },
		{ textAlign: 'center' },
		ctx
	);
};

export const createElement = function (
	id: string,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	type: string,
	color: string
) {
	let roughElement;
	if (type === 'line') {
		roughElement =
			color === 'none'
				? generator.line(x1, y1, x2, y2)
				: generator.line(x1, y1, x2, y2, {
						stroke: color,
				  });
	}
	if (type === 'rectangle') {
		console.log('color', color);
		roughElement =
			color === 'none'
				? generator.rectangle(x1, y1, x2 - x1, y2 - y1)
				: generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
						fill: color,
				  });
	}
	if (type === 'circle') {
		const center = { x: x1, y: y1 };
		const a = { x: x2, y: y2 };
		const radius = distance(center, a);
		roughElement =
			color === 'none'
				? generator.circle(x1, y1, 2 * radius)
				: generator.circle(x1, y1, 2 * radius, {
						fill: color,
				  });
	}
	if (type === 'triangle') {
		roughElement =
			color === 'none'
				? generator.polygon([
						[x1, y1],
						[x2, y2],
						[x2 + x1, y2 + y1],
				  ])
				: generator.polygon(
						[
							[x1, y1],
							[x2, y2],
							[x2 + x1, y2 + y1],
						],
						{ fill: color }
				  );
	}
	return { id, x1, y1, x2, y2, type, color, roughElement };
};

export const isWithinElement = (x: number, y: number, element: element) => {
	const { type, x1, x2, y1, y2 } = element;
	if (type === 'rectangle') {
		const minX = Math.min(x1, x2);
		const maxX = Math.max(x1, x2);
		const minY = Math.min(y1, y2);
		const maxY = Math.max(y1, y2);
		return x >= minX && x <= maxX && y >= minY && y <= maxY;
	}
	if (type === 'circle') {
		const center = { x: x1, y: y1 };
		const a = { x: x2, y: y2 };
		const b = { x, y };
		const radius = distance(center, a);
		const offset = distance(center, b) - radius;
		return offset < 1;
	}
	const a = { x: x1, y: y1 };
	const b = { x: x2, y: y2 };
	const c = { x, y };
	const offset = distance(a, b) - (distance(a, c) + distance(b, c));
	return Math.abs(offset) < 1;
};

type a = {
	x: number;
	y: number;
};
type b = {
	x: number;
	y: number;
};

export const distance = (a: a, b: b) =>
	Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

export const getElementAtPosition = (
	x: number,
	y: number,
	elements: element[]
) => {
	return elements.find((element) => isWithinElement(x, y, element));
};

export const localElements = localStorage.getItem('elements');
export let localElementsJson = localElements ? JSON.parse(localElements) : [];

export const localPartyDetails = localStorage.getItem('partyDetails');
export let localPartyDetailsJson = localElements
	? JSON.parse(localPartyDetails!)
	: {
			name: 'NAME',
			age: 'age',
			date: 'date',
			time: 'time',
			address: 'address',
	  };
