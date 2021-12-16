const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

signUpBtn.onclick = function () {
  container.classList.add("sign-up-mode");
};
signInBtn.onclick = function () {
  container.classList.remove("sign-up-mode");
};

// handle password
// const getInput = document.querySelectorAll('input[name="password"]');
const seePassword = document.querySelectorAll(".look");
let flag = true;
seePassword.forEach((tag) => {
  tag.onclick = (e) => {
    if (flag) {
      e.target.classList.add("active");
      e.target.previousElementSibling.type = "text";
      flag = false;
    } else {
      e.target.classList.remove("active");
      e.target.previousElementSibling.type = "password";
      flag = true;
    }
  };
});

// login

// handle validation

function Validate(dataForm) {
  function getParents(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var formRule = {};

  let validRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng kiểm tra trường này";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập ít nhất ${min} kí tự`;
      };
    },
    email: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập đúng email !";
    },
  };

  // get form
  var formElement = document.querySelector(dataForm);
  if (formElement) {
    let inputs = document.querySelectorAll("input[name][rules]");
    for (var input of inputs) {
      let rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var ruleInfo;
        var isRuleHasValue = rule.includes(":");
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
          // console.log(validRules[rule](ruleInfo[1]));
        }
        let ruleRun = validRules[rule];
        if (isRuleHasValue) {
          ruleRun = ruleRun(ruleInfo[1]);
        }
        // console.log([input]);

        if (Array.isArray(formRule[input.name])) {
          formRule[input.name].push(ruleRun);
        } else {
          formRule[input.name] = [ruleRun];
        }
      }
      ///////
      input.onblur = handleValid;
      input.oninput = handleClear;
    }
    function handleValid(e) {
      let rulesValids = formRule[e.target.name];
      let errorMsg;
      for (var ruleTest of rulesValids) {
        errorMsg = ruleTest(e.target.value);
        if (errorMsg) {
          let inputField = getParents(e.target, ".input-field");
          if (inputField) {
            let formMsg = inputField.querySelector(".form-message");
            if (formMsg) {
              formMsg.classList.add("valid");
              formMsg.innerText = errorMsg;
            }
          }
          break;
        }
      }
    }
    function handleClear(e) {
      let inputField = getParents(e.target, ".input-field");
      let formMsg = inputField.querySelector(".form-message");
      if (formMsg.classList.contains("valid")) {
        formMsg.classList.remove("valid");
      }
      if (formMsg) {
        formMsg.innerText = "";
      }
    }
  }

  // console.log(formRule);
}

// hanlde login
const effectLoad = document.querySelector(".load");
const effect = document.querySelector(".lds-ellipsis");

let account = [
  {
    username: "admin",
    password: "adminday",
  },
];

function showLoading() {
  effectLoad.style.display = "flex";
  effect.style.display = "inline-block";
}

function hideLoading() {
  effectLoad.style.display = "none";
  effect.style.display = "none";
}

let btnLogin = document.querySelector("#login");
btnLogin.onclick = (e) => {
  let user = document.querySelector("#userLogin").value;
  let pass = document.querySelector("#passwordLogin").value;

  let checkAcc = account.some(
    (value) => user === value.username && pass === value.password
  );
  if (checkAcc) {
    showLoading();
    e.preventDefault();
    setTimeout(() => {
      window.location.replace("./home.html");
    }, 1500);
    // lưu key user
    let saveUser = localStorage.setItem("token", user);
  } else {
    e.preventDefault();
    swal({
      title: "Ơ kìa, không đúng rồi !",
      text: "Bạn có đang bỏ trống không đấy !",
      icon: "error",
      button: "Tiếp Tục",
    });
  }
};
