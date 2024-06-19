//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../../lib/mongoose";
import { Course } from "../../../../../models/Course";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Course.find({ isPopular: true }).limit(15));
  }
}
