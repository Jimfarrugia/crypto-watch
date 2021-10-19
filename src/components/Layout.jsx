import Header from "./Header";
import Footer from "./Footer";
import { PageWrapper } from "./styled/PageWrapper.styled";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <PageWrapper>
        {children}
        <Footer />
      </PageWrapper>
    </>
  );
};

export default Layout;
