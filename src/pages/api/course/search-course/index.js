//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Course } from "../../../../../models/Course";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { page, limit, search, faculty, institution, degreeType } = req.body;
    console.log(req.body);

    const query = search
      ? {
          name: { $regex: search, $options: "i" },
        }
      : {};

    if (faculty) {
      query.facultyId = faculty;
    }
    if (institution) {
      query.institutionId = institution;
    }

    if (degreeType) {
      query.degreeTypeId = degreeType;
    }

    const objDoc = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("institutionId")
      .populate("degreeTypeId")
      .populate("facultyId");
    const totalDoc = await Course.count(query).skip((page - 1) * limit);
    res.json({ data: objDoc, totalNum: totalDoc });
  }
}
