import ProductData from "./ProductData.mjs";
import ProductList from "./product-list.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

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
  })();
} else {
  myList.init();
}
