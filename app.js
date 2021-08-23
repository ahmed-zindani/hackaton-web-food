
// let singupbtn = ()=>{
//   window.location.href = "singup.html"
// }

let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
     
      let uploading = storageRef.put(file)
      uploading.on('state_changed',
          (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              
              switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                      console.log('Upload is paused');
                      break;
                  case firebase.storage.TaskState.RUNNING:
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              reject(error)
          },
          () => {
              uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL)
              });
          }
      );
  })
}
















// console.log(firebase)












// let singupbtn = ()=>{
//     window.location.href = "singup.html"
// }

let register = async ()=>{
    let email =document.getElementById('email');
    let password = document.getElementById('pass');
    let fname = document.getElementById('name');
    let country = document.getElementById('country');
    let phoneNum = document.getElementById('phoneNum');
   let profile =document.getElementById('profile');
   let admin = document.getElementById('admin');
   let user = document.getElementById('user');

   let image = await uploadFiles(profile.files[0]);
    let data = {
      Name : fname.value,
      number : phoneNum.value,
      country: country.value,
      email : email.value,
      password : password.value,
      profile : image
    }

    


    // let id = firease.database().ref(`users`).push().key;
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      firebase.database().ref(`users/${res.user.uid}`).set(data)
      // let sucessAlert =document.getElementById('success-alert');
      // sucessAlert.innerHTML = "YOU SUBSCRIBE SUCCESFULLY"
      // sucessAlert.style.display = "block"
      // email.value = "";
      // password.value = "";
      // number.value="";
      // name.value = "";


      // errorAlert.style.display="none"
.then(()=>{
  setTimeout(() => {
    window.location.href = "login.html"
      
 },1000);


    })
    .catch((error) => {
       let errorAlert =document.getElementById("error");
       errorAlert.innerHTML = "ERROR" + error.message
       errorAlert.style.display="block"
      
      var errorCode = error.code;
      var errorMessage = error.message;
     console.log('error=>',errorMessage)
     
    });
})
};

let login =()=>{
  let email =document.getElementById('email');
  let password = document.getElementById('password');
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    localStorage.setItem(`uid`,userCredential.user.uid)
    var user = userCredential.user.uid;
     firebase.database().ref(`users/${user.uid}`)
     .once('value',(data)=>{
     console.log(data.val())
      setTimeout(() => {
        window.location = "profile.html"
          
      },500);
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message)
    swal({
        text:errorMessage,
        title: "Error"
        })
  });

}





async function addproduct() {
  let restaurantname = document.getElementById("resname").value
  let productname = document.getElementById("prodname").value
  let productprice = document.getElementById("prodprice").value
  let producttype = document.getElementById("prodtype").value
  let productimage = document.getElementById("prodimage").files[0]
  let imagename = productimage.name

  x = firebase.storage().ref("images").child(imagename)
  await x.put(productimage)
  let url = await x.getDownloadURL()

  //database
  let obj = {
      restaurantname,
      productname,
      productprice,
      producttype,
      url
  }

  console.log(obj)
  var key = (Math.random() * 92476829).toFixed()
  firebase.database().ref("orders/" + "id" + key).set(obj)

  alert("product added ")
  window.location.href ="restuarant.html"

}


function showitems() {
    

  firebase.database().ref("orders").on('child_added', function (data) {
      a = data.val()
      // console.log(a)
     
      document.getElementById("cards").innerHTML +=
          `<div class="card" style="width: 18rem;">
       <img id="img"
           src="${a.url}"
           class="card-img-top" alt="Burger">
       <div class="card-body">
           <h3 id="pname" class="card-text">${a.productname}</h3>
           <h5 id="price" class="card-text">${a.productprice}</h5>
           <h5 id="type" class="card-text">${a.producttype}</h5>
           <button onclick={abc()} class="btn btn-primary">Order</button>
       </div>
   </div>`
   

  })

}

showitems()


function yourproducts() {

  firebase.database().ref("orders").on('child_added', function (data) {
      a = data.val()
      // console.log(a)
      document.getElementById("admincards").innerHTML +=
          `<div class="card" style="width: 18rem;">
       <img id="img"
           src="${a.url}"
           class="card-img-top" alt="Burger">
       <div class="card-body">
           <h3 id="pname" class="card-text">${a.productname}</h3>
           <h5 id="price" class="card-text">${a.productprice}</h5>
           <h5 id="type" class="card-text">${a.producttype}</h5>
       </div>
   </div>`

  })

}

yourproducts()


let singupbtn = ()=>{
  window.location.href = "singup.html"
}



var food = [
  {
      shop: "PIZZA HUT",
      flavour: "TIKKA",
      price: 1750,
      url: "pizza-card.jfif"
  },
  {
      shop: "PIZZA HUT",
      flavour: "TIKKA",
      price: 1750,
      url: "pizza-card.jfif"
  },
  {
      shop: "PIZZA HUT",
      flavour: "TIKKA",
      price: 1750,
      url: "pizza-card.jfif"
  },
  {
      shop: "PIZZA HUT",
      flavour: "TIKKA",
      price: 1750,
      url: "pizza-card.jfif"
  },
  {
      shop: "PIZZA HUT",
      flavour: "TIKKA",
      price: 1750,
      url: "pizza-card.jfif"
  },
  {
      shop: "PIZZA HUT",
      flavour: "TIKKA",
      price: 1750,
      url: "pizza-card.jfif"
  },
];



// let filterData = food.filter(val => val.shop.startsWith("p"))

// console.log(filterData)


// var products = document.getElementById("products");
// for (var i = 0; i < food.length; i++) {
//   products.innerHTML +=`
//   <div class="card" style="width: 18rem;">
// <img src="${food[i].url}" class="card-img-top" alt="...">
// <div class="card-body">
//   <h5 class="card-title">${food[i].shop}</h5>
//   <h3 class="card-title">${food[i].flavour}</h3>
//   <p class="card-text">${food[i].price}</p>
//   <a href="#" onclick="addToCart(${i})" class="btn btn-primary">Add to cart</a>
// </div>
// </div>
//   `
// }


