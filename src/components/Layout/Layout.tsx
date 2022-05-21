import { Container } from "@mantine/core";
import { LayoutProps } from "@pankod/refine-core";
import React from "react";
import Header from "../Header/Header";
import links from "../Logo/data";

type layoutProps = LayoutProps & { children: React.ReactNode };

const Layout: React.FC<layoutProps> = ({ children }: layoutProps) => {
  return (
    <>
      <Header links={links} />
      <Container>{children}</Container>
    </>
  );
};
export default Layout;
