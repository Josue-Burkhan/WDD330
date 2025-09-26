import ProductData from "./ProductData.mjs";
import ProductList from "./product-list.mjs";
import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const alerts = new Alert();
alerts.init();

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, listElement);

productList.init();