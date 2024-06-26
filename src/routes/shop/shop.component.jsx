import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";

import "./shop.styles.scss";

const Shop = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
