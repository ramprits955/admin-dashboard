import { Container } from "@mantine/core";
import { LayoutProps } from "@pankod/refine-core";
import React from "react";
import { AuthProvider } from "../../context/auth";
import Header from "../Header/Header";
import links from "./data";

type layoutProps = LayoutProps & { children: React.ReactNode };

const Layout: React.FC<layoutProps> = ({ children }: layoutProps) => {
  return (
    <AuthProvider>
      <Header links={links} />
      <Container>{children}</Container>
    </AuthProvider>
  );
};
export default Layout;
