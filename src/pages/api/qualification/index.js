import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Qualification } from "../../../../models/Qualification";
import { Country } from "../../../../models/Country";
import protectedRoute from "../protectedRoute";
// hq_grade: String,
//   hq_schoolName: String,
//   hq_completed: String,
//   hq_programmeYear: String,
const handler = async (req, res, userId) => {
  console.log(req);
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const {
      _id,
      hq_grade,
      hq_schoolName,
      hq_completed,
      hq_programmeYear,
      postUserId,
      qualificationType,
    } = req.body;

    const objDoc = await Qualification.create({
      _id: _id || uuidv4(),
      hq_grade,
      hq_schoolName,
      hq_completed,
      hq_programmeYear,
      userId: postUserId || userId,
      qualificationType,
    });
    res.json(objDoc);
  }
  if (method === "PUT") {
    const {
      _id,
      hq_grade,
      hq_schoolName,
      hq_completed,
      hq_programmeYear,
      agentUserId,
      qualificationType,
    } = req.body;
    const profileDoc = await Qualification.updateOne(
      { _id },
      {
        hq_grade,
        hq_schoolName,
        hq_completed,
        hq_programmeYear,
        userId: agentUserId || userId,
        qualificationType,
      }
    );
    res.json(profileDoc);
  }
  if (method === "GET") {
    if (req.query?.agentUserId) {
      res.json(
        await Qualification.findOne({
          userId: req.query?.agentUserId,
        }).populate("qualificationType")
      );
    } else {
      res.json(
        await Qualification.findOne({ userId }).populate("qualificationType")
      );
    }
  }
};

export default protectedRoute(handler);
