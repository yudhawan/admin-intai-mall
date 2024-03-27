import { ModalContextProp } from "@/type";
import { createContext } from "react";

export const ModalContext = createContext<ModalContextProp | null>(null)
export const ModalConsumer = ModalContext.Consumer