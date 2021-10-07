import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
