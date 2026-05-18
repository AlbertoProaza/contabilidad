import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Board - Gestión de Tareas",
  description: "Tablero de tareas minimalista para colaboración interna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
