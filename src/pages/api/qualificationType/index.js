import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { QualificationType } from "../../../../models/QualificationType";
import { Country } from "../../../../models/Country";
import protectedRoute from "../protectedRoute";
import { v4 as uuidv4 } from "uuid";

const handler = async (req, res, id) => {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name, _id } = req.body;

    const objDoc = await QualificationType.create({
      _id,
      name,
    });
    res.json(objDoc);
  }
  if (method === "PUT") {
    const { _id, name } = req.body;
    const qualificationDoc = await QualificationType.updateOne(
      { _id },
      {
        name,
      }
    );
    res.json(qualificationDoc);
  }
  if (method === "GET") {
    res.json(await QualificationType.find());
  }
};

export default protectedRoute(handler);
