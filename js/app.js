//load api

const loadProducts = () => {
  const url = 'https://fakestoreapi.com/products';
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI

const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    //object destructuring
    const { image, title, category, price, rating, id } = product;
    const { rate, count } = rating;
    const div = document.createElement("div");
    div.classList.add("product");

    //card create  

    div.innerHTML = ` <div class="single-product">
                        <div>
                          <img class="product-image" src=${image}></img> 
                        </div>
                        <div>
                          <h3 class="text-primary">${title}</h3>
                          <p>Category: ${category}</p>
                          <h2>Price: $ ${price}</h2>
                          <p>Rating: ${rate}</p>
                          <p>Rated by: ${count} person</p>
                          <button onclick="addToCart(${id},${price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
                          <button id="details-btn" class="btn btn-danger">Details</button>
                        </div>
                      </div>
                    `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1; // updating number of total products
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element); // converting string to a float value
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2); // ensuring the decimal points cover 2 decimal value
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2); // ensuring the decimal points cover 2 decimal value
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal(); // accessing price,delivery and tax charge to calculate final value
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2); // calculating total amount upto 2 decimal point
};