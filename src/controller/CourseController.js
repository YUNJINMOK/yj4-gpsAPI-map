import db from "../Client/Config/db.js";

export const getCourseList = async (req, res) => {
  const QUERY = "SELECT c.* FROM course c";

  const result = await db.execute(QUERY).then((result) => result[0]);

  console.log(result);

  res.status(200).json({
    status: "success",
    message: "데이터 리스트 전송완료",
    data: result,
  });
};
