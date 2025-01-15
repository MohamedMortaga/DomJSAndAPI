var productImage = document.getElementById("ProductImage"); // Get the product image input element
var productName = document.getElementById("ProductName");
var price = document.getElementById("ProductPrice");
var quantity = document.getElementById("ProductQuantity");
var category = document.getElementById("ProductCategory");
var discount = document.getElementById("ProductDiscount");
var description = document.getElementById("ProductDescription");
var Products = [];
var mb = document.getElementById("add");
var update = 0;
var incase = "create";
var s = 1;
// Function to display products as cards
function doit() {
  var cards = ``;
  for (let i = 0; i < Products.length; i++) {
    cards += `
          <div class="col mt-2">
            <div class="card" style="width: 14rem">
              <div class="card-body">
                  <h5 class="card-title ff mb-3 py-1 border-bottom border-1 " id="productName${i}">${Products[i].name}</h5>
                  <div class="d-flex col gap-3">
                    <h6 class="text-primary">Price:</h6>
                    <h6 class="card-title" id="productPrice${i}">${Products[i].price}</h6>
                  </div>
                  <div class="d-flex col gap-3">
                    <h6 class="text-primary">Quantity:</h6>
                    <h6 class="card-title" id="productQuantity${i}">${Products[i].quantity}</h6>
                  </div>
                  <div class="d-flex col gap-3">
                    <h6 class="text-primary">Category:</h6>
                    <h6 class="card-title" id="productCategory${i}">${Products[i].category}</h6>
                  </div>
                  <div class="d-flex col gap-3">
                    <h6 class="text-primary">Discount:</h6>
                    <h6 class="card-title" id="productDiscount${i}">${Products[i].discount}</h6>
                  </div>
                  <div class="d-flex col gap-3">
                    <h6 class="text-primary">Description:</h6>
                    <p class="card-text mt-1" id="productDescription${i}">${Products[i].description}</p>
                  </div>
                  <img src="${Products[i].image}" alt="Product Image" class="my-4" style="max-width:200px; height: 100px;">
                  <button type="button" onclick="addToCart(${i})" class="btn btn-primary">Add To Cart</button>
              </div>
            </div>
          </div>
        `;
  }
  document.getElementById("productContainer").innerHTML = cards;
}

if (localStorage.getItem("Products")) {
  Products = JSON.parse(localStorage.getItem("Products"));
}
doit();

// Function to add or update a product
function addProduct(event) {
  event.preventDefault();

  if (
    nameValdation() &&
    priceValdation() &&
    quantityValdation() &&
    categoryValdation() &&
    discountValdation() &&
    descriptionValdation() &&
    imageValidation()
  ) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var product = {
        name: productName.value,
        price: price.value,
        quantity: quantity.value,
        category: category.value,
        discount: discount.value,
        description: description.value,
        image: e.target.result,
      };

      if (incase == "create") {
        Products.push(product);
        alert("Add Successfully!");
      } else {
        Products[update] = product;
        alert("Update Successfully!");
      }

      clearForm();
      incase = "create";

      localStorage.setItem("Products", JSON.stringify(Products));
      displayProducts();

      mb.innerText = "Add Product";
    };

    if (productImage.files[0]) {
      reader.readAsDataURL(productImage.files[0]);
    }
  } else {
    alert("Add Unsuccessfully! (make sure all inputs are valid)");
  }
}

// Function to clear the form
function clearForm() {
  productName.value = "";
  price.value = "";
  quantity.value = "";
  category.value = "";
  discount.value = "";
  description.value = "";
  productImage.value = "";
}

