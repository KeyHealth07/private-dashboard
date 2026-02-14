import "./globals.css";

export const metadata = {
  title: "Private Dashboard | Swiss Wealth Office",
  description: "Confidential Swiss private banking infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
