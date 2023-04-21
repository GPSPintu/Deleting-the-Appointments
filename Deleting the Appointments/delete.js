myObj={

}


function test() {
  //retrieving data
  var uid = document.getElementById("username").value;
  var pwd = document.getElementById("password").value;
  var eml = document.getElementById("email").value;

  alert(uid + pwd + eml);
  // storing data

  var user = localStorage.setItem("uid", uid);
  var pass = localStorage.setItem("pwd", pwd);
  var em = localStorage.setItem("eml", eml);


  // retrieving stored data and using it for calculation
  var user = localStorage.getItem("uid");
  var pass = localStorage.getItem("pwd");
  var em = localStorage.getItem("eml");

   myObj = {
    name: user,
    pass: pass,
    em: em,
  };

  let myObj_serialized = JSON.stringify(myObj);

  axios.post('https://crudcrud.com/api/41f33581b56a492daaf04af7424be5c8/boookanAppointment', myObj).then((response)=> {
    console.log(response)
    getOnscreen(response.data);
  }).catch((err)=>{
    console.log(err)
  })

}

function getOnscreen(data) {

  var x = document.createElement("LI");

  var getElement =
    "Name => " +
    data.name +
    ",   " +
    "e-mail => " +
    data.em +
    " ,    " +
    "  pwd => " +
    data.pass;

  var t = document.createTextNode(getElement);
  x.appendChild(t);

  var w = document.getElementById("myList");

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    axios.delete(`https://crudcrud.com/api/41f33581b56a492daaf04af7424be5c8/boookanAppointment/${data._id}`).then((response) => {
      console.log(response);
      w.removeChild(x);
    }).catch((err) => {
      console.log(err);
    })
  };
  x.appendChild(deleteButton);
  w.appendChild(x);

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";
  editButton.addEventListener("click", () =>{
    axios.put(`https://crudcrud.com/api/41f33581b56a492daaf04af7424be5c8/boookanAppointment/${data._id}`, myObj)
      .then((response) => {
        console.log(response);
        getOnscreen(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    editClickHandler(data, t, x, w);
  });
  x.appendChild(editButton);
  w.appendChild(x);

   
}

const editClickHandler = (data, t, x, w) => {
  axios.delete(`https://crudcrud.com/api/41f33581b56a492daaf04af7424be5c8/boookanAppointment/${data._id}`).then((response) => {
      console.log(response);
      w.removeChild(x);
     // w.removeChild(x);

    }).catch((err) => {
      console.log(err);
    })


  document.getElementById("username").value = data.name;
  document.getElementById("email").value = data.em;
  document.getElementById("password").value = data.pass;


};

window.addEventListener('DOMContentLoaded', ()=>{
    
  axios.get('https://crudcrud.com/api/41f33581b56a492daaf04af7424be5c8/boookanAppointment').then((response)=> {
    console.log(response)
    for(var i=0; i<response.data.length ;i++){
      getOnscreen(response.data[i]);
    }
    
}).catch((err)=>{
  console.log(err)
  
})
})

// const delay = (time) => {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve();
//       }, time);
//     });
//   };
  
//   delay(1000)
//     .then(() => {
//       console.log('1 second has passed');
//     });
  
