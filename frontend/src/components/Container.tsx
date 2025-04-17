import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <section
      className={cn(
        "w-full py-14 px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-72",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Container;
