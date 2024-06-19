import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Institution } from "../../../../../models/Institution";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  // if (method === "POST") {
  //   const { name, banner, about, cityId, id, logo, sellingPoint } = req.body;

  //   const objDoc = await Institution.create({
  //     _id: id,
  //     name,
  //     banner,
  //     about,
  //     cityId,
  //     logo,
  //     sellingPoint,
  //   });
  //   res.json(objDoc);
  // }
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Institution.findOne({ _id: req.query.id }));
    } else {
      res.json(await Institution.find());
    }
  }
}
