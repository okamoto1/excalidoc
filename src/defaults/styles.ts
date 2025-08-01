import { ExcalidocStylesMapType } from "../types";
import { ExcalidocDefaultNodeTypes } from "./nodes";

export const excalidocDefaulStyles: ExcalidocStylesMapType<ExcalidocDefaultNodeTypes> =
  {
    [ExcalidocDefaultNodeTypes.Service]: {
      bg: "#DBEAFE",
      stroke: "#3B82F6",
      shape: "rectangle",
      icon: "🔧",
    },
    [ExcalidocDefaultNodeTypes.UseCase]: {
      bg: "#EDE9FE",
      stroke: "#8B5CF6",
      shape: "ellipse",
      icon: "🎯",
    },
    [ExcalidocDefaultNodeTypes.Factory]: {
      bg: "#D1FAE5",
      stroke: "#10B981",
      shape: "rectangle",
      icon: "🏭",
    },
    [ExcalidocDefaultNodeTypes.DomainModel]: {
      bg: "#F3F4F6",
      stroke: "#111827",
      shape: "rectangle",
      icon: "📦",
    },
    [ExcalidocDefaultNodeTypes.DatabaseModel]: {
      bg: "#FEE2E2",
      stroke: "#EF4444",
      shape: "rectangle",
      icon: "🗄️",
    },
    [ExcalidocDefaultNodeTypes.DomainEvents]: {
      bg: "#FEF9C3",
      stroke: "#F59E0B",
      shape: "rectangle",
      icon: "📣",
    },
  };
