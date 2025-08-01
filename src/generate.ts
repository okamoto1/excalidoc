import "reflect-metadata";
import { writeFileSync } from "fs";
import { nodeRegistry } from "./decorators/node";
import { edgeRegistry } from "./decorators/edge";
import fg from "fast-glob";
import { ExcalidocStylesMapType, ExcalidocStylesType } from "./types";
import { ExcalidocDefaultNodeTypes } from "./defaults/nodes";
import { buldArrowWithText, buldShapeWithText } from "./builders";

export async function generate(
  inputPattern: string[],
  stylesMap: ExcalidocStylesMapType<ExcalidocDefaultNodeTypes>,
  destination?: string
) {
  const filePaths = await fg(inputPattern, { absolute: true });
  for (const file of filePaths) {
    await import(file);
  }

  const elements: Record<string, any> = {};
  let x = 100;
  let y = 100;
  const nodeIds = new Map<string, string>();

  for (const {
    target,
    options,
    properties,
    methods,
  } of nodeRegistry.values()) {
    const style = stylesMap[
      options.type as ExcalidocDefaultNodeTypes
    ] as ExcalidocStylesType;
    const title = `${style.icon} ${target.name}`;

    const { elements: nodeElements, shapeId } = buldShapeWithText(
      {
        position: {
          x,
          y,
        },
        title,
        properties: properties.map((it) => `prop ${it.name}: ${it.type}`),
        methods: methods.map(
          (it) => `meth ${it.name}(${it.input || ""}): ${it.output || "void"}`
        ),
      },
      style
    );
    nodeIds.set(target.name, shapeId);
    nodeElements.forEach((node) => (elements[node.id] = node));
    y += 150;
  }

  for (const { target, options } of edgeRegistry) {
    const from = elements[nodeIds.get(options.from) || ""];
    const to = elements[nodeIds.get(options.to) || ""];

    if (from && to) {
      const { elements: edgeElements, arrowId } = buldArrowWithText({
        dimensions: {
          width: to.x - from.x,
          height: to.y - from.y - to.height / 2,
        },
        groupIds: [],
        label: options.label || "",
        points: {
          x: to.x - from.x,
          y: to.y - from.y - to.height,
        },
        position: {
          x: from.x + from.x / 2,
          y: from.y + from.height,
        },
        binding: {
          endId: to.id,
          startId: from.id,
        },
      });

      edgeElements.forEach((edge) => (elements[edge.id] = edge));
      from.boundElements = [
        ...(from.boundElements || []),
        { id: arrowId, type: "arrow" },
      ];
      to.boundElements = [
        ...(to.boundElements || []),
        { id: arrowId, type: "arrow" },
      ];
    }
  }

  const outputFile = destination || "excalidoc-diagram.excalidraw";
  const endsWithExcalidraw = outputFile.endsWith(".excalidraw");
  writeFileSync(
    endsWithExcalidraw ? outputFile : outputFile.concat(".excalidraw"),
    JSON.stringify(
      {
        type: "excalidraw",
        version: 2,
        source: "excalidoc",
        elements: Object.values(elements),
      },
      null,
      2
    )
  );
}
