var Validator = {
  handleSubmit: (event) => {
    event.preventDefault();
    var send = true;

    var inputs = form.querySelectorAll('input');

    Validator.clearErrors();

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var check = Validator.checkInput(input);
      if (check !== true) {
        send = false;
        Validator.showError(input, check);
      }
    }

    if (send) {
      form.submit();
    }
  },

  checkInput: (input) => {
    var rules = input.getAttribute('data-rules');

    if (rules !== null) {
      rules = rules.split('|');
      for (var k in rules) {
        var rDatails = rules[k].split('=');
        switch (rDatails[0]) {
          case 'required':
            if (input.value == '') {
              return 'Campo obrigatório';
            }
            break;
          case 'min':
            if (input.value.length < rDatails[1]) {
              return 'Campo mínimo de ' + rDatails[1] + ' caracteres';
            }
            break;
          case 'email':
            if (input.value != '') {
              var regex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return 'E-mail digitado inválido';
              }
            }
            break;
        }
      }
    }

    return true;
  },

  showError: (input, error) => {
    input.style.borderColor = '#ff0000';

    var errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },

  clearErrors: () => {
    var inputs = form.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
    }

    var errorElements = document.querySelectorAll('.error');
    for (var i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
};

var form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);
