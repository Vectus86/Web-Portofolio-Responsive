let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  header.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  header.classList.remove('active');
};

// let cursor1 = document.querySelector('.cursor-1');
// let cursor2 = document.querySelector('.cursor-2');

// window.onmousemove = (e) => {
//   cursor1.style.top = e.pageY + 'px';
//   cursor1.style.left = e.pageX + 'px';
//   cursor2.style.top = e.pageY + 'px';
//   cursor2.style.left = e.pageX + 'px';
// };

// document.querySelectorAll('a').forEach((links) => {
//   links.onmouseenter = () => {
//     cursor1.classList.add('active');
//     cursor2.classList.add('active');
//   };
//   links.onmouseleave = () => {
//     cursor1.classList.remove('active');
//     cursor2.classList.remove('active');
//   };
// });

// contact

(function () {
  function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {
      console.log('Robot Detected!');
      return true;
    } else {
      console.log('Welcome Human!');
    }
  }
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements)
      .filter(function (k) {
        return elements[k].name !== 'honeypot';
      })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];
      formData[name] = element.value;
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || 'Sheet1'; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ''; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var data = getFormData(form);
    if (data.email && !validEmail(data.email)) {
      var invalidEmail = form.querySelector('.email-invalid');
      if (invalidEmail) {
        invalidEmail.style.display = 'block';
        return false;
      }
    } else {
      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        console.log(xhr.status, xhr.statusText);
        console.log(xhr.responseText);
        var formElements = form.querySelector('.form-elements');
        if (formElements) {
          formElements.style.display = 'none'; // hide form
        }
        var thankYouMessage = form.querySelector('.thankyou_message');
        if (thankYouMessage) {
          thankYouMessage.style.display = 'block';
        }
        return;
      };
      var encoded = Object.keys(data)
        .map(function (k) {
          return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        })
        .join('&');
      xhr.send(encoded);
    }
  }

  function loaded() {
    console.log('Contact form submission handler loaded successfully.');
    var forms = document.querySelectorAll('form.gform');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', handleFormSubmit, false);
    }
  }
  document.addEventListener('DOMContentLoaded', loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();

let scroolTop = document.querySelector('.gotop');

window.addEventListener('scroll', () => {
  scroolTop.classList.toggle('gotop-active', window.scrollY >= 500);
});
