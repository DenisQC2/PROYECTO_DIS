// src/components/Layout.js
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <header>Mi aplicación</header>
      <main>{children}</main>
      <footer>Pie de página</footer>
    </div>
  );
}
