import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export const metadata = {
  title: "My Store",
  description: "Furniture shopping site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
