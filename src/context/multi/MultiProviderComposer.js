import { cloneElement } from "react";

export default function ContextProviderComposer ({ contextProviders, children }) {
  return contextProviders.reduceRight(
    (children, parent) => cloneElement(parent, { children }),
    children
  )
}
