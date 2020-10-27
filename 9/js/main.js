window.addEventListener('load', function () {

  document.getElementById('open-btn').addEventListener('click', function () {
    formApear()
  })

  function formApear() {
    const form = document.getElementById('recipient-form');
    let position = -208;
    const id = setInterval(apearing, 5);
    function apearing() {
      if (position == -8) {
        clearInterval(id);
      } else {
        position++;
        form.style.left = position + 'px';
      }
    }
  }

  function formDisapear() {
    const form = document.getElementById('recipient-form');
    let position = -8;
    const id = setInterval(disapearing, 5);
    function disapearing() {
      if (position == -208) {
        clearInterval(id);
        form.classList.add('hidden')
      } else {
        position--;
        form.style.left = position + 'px';
      }
    }
  }

  function popupDisapear() {
    const cover = document.getElementById('cover')
    cover.classList.add('hidden')
    const popUp = document.getElementById('pop-up')
    popUp.classList.add('hidden')
  }



  const checkedValue = document.getElementById('check-send')
  checkedValue.addEventListener('click', function () {
    if (checkedValue.checked) {
      checkedValue.setAttribute('value', 'Must send');
      const sendOptionLab = document.getElementById('send-option-lab')
      sendOptionLab.classList.remove('hidden');
      const emptyOption = document.getElementById('empty-option');
      emptyOption.remove()
    } else {
      checkedValue.setAttribute('value', "Don't send");
      const sendOptionLab = document.getElementById('send-option-lab')
      sendOptionLab.classList.add('hidden');
    }
  })

  document.getElementById('add-btn').addEventListener('click', function () {
    const form = document.getElementById('recipient-form').elements;

    if (isFormValid(form)) {
      let recipientList = localStorage.recipientList;
      if (recipientList) {
        recipientList = JSON.parse(recipientList);
      } else {
        recipientList = [];
      }
      const recipient = {
        recipientName: form.namedItem('recipient-name').value,
        email: form.namedItem('email').value,
        setSend: form.namedItem('check-send').value,
        sendOption: form.namedItem('send-option').value
      }
      const recipientId = form.namedItem('recipient-id').value;
      if (recipientId) {
        recipientList[recipientId] = JSON.stringify(recipient);
      } else {
        recipientList.push(JSON.stringify(recipient));
      }
      localStorage.recipientList = JSON.stringify(recipientList)
      const cover = document.getElementById('cover')
      cover.classList.remove('hidden')
      const popUp = document.getElementById('pop-up')
      popUp.classList.remove('hidden')
      popUp.innerHTML = ""
      popUp.innerHTML += `
        <p>
        Dear <strong>` + recipient.recipientName + `</strong>, you will be included in our newsletter list!
        </p>
        <button id="popup-btn">I UNDERSTAND</button>
        `

      document.getElementById('popup-btn').addEventListener('click', function () {
        formDisapear()
        popupDisapear()
        renderTable()
      })

    } else {
      console.log('form not valid')
    }


  })





  function isFormValid(form) {
    let isFormValid = true;

    const errorMsgBlocks = document.getElementsByClassName('error-msg');
    Object.values(errorMsgBlocks).forEach(function (block) {
      block.innerHTML = ""
    })

    const recipientName = form.namedItem('recipient-name').value;

    if (recipientName.length < 4) {
      const errorMsg = document.getElementsByClassName('error-msg recipient-name')[0];
      errorMsg.innerHTML = "Min 4 characters needed for your name"
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
    const table = document.getElementById('recipient-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    const recipientsList = localStorage.recipientList ? JSON.parse(localStorage.recipientList) : "";
    if (recipientsList.length) {
      table.classList.remove('hidden')
      recipientsList.forEach(function (recipient, index) {

        recipient = JSON.parse(recipient)
        let nrpk = parseInt(index) + 1
        tbody.innerHTML += `
            <tr>
              <td>`+ nrpk + `.</td>
              <td>`+ recipient.recipientName + `</td>
              <td>`+ recipient.email + `</td>
              <td>`+ recipient.setSend + `</td>
              <td>`+ recipient.sendOption + `</td>
              <td><button class="delete-btn" recipient-id=`+ index + `>&#10006</button></td>
            </tr>
      `

      })

    } else {
      const table = document.getElementById('recipient-table');
      table.classList.add('hidden')

    }
    const deleteBtns = document.getElementsByClassName('delete-btn');
    Object.values(deleteBtns).forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        const recipientId = ev.target.getAttribute('recipient-id');

        const recipientList = JSON.parse(localStorage.recipientList);
        recipientList.splice(recipientId, 1);
        localStorage.recipientList = JSON.stringify(recipientList);
        if (recipientsList.length) {
          // location.reload();

          // vai labāks, ātrāks variants izdzēst / pārrakstīt tikai konkrēto rindu
          const table = document.getElementById('recipient-table');
          const tbody = table.getElementsByTagName('tbody')[0];
          const tRowToDelete = tbody.getElementsByTagName('tr')[recipientId];
          tRowToDelete.innerHTML = '';
          location.reload();
        } else {
          const table = document.getElementById('recipient-table');
          table.classList.add('hidden')
        }


      })
    })




  }

  renderTable()

})




