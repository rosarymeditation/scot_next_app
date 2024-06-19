import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Country } from "../../../../models/Country";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name, code, code2, id,  } = req.body;

    const objDoc = await Country.create({
      _id: id,
      name,
      code,
      code2,
    });
    res.json(objDoc);
  }

  if (method === "GET") {
    res.json(await Country.find());
  }
}
