import ProductData from "./ProductData.mjs";
import ProductList from "./product-list.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

import Breadcrumbs from "./Breadcrumbs.js";

loadHeaderFooter();

const category = getParam("category");
const query = getParam("q");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

if (query) {
  (async () => {
    const allProducts = await dataSource.getAllProductsByCategory();
    const filteredProducts = allProducts.filter((product) =>
      product.NameWithoutBrand.toLowerCase().includes(query.toLowerCase()),
    );
    myList.init(Promise.resolve(filteredProducts));
    const breadcrumbs = new Breadcrumbs(category, null, filteredProducts.length);
    breadcrumbs.render();
  })();
} else {
  myList.init().then(() => {
    const breadcrumbs = new Breadcrumbs(category, null, myList.products.length);
    breadcrumbs.render();
  });
}
