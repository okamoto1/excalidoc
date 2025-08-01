import { randomUUID } from "crypto";
import { ExcalidocStylesType } from "./types";

export function buildShape(
  data: {
    id?: string;
    position: { x: number; y: number };
    dimensions?: { width: number; height: number };
    boundElements?: { type: string; id: string }[];
    groupIds?: string[];
  },
  style: ExcalidocStylesType
) {
  return {
    id: data.id || randomUUID(),
    type: style.shape || "rectangle",
    x: data.position.x,
    y: data.position.y,
    width: data.dimensions?.width || 200,
    height: data.dimensions?.height || 80,
    angle: 0,
    strokeColor: style.stroke,
    backgroundColor: style.bg,
    seed: Math.floor(Math.random() * 100000),
    isDeleted: false,
    groupIds: data.groupIds || [],
    boundElements: data.boundElements || [],
  };
}

export function buildArrow({
  dimensions,
  position,
  points,
  groupIds,
  id,
  binding,
}: {
  id?: string;
  position: { x: number; y: number };
  points: { x: number; y: number };

  dimensions: { width: number; height: number };
  boundElements?: { type: string; id: string }[];
  binding: {
    startId: string;
    endId: string;
  };
  groupIds?: string[];
}) {
  return {
    id: id || randomUUID(),
    type: "arrow",
    x: position.x,
    y: position.y,
    width: dimensions.width,
    height: dimensions.height,
    points: [
      [0, 0],
      [points.x, points.y],
    ],
    strokeColor: "#000000",
    backgroundColor: "transparent",
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 100000),
    isDeleted: false,
    startArrowhead: null,
    endArrowhead: "arrow",
    groupIds,
    elbowed: false,
    startBinding: {
      elementId: binding.startId,
      focus: -0.7143228568580989,
      gap: 11.020000000000067,
    },
    endBinding: {
      elementId: binding.endId,
      focus: 0.8952662721893501,
      gap: 1.5,
    },
  };
}

const DEFUALT_TEXT_HEIGHT = 25;
export function buildText(
  data: {
    position: { x: number; y: number };
    text: string;
    containerId?: string;
    groupIds?: string[];
  },
  style?: ExcalidocStylesType["text"]
) {
  const textWidth = data.text.length * 11.52;

  return {
    id: randomUUID(),
    type: "text",
    x: data.position.x,
    y: data.position.y,
    width: textWidth,
    height: DEFUALT_TEXT_HEIGHT,
    angle: 0,
    strokeColor: style?.stroke || "#1e1e1e",
    backgroundColor: style?.bg || "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: data.groupIds || [],
    frameId: null,
    // index: "a7",
    roundness: null,
    seed: Math.floor(Math.random() * 100000),
    isDeleted: false,
    boundElements: null,
    updated: 1753926987571,
    link: null,
    locked: false,
    text: data.text,
    fontSize: 20,
    fontFamily: 5,
    containerId: data.containerId,
    originalText: data.text,
    autoResize: true,
    lineHeight: 1.25,
  };
}

export function buldShapeWithText(
  data: {
    position: { x: number; y: number };
    title: string;
    properties: string[];
    methods: string[];
  },
  style: ExcalidocStylesType
) {
  const shapeId = randomUUID();
  const groupIds = [randomUUID()];

  const title = buildText({
    position: {
      x: data.position.x + 5,
      y: data.position.y + 5,
    },
    text: data.title,
    containerId: shapeId,
    groupIds,
  });
  const properties = data.properties.map((prop, index) =>
    buildText({
      position: {
        x: data.position.x + 2,
        y: title.y + (index + 1) * title.height,
      },
      text: prop,
      groupIds,
    })
  );

  const lastText = properties[properties.length - 1] || title;

  const methods = data.methods.map((prop, index) =>
    buildText({
      position: {
        x: data.position.x + 2,
        y: lastText.y + (index + 1) * lastText.height,
      },
      text: prop,
      groupIds,
    })
  );

  const texts = [title, ...properties, ...methods];

  const shape = buildShape(
    {
      ...data,
      id: shapeId,
      dimensions: {
        height: DEFUALT_TEXT_HEIGHT * texts.length + 30,
        width: Math.max(...texts.map((it) => it.width)) + 30,
      },
      groupIds,
    },
    style
  );

  return { shapeId: shape.id, elements: [shape, ...texts] };
}

export function buldArrowWithText({
  dimensions,
  label,
  points,
  position,
  groupIds,
  binding,
}: {
  position: { x: number; y: number };
  points: { x: number; y: number };
  dimensions: { width: number; height: number };
  binding: {
    startId: string;
    endId: string;
  };
  label: string;
  groupIds: string[];
}) {
  const arrowId = randomUUID();

  const title = buildText({
    position: {
      x: position.x,
      y: position.y,
    },
    text: label,
    containerId: arrowId,
    groupIds,
  });

  const arrow = buildArrow({
    position,
    dimensions,
    groupIds,
    points,
    id: arrowId,
    binding,
  });

  return { arrowId: arrowId, elements: [arrow, title] };
}