// Function to display the products in a table
function displayProducts() {
  var rows = ``;
  for (var i = 0; i < Products.length; i++) {
    var product = Products[i];
    rows += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.category}</td>
        <td>${product.discount}</td>
        <td>${product.description}</td>
        <td><img src="${
          product.image
        }" alt="Product Image" style="max-width: 100px;"></td>
        <td>
          <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger" style="width:100px">Delete</button>
          <button type="button" onclick="updateProduct(${i})" class="btn btn-primary mt-2" style="width:100px">Update</button>
        </td>
        </tr>`;
  }
  document.getElementById("productTableBody").innerHTML = rows;
}

// Function to delete a product
function deleteProduct(index) {
  Products.splice(index, 1);
  localStorage.setItem("Products", JSON.stringify(Products));
  displayProducts();
  alert("Delete Successfully!");
}

// Function to edit a product
function updateProduct(index) {
  var product = Products[index];
  productName.value = product.name;
  price.value = product.price;
  quantity.value = product.quantity;
  category.value = product.category;
  discount.value = product.discount;
  description.value = product.description;
  incase = "update";
  update = index;

  mb.innerText = "Update Product";
  alert(
    "Back to dashboard and make update values and put the image even it is the same!"
  );
}

// Function to search for a product by name
function searchProduct(term) {
  var rows = ``;
  for (var i = 0; i < Products.length; i++) {
    if (Products[i].name.toLowerCase().includes(term.toLowerCase())) {
      Products[i].newName = Products[i].name.replace(
        term,
        `<span class="text-danger fw-bolder">${term}</span>`
      );
      rows += `
          <tr>
            <th>${i + 1}</th>
            <td>${
              Products[i].newName ? Products[i].newName : Products[i].name
            }</td>
            <td>${Products[i].price}</td>
            <td>${Products[i].quantity}</td>
            <td>${Products[i].category}</td>
            <td>${Products[i].discount}</td>
            <td>${Products[i].description}</td>
            <td><img src="${
              Products[i].image
            }" alt="Product Image" style="max-width: 100px;"></td>
            <td>
              <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger" style="width:100px">Delete</button>
              <button type="button" onclick="updateProduct(${i})" class="btn btn-primary mt-2" style="width:100px">Update</button>
            </td>
          </tr>
        `;
    }
  }
  document.getElementById("productTableBody").innerHTML = rows;
}

// Validation functions
function nameValdation() {
  var regex = /^[A-Z][a-z]{3,15}$/;
  if (regex.test(productName.value)) {
    document.getElementById("productNameHint").classList.add("d-none");
    return true;
  } else {
    document.getElementById("productNameHint").classList.remove("d-none");
    return false;
  }
}

function priceValdation() {
  var regex = /^[1-9][0-9]{0,9}$/;
  if (regex.test(price.value)) {
    document.getElementById("productPriceHint").classList.add("d-none");
    return true;
  } else {
    document.getElementById("productPriceHint").classList.remove("d-none");
    return false;
  }
}

function quantityValdation() {
  var regex = /^[1-9][0-9]{0,9}$/;
  if (regex.test(quantity.value)) {
    document.getElementById("productQuantityHint").classList.add("d-none");
    return true;
  } else {
    document.getElementById("productQuantityHint").classList.remove("d-none");
    return false;
  }
}

function categoryValdation() {
  var regex = /^[A-Z][a-z]{3,15}$/;
  if (regex.test(category.value)) {
    document.getElementById("productCategoryHint").classList.add("d-none");
    return true;
  } else {
    document.getElementById("productCategoryHint").classList.remove("d-none");
    return false;
  }
}

function discountValdation() {
  var regex = /^[1-9][0-9]{0,3}[%]$/;
  if (regex.test(discount.value)) {
    document.getElementById("productDiscountHint").classList.add("d-none");
    return true;
  } else {
    document.getElementById("productDiscountHint").classList.remove("d-none");
    return false;
  }
}

function descriptionValdation() {
  var regex = /^[A-Z][a-z]{3,15}$/;
  if (regex.test(description.value)) {
    document.getElementById("productDescriptionHint").classList.add("d-none");
    return true;
  } else {
    document
      .getElementById("productDescriptionHint")
      .classList.remove("d-none");
    return false;
  }
}

function imageValidation() {
  var file = productImage.files[0];
  var hint = document.getElementById("productImageHint");

  if (file && file.type.startsWith("image/")) {
    hint.classList.add("d-none");
    return true;
  } else {
    hint.classList.remove("d-none");
    return false;
  }
}






//Dom + Api
let allitems = [];
async function getallitems() {
  let res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=10006e3bc3e14e2c9147be96f2b1954a`,
    { method: "GET" }
  );
  let finaldata = await res.json();
  allitems = finaldata.articles;
  console.log(allitems);
  displayallitems();
}

getallitems();
function displayallitems() {
  let e = 5;
  let items = ``;
  if (s + e > allitems.length) {
    s = 1;
  }
  let o = 0;
  for (let i = s; i < s + e && i < allitems.length; i++) 
  {
    if (allitems[i].urlToImage != null) {
      o++;
      if (o == 3) 
      {
        let red = Math.round(Math.random() * 255);
        let green = Math.round(Math.random() * 255);
        let blue = Math.round(Math.random() * 255);
        
        items += ` <img 
        src="${allitems[i].urlToImage}" 
        alt="Image" 
        class="imgs p-1"
        style="border: 5px solid rgb(${red},${green},${blue});" 
        "
        />`;

        let bmg = document.getElementById("bimg");
        bmg.setAttribute("src", allitems[i].urlToImage);
        bmg.style.border = `5px solid rgb(${red},${green},${blue})`;

      } 
      else 
      {
        items += ` <img 
        src="${allitems[i].urlToImage}" 
        alt="Image" 
        class="imgs" 
        "
      />`;
      }
    } 
    else 
    {
      e++;
    }
  }
  document.getElementById("imgs").innerHTML = items;
}

let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");

prevButton.addEventListener("click", function () {
  s--;
  if (s < 1) {
    s = allitems.length - 5;
  }
  displayallitems();
});

nextButton.addEventListener("click", function () {
  s++;
  if (s + 5 > allitems.length) {
    s = 1;
  }
  displayallitems();
});
