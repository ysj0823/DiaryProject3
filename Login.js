

const loginButton = document.getElementById("login");
const signUpButton = document.getElementById("signUp");

// 회원 목록 가져오기
var accountList = JSON.parse(localStorage.getItem('accountList'));
var accountDiaryList=JSON.parse(localStorage.getItem('accountDiaryList'));
console.log(accountDiaryList)
console.log(accountList);

loginButton.addEventListener("click", function() {
  login();
});


//회원가입 버튼
 signUpButton.addEventListener("click", function() {
    location.href = './Signup.html';
});


function login(){
    var inputId = document.getElementById("id").value;
    var inputPw = document.getElementById("pw").value;
    var loggedInUserInfo=null;//로그인한 사용자 데이터 넣을 변수

    //입력값과 저장된 사용자와 일치하는지 알아보는 for문
  for (var i = 0; i < accountList.length; i++) {
    var userInfo = accountList[i];
    var storedId = userInfo[1];
    var storedPw = userInfo[2];

    if (storedId === inputId && storedPw === inputPw) {
      //입력한 값과 일치 --> 로그인한 사용자 변수에 넣음
      loggedInUserInfo = userInfo;
      break;
    }
  }

    if (inputId == "" || inputPw == "") {
        alert("아이디 및 비밀번호를 입력해주세요.");
    }else if(loggedInUserInfo){
        localStorage.setItem('loggedInUserInfo',JSON.stringify(loggedInUserInfo));
        location.href="./Calendar.html"
    }else {
        alert("회원정보를 다시 입력해주세요.");
    }
};


