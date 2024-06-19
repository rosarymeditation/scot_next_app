import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { PreviousQualification } from "../../../../models/PreviousQualification";
import { Country } from "../../../../models/Country";
import protectedRoute from "../protectedRoute";
// pq_grade: String,
//   pq_schoolName: String,
//   pq_completed: String,
//   pq_programmeYear: String,
const handler = async (req, res, userId) => {
  console.log(req);
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const {
      _id,
      pq_grade,
      pq_schoolName,
      pq_completed,
      pq_programmeYear,
      postUserId,
      qualificationType,
    } = req.body;

    const objDoc = await PreviousQualification.create({
      _id: _id || uuidv4(),
      pq_grade,
      pq_schoolName,
      pq_completed,
      pq_programmeYear,
      userId: postUserId || userId,
      qualificationType,
    });
    res.json(objDoc);
  }
  if (method === "PUT") {
    const {
      _id,
      pq_grade,
      pq_schoolName,
      pq_completed,
      pq_programmeYear,
      agentUserId,
      qualificationType,
    } = req.body;
    const profileDoc = await PreviousQualification.updateOne(
      { _id },
      {
        pq_grade,
        pq_schoolName,
        pq_completed,
        pq_programmeYear,
        userId: agentUserId || userId,
        qualificationType,
      }
    );
    res.json(profileDoc);
  }
  if (method === "GET") {
    if (req.query?.agentUserId) {
      res.json(
        await PreviousQualification.findOne({
          userId: req.query?.agentUserId,
        }).populate("qualificationType")
      );
    } else {
      res.json(
        await PreviousQualification.findOne({ userId }).populate(
          "qualificationType"
        )
      );
    }
  }
};

export default protectedRoute(handler);
