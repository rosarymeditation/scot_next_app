//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Course } from "../../../../models/Course";
import { DegreeType } from "../../../../models/DegreeType";
import {
  CREATE_COURSE,
  RELATED_COURSES,
} from "../../../layout/headers/menu-data";
import { v4 as uuidv4 } from "uuid";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST" && req.body.routeName == CREATE_COURSE) {
    const {
      degreeType,
      degreeTypeId,
      duration,
      faculty,
      facultyId,
      fee,

      institution,
      institutionId,
      intake,
      isPopular,
      name,
      scholarshipAmount,
      time,
      uniLogo,
      url,
    } = req.body;

    const objDoc = await Course.create({
      degreeType,
      degreeTypeId,
      duration,
      faculty,
      facultyId,
      fee,
      _id: uuidv4(),
      institution,
      institutionId,
      intake,
      isPopular,
      name,
      scholarshipAmount,
      time,
      uniLogo,
      url,
    });
    res.json(objDoc);
  }
  if (method === "GET") {
    if (req.query?.id) {
      res.json(
        await Course.findOne({ _id: req.query.id })
          .populate("institutionId")
          .populate("degreeTypeId")
          .populate("facultyId")
      );
    } else {
      res.json(await Course.find());
    }
  }

  if (method === "POST" && req.body.routeName == RELATED_COURSES) {
    console.log(
      "----------------------------------------------------" + req.body
    );
    const { facultyId } = req.body;

    res.json(
      await Course.find({ facultyId })
        .limit(4)
        .populate("institutionId")
        .populate("degreeTypeId")
        .populate("facultyId")
    );
  }
}
