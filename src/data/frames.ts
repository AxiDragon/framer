import Frame from "../components/Frame";

import frame1 from "../assets/frames/frame1.png";
import edge1 from "../assets/frames/edge1.png";

import frame2 from "../assets/frames/frame2.png";
import corner2 from "../assets/frames/corner2.png";
import edge2 from "../assets/frames/edge2.png";

import frame3 from "../assets/frames/frame3.png";
import corner3 from "../assets/frames/corner3.png";
import edge3 from "../assets/frames/edge3.png";

import frame4 from "../assets/frames/frame4.png";
import corner4 from "../assets/frames/corner4.png";
import edge4 from "../assets/frames/edge4.png";

import frame5 from "../assets/frames/frame5.png";
import corner5 from "../assets/frames/corner5.png";
import edge5 from "../assets/frames/edge5.png";

import empty from "../assets/frames/empty.webp";

const frames: Frame[] = [
	new Frame(frame1, empty, edge1),
	new Frame(frame2, corner2, edge2),
	new Frame(frame3, corner3, edge3),
	new Frame(frame4, corner4, edge4),
	new Frame(frame5, corner5, edge5),
];

export const EMPTY_FRAME = new Frame(empty, empty, empty);

export default frames;