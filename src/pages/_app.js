import "@/styles/globals.css";
import Header from '../components/Header';  // Adjust the path as needed
import Footer from '../components/Footer';  // Adjust the path as needed

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="bk-wrapper">
      <Header />
      <Component {...pageProps} />
      <Footer />
      </div>
    </>
  );
}
