import Frame from "../components/Frame";

import frame1 from "../assets/frames/frame1.png";
import corner1 from "../assets/frames/corner1.webp";
import edge1 from "../assets/frames/edge1.webp";

import frame2 from "../assets/frames/frame2.png";
import corner2 from "../assets/frames/corner2.webp";
import edge2 from "../assets/frames/edge2.webp";

import frame3 from "../assets/frames/frame3.png";
import corner3 from "../assets/frames/corner3.webp";
import edge3 from "../assets/frames/edge3.webp";

import empty from "../assets/frames/empty.webp";

const frames: Frame[] = [
	new Frame(frame1, corner1, edge1),
	new Frame(frame2, corner2, edge2),
	new Frame(frame3, corner3, edge3),
];

export const EMPTY_FRAME = new Frame(empty, empty, empty);

export default frames;