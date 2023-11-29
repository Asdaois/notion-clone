import { ReactNode } from "react";

export interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return <div className="h-screen p-6 flex justify-center">{children}</div>;
};

export default Template;
