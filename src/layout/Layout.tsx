import React from "react";
import { Header } from "./Header";
import { MainContent } from "./MainContent";
import { Footer } from "./Footer";
import json from "../../data/course.json";

export type LayoutProps = {
  children: React.ReactNode;
  items?: any;
};

export function Layout({ items, children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <MainContent items={items}>{children}</MainContent>
      <Footer />
    </div>
  );
}
