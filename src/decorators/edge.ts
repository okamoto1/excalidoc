import "reflect-metadata";

export interface EdgeOptions {
  from: string;
  to: string;
  label?: string;
}

export const EDGE_METADATA_KEY = Symbol("excalidraw:edge");

export const edgeRegistry: { target: any; options: EdgeOptions }[] = [];

export function Edge(options: EdgeOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(EDGE_METADATA_KEY, options, target);
    edgeRegistry.push({ target, options });
  };
}
