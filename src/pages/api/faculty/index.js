import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Faculty } from "../../../../models/Faculty";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { id, name, icon, url } = req.body;

    const objDoc = await Faculty.create({
      _id: id,
      name,
      icon,
      url,
    });
    res.json(objDoc);
  }
  if (method === "GET") {
    console.log(Faculty.find());
    res.json(await Faculty.find());
  }
}
