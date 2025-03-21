import Frame from "../components/Frame";

import corner1 from "../assets/frames/corner1.webp";
import topEdge1 from "../assets/frames/top-edge1.webp";
import rightEdge1 from "../assets/frames/right-edge1.png"; //idk why but this one just refuses to be a transparent webp

import corner2 from "../assets/frames/corner2.webp";
import topEdge2 from "../assets/frames/top-edge2.webp";
import rightEdge2 from "../assets/frames/right-edge2.webp";

import corner3 from "../assets/frames/corner3.webp";
import topEdge3 from "../assets/frames/top-edge3.webp";
import rightEdge3 from "../assets/frames/right-edge3.webp";

import empty from "../assets/frames/empty.webp";

const frames: Frame[] = [
	new Frame(corner1, topEdge1, rightEdge1),
	new Frame(corner2, topEdge2, rightEdge2),
	new Frame(corner3, topEdge3, rightEdge3),
];

export const EMPTY_FRAME = new Frame(empty, empty, empty);

export default frames;