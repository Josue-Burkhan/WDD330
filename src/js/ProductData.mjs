const baseURL = "import.meta.env.VITE_SERVER_URL";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {
    if (!baseURL) {
      throw new Error("VITE_SERVER_URL is not defined. Check your .env file.");
    }
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async getAllProductsByCategory() {
    const categories = ["tents", "backpacks", "sleeping-bags"];
    const promises = categories.map(category => this.getData(category));
    const results = await Promise.all(promises);
    return results.flat();
  }

  async getAllProducts() {
    const response = await fetch(`${baseURL}products/search/all`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProducts(query) {
    const response = await fetch(`${baseURL}products/search/${query}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}