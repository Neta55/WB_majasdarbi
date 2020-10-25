$(function () {
  $('#save-btn').on('click', function () {
    const $form = $('#user-form');
    const formData = $form.serializeArray()


    // if (isFormValid(form)) {
    let userList = localStorage.userList;
    if (userList) {
      userList = JSON.parse(userList);
    } else {
      userList = [];
    }

    const user = {
      username: formData.find(function (row) { return row.name === 'username' }).value,
      email: formData.find((row) => row.name === 'email').value,
    }

    const userId = formData.find((row) => row.name === 'user-id').value;
    if (userId) {
      userList[userId] = JSON.stringify(user);
    } else {
      userList.push(JSON.stringify(user));
    }
    localStorage.userList = JSON.stringify(userList);



    renderTable();


    // } else {
    //   console.log ('form not valid')
    // }
  })





  function isFormValid(form) {
    let isFormValid = true;

    const errorMsgBlocks = document.getElementsByClassName('error-msg');
    Object.values(errorMsgBlocks).forEach(function (block) {
      block.innerHTML = ""
    })

    const username = form.namedItem('username').value;

    if (username.length < 6) {
      const errorMsg = document.getElementsByClassName('error-msg username')[0];
      errorMsg.innerHTML = "Min 6 characters needed for username"
      isFormValid = false;
    }

    const email = form.namedItem('email').value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      const errorMsg = document.getElementsByClassName('error-msg email')[0];
      errorMsg.innerHTML = "Incorect email!"
      isFormValid = false;
    }

    return isFormValid;
  }

  function renderTable() {
    const $tBody = $('#user-table').find('tbody');
    const usersList = localStorage.userList ? JSON.parse(localStorage.userList) : "";
    const $trExample = $('.tr-example');
    $tBody.html('');
    usersList.forEach(function (user, index) {
      const $newTr = $trExample.clone().show();
      user = JSON.parse(user);
      const nrpk = parseInt(index) + 1;
      $newTr.find('.nrpk').text(nrpk + '.');
      $newTr.find('.username').text(user.username);
      $newTr.find('.email').text(user.email);
      $newTr.find('.edit-btn').attr('user-id', index);
      $newTr.find('.delete-btn').attr('user-id', index);
      $tBody.append($newTr);

    })

    $('.edit-btn').on('click', function () {
      const userId = $(this).attr('user-id');
      const userList = JSON.parse(localStorage.userList);
      let user = userList[userId];
      user = JSON.parse(user);

      // const $form = $('#user-form');
      // const formData = $form.serializeArray();
      // formData.find((row) => row.name === 'username').value = user.username;
      // formData.find((row) => row.name === 'email').value = user.email;
      // formData.find((row) => row.name === 'user-id').value = userId;


      const form = document.getElementById('user-form').elements;
      form.namedItem('username').value = user.username;
      form.namedItem('email').value = user.email;
      form.namedItem('user-id').value = userId;
    })



    $('.delete-btn').on('click', function (ev) {
      const userId = $(this).attr('user-id');

      const userList = JSON.parse(localStorage.userList);
      userList.splice(userId, 1);
      localStorage.userList = JSON.stringify(userList);

      // location.reload();

      // vai labāks, ātrāks variants izdzēst / pārrakstīt tikai konkrēto rindu

      // const $tRowToDelete = $('#user-table').find('tr')[userId];
      // $tRowToDelete.html('');



      // const table = document.getElementById('user-table');
      // const tbody = table.getElementsByTagName('tbody')[0];
      // const tRowToDelete = tbody.getElementsByTagName('tr')[userId];
      // tRowToDelete.innerHTML = '';

      const $tRowToDelete = $('tbody').find('tr').eq(userId);
      $tRowToDelete.html('');


      // vai
      // renderTable()

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






