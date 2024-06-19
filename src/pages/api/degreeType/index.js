import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { DegreeType } from "../../../../models/DegreeType";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name, id } = req.body;

    const objDoc = await DegreeType.create({
      _id: id,
      name,
    });
    res.json(objDoc);
  }
  if (method === "GET") {
    res.json(await DegreeType.find());
  }
}
