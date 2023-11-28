import React, { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

export interface CustomCardProps extends React.ComponentProps<typeof Card> {
  cardHeader?: ReactNode;
  cardContent?: ReactNode;
  cardFooter?: ReactNode;
}

const CustomCard = ({
  className,
  cardHeader: header,
  cardContent: content,
  cardFooter: footer,
  ...props
}: CustomCardProps) => {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>{header}</CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default CustomCard;
