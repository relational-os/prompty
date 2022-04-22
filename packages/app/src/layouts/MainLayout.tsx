import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <div style={{ width: "60vw", margin: "0 auto" }}>{children}</div>;
};

export default MainLayout;
