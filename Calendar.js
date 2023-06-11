const editButton = document.getElementById("editbutton");
const deleteButton = document.getElementById("deletebutton");

//저장한 회원정보, 다이어리 가져옴.
var loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
var loggedInUserDiary = JSON.parse(localStorage.getItem("accountDiaryList"));
console.log(loggedInUserInfo);
console.log(loggedInUserDiary);

// ==============닉네임 표시=============
function displayNickname() {
  var Nick = document.getElementById("nickname");

  if (loggedInUserInfo) {
    // var Nick = loggedInUserInfo.userLoginId;
    Nick.textContent = loggedInUserInfo[0] + "님의 감정록";
  } else {
    alert("로그인을 다시 해주세요.");
    location.href="./index.html";
  }
}
displayNickname();

// ===========메뉴버튼============
//월간 통계 버튼
document.getElementById("statistic").addEventListener("click", function () {
  location.href = "./monthly_statistic.html";
});

//로그아웃 버튼
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedInUserInfo");

  location.href = "./index.html";
});

//마이페이지 버튼
document.getElementById("mypage").addEventListener("click", function () {
  location.href = "./MyPage.html";
});

//===========작성 버튼=============
editButton.addEventListener("click", function () {
  location.href = "./Diary.html";
});



// ==================달력========================
(function () {
  calendarMaker($("#calendarForm"), new Date());
})();

var nowDate = new Date();
function calendarMaker(target, date) {
  if (date == null || date == undefined) {
    date = new Date();
  }
  nowDate = date;
  if ($(target).length > 0) {
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    $(target).empty().append(assembly(year, month));
  } else {
    console.error("custom_calendar Target is empty!!!");
    return;
  }

  var thisMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
  var thisLastDay = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);

  var tag = "<tr>";
  var cnt = 0;
  //빈 공백 만들어주기
  for (i = 0; i < thisMonth.getDay(); i++) {
    tag += "<td></td>";
    cnt++;
  }

  //날짜 채우기
  for (i = 1; i <= thisLastDay.getDate(); i++) {
    if (cnt % 7 == 0) {
      tag += "<tr>";
    }

    tag += "<td>" + i + "</td>";
    cnt++;
    if (cnt % 7 == 0) {
      tag += "</tr>";
    }
  }
  $(target).find("#custom_set_date").append(tag);
  calMoveEvtFn();

  function assembly(year, month) {
    var calendar_html_code =
      "<table class='custom_calendar_table'>" +
      "<colgroup>" +
      "<col style='width:81px'/>" +
      "<col style='width:81px'/>" +
      "<col style='width:81px'/>" +
      "<col style='width:81px'/>" +
      "<col style='width:81px'/>" +
      "<col style='width:81px'/>" +
      "<col style='width:81px'/>" +
      "</colgroup>" +
      "<thead class='cal_date'>" +
      "<th><button type='button' class='prev'><</button></th>" +
      "<th colspan='5'><p><span>" +
      year +
      "</span>년 <span>" +
      month +
      "</span>월</p></th>" +
      "<th><button type='button' class='next'>></button></th>" +
      "</thead>" +
      "<thead  class='cal_week'>" +
      "<th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>" +
      "</thead>" +
      "<tbody id='custom_set_date'>" +
      "</tbody>" +
      "</table>";
    return calendar_html_code;
  }

  function getDayOfWeek(n) {
    //ex) getDayOfWeek('2022-06-13')

    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dayOfWeek = week[new Date(n).getDay()];

    return dayOfWeek;
  }

  function calMoveEvtFn() {
    //전달 클릭
    $(".custom_calendar_table").on("click", ".prev", function () {
      nowDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() - 1,
        nowDate.getDate()
      );
      calendarMaker($(target), nowDate);
    });
    //다음날 클릭
    $(".custom_calendar_table").on("click", ".next", function () {
      nowDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        nowDate.getDate()
      );
      calendarMaker($(target), nowDate);
    });
    //일자 선택 클릭
    $(".custom_calendar_table").on("click", "td", function () {
      $(".custom_calendar_table .select_day").removeClass("select_day");
      var y = String(year);
      var m = String(month);
      var n = $(this).text();
      var nn = Number(n);
      var nnn = "0" + n;

      if (month < 10) {
        mm = "0" + m;
        if (nn < 10) {
          var dates = y + "-0" + m + "-0" + n;
          nnn = "0" + n;

          // 잠시 추가
          nn = "0" + nn;
        } else {
          dates = y + "-0" + m + "-" + n;
        }
      } else {
        if (nn < 10) {
          dates = y + "-" + m + "-0" + n;
          nnn = "0" + n;

          // 잠시 추가
          nn = "0" + nn;
        } else {
          dates = y + "-" + m + "-" + n;
        }
      }

      date = y + "-" + m + "-" + n;
      $("#deletebutton").css("visibility", "hidden");

      var loggedInUserDiary = localStorage.getItem("accountDiaryList");
      loggedInUserDiary = JSON.parse(loggedInUserDiary);

      var userDiary = loggedInUserDiary.filter(function (diary) {
        return diary[0] === loggedInUserInfo[1];
      });

      console.log(userDiary);

      //삭제버튼
      deleteButton.addEventListener("click", function() {
        loggedInUserDiary.forEach((e, index) => {
          if (e[0] === loggedInUserInfo[1] && e[1] == y && e[2] == mm && e[3] == nn) {
            const confirmed = confirm("일기를 삭제하시겠습니까?");
            
            if (confirmed) {
              loggedInUserDiary.splice(index, 1); 
              alert("일기가 삭제되었습니다.");
              localStorage.setItem("accountDiaryList", JSON.stringify(loggedInUserDiary));
              location.reload();
            }
            return;
          }
        });
      });

      if (userDiary && Array.isArray(userDiary)) {
        let diaryFound = false;

        userDiary.forEach((e) => {
          if (e[1] == y && e[2] == mm && e[3] == nn) {
            $("#deletebutton").css("visibility", "visible");
            $("#content").html(e[6]);
            diaryFound = true;
          }
        });
        if (!diaryFound) {
          $("#content").html("작성된 일기가 없습니다.");
        }
      }

      $("#month").text(m + "월");
      $("#date").text(n + "일");
      $("#day").text(getDayOfWeek(y + "-" + m + "-" + n) + "요일");
      localStorage.setItem("date", date);

      $(this).removeClass("select_day").addClass("select_day");
    });
  }
}