let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDescription = document.getElementById("productDescription");
let addBtn = document.getElementById("addBtn");
let productContainer = [];
let nameAlert = document.getElementById("nameAlert");
let priceAlert = document.getElementById("priceAlert");
if (localStorage.getItem("ourProducts") != null) {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  display();
}

productName.onkeyup = function () {
  let nameRegex = /^[A-Z][a-z]{3,7}$/;
  if (!nameRegex.test(productName.value)) {
    addBtn.disabled = "true";
    productName.classList.replace("is-valid", "is-invalid");
    // productName.classList.add("is-invalid");
    // productName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  } else {
    addBtn.removeAttribute("disabled");
    productName.classList.replace("is-invalid", "is-valid");
    // productName.classList.add("is-valid");
    // productName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  }
};

productPrice.onkeyup = function () {
  let priceRegex = /^[1-9][0-9][0-9][0-9][0-9]|100000$/;
  if (!priceRegex.test(productPrice.value)) {
    addBtn.disabled = "true";
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
    return false;
  } else {
    addBtn.removeAttribute("disabled");
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
    return true;
  }
};
productCategory.onkeyup = function () {
  let categoryRegex = /^(Mobile|Tab|Desktop)/;
  if (!categoryRegex.test(productCategory.value)) {
    addBtn.disabled = "true";
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    categoryAlert.classList.remove("d-none");
    return false;
  } else {
    addBtn.removeAttribute("disabled");
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    categoryAlert.classList.add("d-none");
    return true;
  }
};

addBtn.onclick = function () {
  addProduct();
  clearForm();
  display();
};
function addProduct() {
  if (addBtn.innerHTML == "updateProduct") {
    updateExistingProduct();
  } else {
    let products = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    };
    productContainer.push(products);
    localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  }
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}
function display() {
  let trs = "";
  for (let i = 0; i < productContainer.length; i++) {
    trs += `<tr>
   <td> ${i + 1}</td>
    <td> ${productContainer[i].name}</td>
     <td> ${productContainer[i].price}</td>
      <td> ${productContainer[i].category}</td>
      <td> ${productContainer[i].description}</td>
     <td><button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>Delete</button></td>
       <td><button class="btn btn-outline-warning" onclick='updateProduct(${i})' >Update</button></td>
   </tr>`;
  }
  document.getElementById("tbodyContent").innerHTML = trs;
}
function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  display();
}
let searchInput = document.getElementById("searchProduct");
searchInput.onkeyup = function () {
  let term = searchInput.value;
  let trs = "";
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      trs += `<tr>
   <td> ${i + 1}</td>
    <td> ${productContainer[i].name}</td>
     <td> ${productContainer[i].price}</td>
      <td> ${productContainer[i].category}</td>
      <td> ${productContainer[i].description}</td>
     <td><button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>Delete</button></td>
       <td><button class="btn btn-outline-warning" onclick='updateProduct(${i})'>Update</button></td>
   </tr>`;
    }
  }
  document.getElementById("tbodyContent").innerHTML = trs;
};
function updateProduct(index) {
  indexOfProductToUpdate = index;
  productName.value = productContainer[index].name;
  productPrice.value = productContainer[index].price;
  productCategory.value = productContainer[index].category;
  productDescription.value = productContainer[index].description;
  document.getElementById("addBtn").innerHTML = "updateProduct";
}
l;
function updateExistingProduct() {
  let updatedProduct = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  productContainer[indexOfProductToUpdate] = updatedProduct;
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  addBtn.innerHTML = "Add Product";
}
