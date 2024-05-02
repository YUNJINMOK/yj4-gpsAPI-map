import "dotenv/config";
import express from "express";
import {
  coursePage,
  introducePage,
  mainPage,
} from "./controller/WebController.js";
import db from "./Client/Config/db.js";
import { getCourseList } from "./controller/CourseController.js";

const app = express();

const PORT = 8000;

// 템플릿 엔진 사용 셋팅
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/Client/html");

// 정적 파일 내보내기 (미들웨어)
app.use("/css", express.static("src/Client/css"));
app.use("/js", express.static("src/Client/js"));
app.use("/file", express.static("src/Client/file"));

// Json 형식 변환 미들웨어
app.use(express.json());

// web라우터
app.get("/", mainPage);
app.get("/introduce", introducePage);
app.get("/course", coursePage);

// api라우터
app.get("/api/course", getCourseList);

app.post("/test", async (req, res) => {
  const data = req.body;
  console.log(data);
  const QUERY =
    "INSERT INTO course (course_name,course_latitude,course_longitude,course_qr) VALUES (?,?,?,?)";
  await db.execute(QUERY, [data.name, data.latitude, data.longitude, data.qr]);

  res.send("hi");
});

// 서버 오픈
app.listen(PORT, () => {
  console.info(`서버가 열렸다.,http://localhost:${PORT}`);
});
