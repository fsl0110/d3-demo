import React, { FC, ReactNode, HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** This component has to have one or more childrens. */
  children: ReactNode | ReactNode[];
}

export const Page: FC<Props> = ({ children }) => {
  return <div className="page">{children}</div>;
};
