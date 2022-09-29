
import PaginationLogic from "./pages/product/PaginationLogic";
//import SingleProduct from "./pages/singleProduct/SingleProduct";
//import Faq from "./pages/faq/Faq";
// import WheyFaq from "./pages/faq-whey/WheyFaq";
// import CreatineFaq from "./pages/faq-creatine/CreatineFaq";
// import FishOilFaq from "./pages/faq-fishoil/FishOilFaq";
// import Feedback from "./pages/feedback/Feedback";
// import About from "./pages/about/About";

import ScrollTop from "./components/scrollToTop/ScrollTop";
import InitialTopScroll from "./components/InitialTopScroll/InitialTopScroll";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Disclaimer from "./pages/disclaimer/Disclaimer";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";

//const PaginationLogic = lazy(() => import("./pages/product/PaginationLogic"));
const Faq = lazy(() => import("./pages/faq/Faq"));
const WheyFaq = lazy(() => import("./pages/faq-whey/WheyFaq"));
const CreatineFaq = lazy(() => import("./pages/faq-creatine/CreatineFaq"));
const FishOilFaq = lazy(() => import("./pages/faq-fishoil/FishOilFaq"));
const Feedback = lazy(() => import("./pages/feedback/Feedback"));
const About = lazy(() => import("./pages/about/About"));
const SingleProduct = lazy(() => import("./pages/singleProduct/SingleProduct"));


function App() {
  return (
    <Router>
      <InitialTopScroll />
      <ScrollTop />

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

          <Route exact path="/" element={<PaginationLogic />} />
          <Route path="/home" element={<PaginationLogic />} />

          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faq/whey" element={<WheyFaq />} />
          <Route path="/faq/creatine" element={<CreatineFaq />} />
          <Route path="/faq/fishoil" element={<FishOilFaq />} />
          <Route path="/contact" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </Suspense>

    </Router>
  );
}

export default App;
