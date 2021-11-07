var productName = document.getElementById("Pname");
var productPrice = document.getElementById("Pprice");
var productCategory = document.getElementById("Pcategory");
var productDescription = document.getElementById("Pdescription");
var tempindexing;
var products = [];
if (
  localStorage.getItem("DATA") == null ||
  localStorage.getItem("DATA") == "[]"
) {
  alert("No Data To Show");
} else {
  products = JSON.parse(localStorage.getItem("DATA"));
  fillTable();
}

// prettier-ignore
function addProduct() {
    if (document.getElementById("addButton").innerHTML == "Add Product") {
        if (productName.value == "" || productPrice.value == "" || productCategory.value == "" || productDescription.value == "") {
            alert("Please Enter All Values");
        }
        else {
            var oneProduct = {
                index: products.length + 1,
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                description: productDescription.value
            };
            products.push(oneProduct);
            localStorage.setItem("DATA", JSON.stringify(products));
            fillTable();
            clear();
        }
    }
    else {
        updateProduct();
    }
}

function fillTable() {
  htmlInjection = "";
  for (var i = 0; i < products.length; i++) {
    var num = i + 1;
    // prettier-ignore
    htmlInjection += `
         <tr>
            <td>`+num+`</td>
            <td>`+products[i].name+`</td>
            <td>`+products[i].price+`</td>
            <td>`+products[i].category+`</td>
            <td>`+products[i].description+`</td>
            <td><button class="btn btn-success" onclick="updateData(`+i+`)"> Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteData(`+i+`)"> Delete</button></td>

          </tr>
          `;
  }
  document.getElementById("tableBody").innerHTML = htmlInjection;
}

function clear() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function search() {
  var text = document.getElementById("searchArea").value;
  var productsTemp = [];
  if (text == "") {
    fillTable();
  } else {
    for (var i = 0; i < products.length; i++) {
      if (products[i].name.includes(text)) {
        productsTemp.push(products[i]);
      } else {
        document.getElementById("tableBody").innerHTML = "";
      }
    }
    var htmlInjection2 = "";
    for (var i = 0; i < productsTemp.length; i++) {
      // prettier-ignore
      htmlInjection2 += `
         <tr>
            <td>`+ productsTemp[i].index + `</td>
            <td>`+ productsTemp[i].name + `</td>
            <td>`+ productsTemp[i].price + `</td>
            <td>`+ productsTemp[i].category + `</td>
            <td>`+ productsTemp[i].description + `</td>
            <td><button class="btn btn-success" onclick="updateData(`+i+`)"> Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteData(`+i+`)"> Delete</button></td>

          </tr>
          `;
    }
    document.getElementById("tableBody").innerHTML = htmlInjection2;
  }
}

function deleteData(index) {
  products.splice(index, 1);
  localStorage.setItem("DATA", JSON.stringify(products));
  fillTable();
}

function updateData(index) {
  tempindexing = index;
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productCategory.value = products[index].category;
  productDescription.value = products[index].description;
  document.getElementById("addButton").innerHTML = "Update";
  document.getElementById("addButton").style.backgroundColor = "#28A745";
}

function updateProduct() {
  // prettier-ignore
  if (productName.value == "" || productPrice.value == "" || productCategory.value == "" || productDescription.value == "") {
        alert("Please Enter All Values");
    }
    else {
            products[tempindexing].name = productName.value;
            products[tempindexing].price = productPrice.value;
            products[tempindexing].category = productCategory.value;
        products[tempindexing].description = productDescription.value;
      clear();
      fillTable();
       document.getElementById("addButton").innerHTML = "Add Product";
       document.getElementById("addButton").style.backgroundColor = "#007BFF";

    }
}
