export type ExcalidocShapesType = "rectangle" | "ellipse";

export type ExcalidocNodeType<N extends string | Record<string, string>> =
  N extends string ? N : N[keyof N] | (string & {});

export type ExcalidocStylesType = {
  bg: string;
  stroke: string;
  shape: ExcalidocShapesType;
  icon?: string;
  text?: Partial<Omit<ExcalidocStylesType, "icon" | "text">>;
};

export type ExcalidocStylesMapType<T extends string | Record<string, string>> =
  Record<ExcalidocNodeType<T>, ExcalidocStylesType>;


