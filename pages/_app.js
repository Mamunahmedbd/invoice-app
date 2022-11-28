import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        theme="light"
        pauseOnHover={false}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
