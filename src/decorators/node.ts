import "reflect-metadata";
import { ExcalidocNodeType } from "../types";
import { ExcalidocDefaultNodeTypes } from "../defaults/nodes";

const NODE_METADATA_KEY = Symbol("excalidraw:node");
const NODE_PROPERTY_METADATA_KEY = Symbol("excalidraw:node:props");
const NODE_METHOD_METADATA_KEY = Symbol("excalidraw:node:method");

export interface NodeOptions {
  type: ExcalidocNodeType<ExcalidocDefaultNodeTypes>;
}

export const nodeRegistry = new Map<
  string,
  {
    target: any;
    options: NodeOptions;
    properties: { name: string; type: string }[];
    methods: { name: string; input: string; output: string }[];
  }
>();

export function Node(options: NodeOptions): ClassDecorator {
  return (target) => {
    const properties: { name: string; type: string }[] =
      Reflect.getMetadata(NODE_PROPERTY_METADATA_KEY, target) || [];

    const methods: { name: string; input: string; output: string }[] =
      Reflect.getMetadata(NODE_METHOD_METADATA_KEY, target) || [];

    nodeRegistry.set(target.name, {
      target,
      options,
      properties,
      methods,
    });

    Reflect.defineMetadata(NODE_METADATA_KEY, options, target);
  };
}

export interface NodePropertyOptions {
  type: string;
}

export function NodeProperty(options: NodePropertyOptions): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    const existingProps =
      Reflect.getMetadata(NODE_PROPERTY_METADATA_KEY, target.constructor) || [];

    Reflect.defineMetadata(
      NODE_PROPERTY_METADATA_KEY,
      [...existingProps, { name: propertyKey.toString(), type: options.type }],
      target.constructor
    );
  };
}

export interface NodeMethodOptions {
  input?: string;
  output?: string;
}

export function NodeMethod(options: NodeMethodOptions): MethodDecorator {
  return (target, propertyKey): void => {
    const exists =
      Reflect.getMetadata(NODE_METHOD_METADATA_KEY, target.constructor) || [];

    Reflect.defineMetadata(
      NODE_METHOD_METADATA_KEY,
      [
        ...exists,
        {
          name: propertyKey.toString(),
          input: options.input,
          output: options.output,
        },
      ],
      target.constructor
    );
  };
}
