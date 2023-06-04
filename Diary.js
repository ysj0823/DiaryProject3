var diaryInfo = JSON.parse(localStorage.getItem("accountDiaryList"));
var userInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
var userId = userInfo[1];
var selectedDate = localStorage.getItem("date"); // 클릭한 날짜 가져오기

// 다이어리 내용 변수 선언
var diaryWeather = document.querySelector("#weather");
var diaryEmotion = document.querySelector("#emotion");
var diaryContent = document.querySelector("#diary");

const diaryDate = document.getElementById('date');
const saveButton = document.getElementById("save");

console.log(diaryInfo);
console.log(selectedDate);


// ============선택된 감정 이미지 표시===========
const emotionImgs = document.querySelectorAll('.emotion-img');

emotionImgs.forEach(img => {
  img.addEventListener('click', () => {
    emotionImgs.forEach(img => img.parentElement.classList.remove('selected'));
    img.parentElement.classList.add('selected');
    diaryEmotion.value = img.alt; // 선택한 이모티콘의 alt 속성 값을 diaryEmotion에 설정
    console.log(diaryEmotion.value);
  });
});

//========날짜 출력==========
function datesplit(str) {
  return str.split('-');
}

var year = parseInt(datesplit(selectedDate)[0], 10);
var month = parseInt(datesplit(selectedDate)[1], 10);
var date = parseInt(datesplit(selectedDate)[2], 10);
console.log(date);

var formattedDate = new Date(year, month - 1, date + 1);
var formattedDateString = formattedDate.toISOString().split('T')[0];
diaryDate.value = formattedDateString;

// 기존 데이터 확인 및 출력
var existingDiary = diaryInfo.find(diary => {
  return diary[1] == year && diary[2] == month && diary[3] == date;
});

if (existingDiary) {
  diaryWeather.value = existingDiary[4];
  diaryEmotion.value = existingDiary[5];
  diaryContent.value = existingDiary[6];
}

// =========일기 저장 버튼==========
saveButton.addEventListener("click", function() {
  var diaryDate = document.getElementById("date").value;
  var diaryWeather = document.getElementById("weather").value;
  var diaryEmotion = document.getElementById("emotion").value;
  var diaryContent = document.getElementById("diary").value;

  // 선택한 날짜의 데이터를 업데이트하여 로컬 스토리지에 저장
  var changeDate = datesplit(diaryDate);

  if (diaryDate != "" && diaryWeather != "" && diaryEmotion != null && diaryContent != "") {
    var foundIndex = -1;

    for (var i = 0; i < diaryInfo.length; i++) {
      var diary = diaryInfo[i];
      if (diary[1] == changeDate[0] && diary[2] == changeDate[1] && diary[3] == changeDate[2]) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      diaryInfo[foundIndex][4] = diaryWeather;
      diaryInfo[foundIndex][5] = diaryEmotion;
      diaryInfo[foundIndex][6] = diaryContent;
      localStorage.setItem("accountDiaryList", JSON.stringify(diaryInfo));
    } else {
      diaryInfo.push([userId, changeDate[0], changeDate[1], changeDate[2], diaryWeather, diaryEmotion, diaryContent]);
      localStorage.setItem("accountDiaryList", JSON.stringify(diaryInfo));
    }

    alert("일기장이 저장되었습니다.");

    setTimeout(function() {
      location.href = './Calendar.html';
    }, 0);
  } else {
    alert("날짜, 날씨, 감정, 일기를 모두 입력해주세요.");
  }
});