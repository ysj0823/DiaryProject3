var userName = document.querySelector("#username");
var id = document.querySelector("#id");
var password = document.querySelector("#pw");
var rePassword = document.querySelector("#re-pw");

const idFailureMessage = document.querySelector(".id-failure-message");
const idSuccessMessage = document.querySelector(".id-success-message");
const misMatchMessage = document.querySelector(".mismatch-message");
const matchMessage = document.querySelector(".match-message");
const pwCondition = document.querySelector(".pw-condition");

const signUpButton = document.getElementById("signUp");

const userIDRegExp = /^[a-z]+[a-z0-9]{5,19}$/; // 아이디 정규식 영문자로 시작하는 영문자 또는 숫자 6-20
const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 비밀번호 정규식 8-16 문자, 숫자 조합
// const nicknameRegExp = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/; // 닉네임 정규식 2-10 한글, 숫자 또는 영문


/*******아이디 조건 메세지*******/
//id 입력 시 메시지 함수
id.onkeyup = function () {
  if (userIDRegExp.test(id.value)) {
    //성공 메시지 보임/실패 메시지 가림
    // idSuccessMessage.classList.remove("hide");
    idFailureMessage.classList.add("hide");
  } else {
    //성공 메시지 가림/실패 메시지 보임
    idSuccessMessage.classList.add("hide");
    idFailureMessage.classList.remove("hide");
  }
};


/******비밀번호 조건 메세지 *******/
//password 조건
password.onkeyup = function () {
  if (isMatch(password.value, rePassword.value)) {
    console.log("일치");
    misMatchMessage.classList.add("hide");
    matchMessage.classList.remove("hide");
  } else {
    console.log("불일치");
    misMatchMessage.classList.remove("hide");
    matchMessage.classList.add("hide");
  }

  if (passwordRegExp.test(password.value)) {
    pwCondition.classList.add("hide");
  } else {
    pwCondition.classList.remove("hide");
  }
};
//repassword 조건
rePassword.onkeyup = function () {
  if (isMatch(password.value, rePassword.value)) {
    misMatchMessage.classList.add("hide");
    matchMessage.classList.remove("hide");
  } else {
    console.log("불일치");
    misMatchMessage.classList.remove("hide");
    matchMessage.classList.add("hide");
  }
};
// 비밀번호 일치여부 함수
function isMatch(password1, password2) {
  if (password1 == password2) {
    if (password1 != "" || password2 != "")
      return true;
    } else {
      return false;
    }
}

// 뒤로가기 버튼
function back() {
    history.back();
}



/**********백엔드 역할 회원가입 코드*********/
var accountList; //여러 계정 담는 리스트 변수
var accountDiaryList;//모든 계정의 다이어리 리스트 담는 변수

var storedAccountList = localStorage.getItem('accountList');
//로컬스토리지에 데이터 있으면 가져오고, 없으면 빈 리스트
if (storedAccountList) {
  accountList = JSON.parse(storedAccountList);
} else {
  accountList = [];
}

var storedAccountDiaryList=localStorage.getItem('accountDiaryList');
if (storedAccountDiaryList) {
  accountDiaryList = JSON.parse(storedAccountDiaryList);
} else {
  accountDiaryList = [[]];
}


//회원가입 함수
function signup() {
    //여러사람 계정

    var userNickname = document.getElementById("username").value;
    var userLoginId = document.getElementById("id").value;
    var userPassword = document.getElementById("pw").value;
    var userRePassword = document.getElementById("re-pw").value;

  //아이디, 패스워드 조건
    const userIDRegExp = /^[a-z]+[a-z0-9]{5,19}$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

    // 중복된 아이디 확인
    var isDuplicate = accountList.some(function(userInfo) {
        return userInfo[1] === userLoginId;
    });

    if (userIDRegExp.test(userLoginId) && passwordRegExp.test(userPassword) && userPassword === userRePassword) {
        if (isDuplicate) {
            alert("중복된 아이디입니다.");
        } 
        //가입 성공
        else{   
                var userInfo = [userNickname, userLoginId, userPassword];
                accountList.push(userInfo);//사용자 한 명 데이터 넣기
                // accountDiaryList = [];//사용자 한 명 다이어리 리스트 넣기
                // accountDiaryList=[['qwer1234',"2023","06","03","맑음","very_happy","안녕 얘들아"]];
                alert("회원가입이 완료되었습니다.");
                localStorage.setItem('accountDiaryList', JSON.stringify(accountDiaryList));
                localStorage.setItem('accountList',JSON.stringify(accountList));
                location.href="./Login.html";
            }
    } else {
      alert("아이디: 영문자로 시작하는 영문자 또는 숫자 6-20자리\n패스워드:문자, 숫자조합 8-16자리");
    }
  }

// 회원가입 버튼
signUpButton.addEventListener("click", function() {
    signup();
});
