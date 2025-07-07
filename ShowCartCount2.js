const productInfo = document.querySelector("#productInfo");

productList = JSON.parse(localStorage.getItem("productList"));

productInfo.addEventListener("submit", (e) => {
  e.preventDefault();

  const category = document.querySelector("#category").value;
  const p_name = document.querySelector("#p_name").value;
  const p_price = document.querySelector("#p_price").value;
  const p_url = document.querySelector("#p_url").value;

  console.log(category);
  console.log(p_name);
  console.log(p_price);
  console.log(p_url);

  const arr = productList || [];
  const id = arr.length + 1;

  const newProduct = {
    id,
    category,
    p_name,
    p_price,
    p_url,
  };

  arr.push(newProduct);

  localStorage.setItem("productList", JSON.stringify(arr));
  location.reload();
});

function show() {
  let output = "";

  productList?.forEach((product) => {
    output += `
       <div class = " col-xl-3 col-lg-4 col-md-6 mt-4">
       <div class = "card border-0 shadow">
        <img src =" ${product.p_url}" alt="" height = "200">
       <div class = "card-body">
       <h4> ${product.p_name} </h4>
       <ul>
        <li>category:- ${product.category} </li>
        <li>price :- ${product.p_price} </li>
         </ul>
        
         
          <div class = "btn1"
          <button onclick = "addToCart(${product.id})" class="btn btn-success"> Add to Cart </button>
          </div>


          <div class = "main-btn"
          <div class = "btn">
          <button onclick="trash(${product.id})" class="btn btn-dark">
                   <i class="fa-solid fa-trash"> </i>
         </button>
         
       
          <button onclick="update(${product.id})" class="btn btn-dark">
                    <i class="fa-solid fa-pen"> </i>
          </button>
        </div>
  </div>

   
    
        </div>
        </div>
        </div>
        `;

  });



  document.querySelector("#showProduct").innerHTML = output;
}
show();





function trash(id) {


  if (confirm("do you want to delete this product?")) {

    const filterProduct = productList.filter((product) => {

      return product.id !== id;
    });
    console.log(filterProduct);
    localStorage.setItem("productList", JSON.stringify(filterProduct));
    location.reload();
    show();
  }
}

function update(id) {
  document.querySelector("#submit").style.display = "none";
  document.querySelector("#update").style.display = "block";

  const singleUser = productList.find((product) => {
    return product.id === id;
  });
  console.log(singleUser);

  const category = document.querySelector("#category");
  const p_name = document.querySelector("#p_name");
  const p_price = document.querySelector("#p_price");
  const p_url = document.querySelector("#p_url");

  // alert(id)
  category.value = singleUser.category;
  p_name.value = singleUser.p_name;
  p_price.value = singleUser.p_price;
  p_url.value = singleUser.p_url;

  document.querySelector("#update").addEventListener("click", () => {
    alert("update.........");

    const newUser = {
      id,
      category: category.value,
      p_name: p_name.value,
      p_price: p_price.value,
      p_url: p_url.value,
    };
    console.log(newUser);

    const Index = productList.findIndex((product) => {
      return product.id === id;
    });
    productList[Index] = newUser;
    localStorage.setItem("productList", JSON.stringify(productList));
    location.reload();
    show();
  });
}

function addToCart(id) {
  alert("product add to cart");

  const singleProduct = productList.find((product) => {
    return product.id === id;
  });

  let cartList = JSON.parse(localStorage.getItem("cartList")) 
  

  const singlecart = cartList.find((cart) => {
    return cart.id === id;
  });

  if (singlecart) {
    singlecart.count += 1;
  } else {
    const newCart = {
      ...singleProduct,
      count: 1,
    };

    cartList.push(newCart);
  }

  localStorage.setItem("cartList", JSON.stringify(cartList));

  console.log(singlecart);
}


// function countCart(){
//   const cartList = JSON.parse(localStorage.getItem('cartList'))
    

//    document.querySelector('#cartcount').innerHTML = cartList.length;
// }
// countCart()


function countCart() {
  const cartList = JSON.parse(localStorage.getItem('cartList'));
  
  let totalQty = 0;
  cartList.forEach((item) => {
    totalQty += item.count;
  });

  document.querySelector('#cartcount').innerHTML = totalQty;
}
countCart();