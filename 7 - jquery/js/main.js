window.addEventListener('load', function(){
  document.getElementById('save-btn').addEventListener('click', function(){
const form = document.getElementById('user-form').elements;

if (isFormValid(form)) {
  let userList = localStorage.userList;
  if (userList) {
    userList = JSON.parse(userList);
  } else {
    userList = [];
  }
  const user={
username: form.namedItem('username').value,
email: form.namedItem('email').value
  }
const userId = form.namedItem('user-id').value;
if (userId) {
  userList[userId]=JSON.stringify(user);
} else {
  userList.push(JSON.stringify(user));
}
  localStorage.userList=JSON.stringify(userList)

  renderTable()


} else {
  console.log ('form not valid')
}
  })





  function isFormValid(form) {
    let isFormValid = true;

    const errorMsgBlocks = document.getElementsByClassName('error-msg');
    Object.values(errorMsgBlocks).forEach(function(block){
      block.innerHTML = ""
    })

    const username = form.namedItem('username').value;
   
    if (username.length<6) {
      const errorMsg = document.getElementsByClassName('error-msg username')[0];
      errorMsg.innerHTML = "Min 6 characters needed for username"
      isFormValid=false;
    }

    const email = form.namedItem('email').value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
       const errorMsg = document.getElementsByClassName('error-msg email')[0];
      errorMsg.innerHTML = "Incorect email!"
      isFormValid=false;
    }

    return isFormValid;
  }

  function renderTable() {
    const table = document.getElementById('user-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''
    const usersList = JSON.parse(localStorage.userList);
    usersList.forEach(function(user, index) {
      user=JSON.parse(user)
      let nrpk = parseInt(index)+1
      tbody.innerHTML+=`
            <tr>
              <td>`+nrpk+`.</td>
              <td>`+user.username+`</td>
              <td>`+user.email+`</td>
              <td><button class="edit-btn" user-id=`+index+`>EDIT TEXT</button></td>
              <td><button class="delete-btn" user-id=`+index+`>DELETE</button></td>
            </tr>
      `
    })
    const editBtns = document.getElementsByClassName('edit-btn');
    Object.values(editBtns).forEach(function(btn){
      btn.addEventListener('click', function(event){
        const userId=event.target.getAttribute('user-id');
       
        const userList = JSON.parse(localStorage.userList)
        let user = userList[userId];
        user=JSON.parse(user)
        const form = document.getElementById('user-form').elements;
        form.namedItem('username').value = user.username;
        form.namedItem('email').value = user.email;
        form.namedItem('user-id').value = userId;
      })
    })

    const deleteBtns = document.getElementsByClassName('delete-btn');
    Object.values(deleteBtns).forEach(function(btn){
      btn.addEventListener('click', function(ev){
        const userId=ev.target.getAttribute('user-id');

       let userList = JSON.parse(localStorage.userList);
          userList.splice(userId,1);
          localStorage.userList=JSON.stringify(userList);

          // location.reload();

          // vai labāks, ātrāks variants izdzēst / pārrakstīt tikai konkrēto rindu
          const table = document.getElementById('user-table');
          const tbody = table.getElementsByTagName('tbody')[0];
          const tRowToDelete = tbody.getElementsByTagName('tr')[userId];
          tRowToDelete.innerHTML = '';

          // vai
          // renderTable()

      })
    })




  }
  
renderTable()



// function responseHandler(response) {
//   console.log(response)
//  $('body').append('<ul class="list"></ul>');

// response.data.forEach(function(user) {
//   $('.list').append('<li>' + user.email +'</li>');
//   $('.list').append('<img src=' + user.avatar +'>');
// })

// }



// $.ajax({
//   method:"GET",
//   url: "https://reqres.in/api/users"

// }).done(responseHandler)

})






