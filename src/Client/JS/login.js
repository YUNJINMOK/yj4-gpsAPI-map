const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");
const joinBtn = document.querySelector(".join");
const loginBtn = document.querySelector(".login");

const loginFetch = async () => {
  const userId = userIdInput.value;
  const userPassword = userPasswordInput.value;

  if (!userId || !userPassword) {
    msgAlert("bottom", "모든 필드를 입력해주세요", "error");
    return;
  }

  // 서버로 보내는 요청
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId,
      userPassword,
    }),
  });
  const result = await response.json();
  if (result.status === "success") {
    localStorage.setItem("accessToken", result.data.accessToken);
    msgAlert("center", "로그인 성공", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } else {
    msgAlert("bottom", "로그인에 실패하셨습니다.", "error");
  }
};

loginBtn.addEventListener("click", loginFetch);
joinBtn.addEventListener("click", () => (window.location.href = "/join"));

const checkError = () => {
  const notFoundAccessTokenError = getParameterByName("error");
  if (notFoundAccessTokenError == "not_found_access_token") {
    msgAlert("bottom", "인증에 실패하였습니다.", "error");
  } else if (notFoundAccessTokenError == "need_login") {
    msgAlert("bottom", "로그인이 필요합니다.", "error");
  }
  const cleanUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
};
checkError();
