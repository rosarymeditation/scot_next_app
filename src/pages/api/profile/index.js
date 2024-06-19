import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { User } from "../../../../models/User";
import { Country } from "../../../../models/Country";
import protectedRoute from "../protectedRoute";
// _id: String,
//   intId: Number,
//   username: String,
//   password: String,
//   email: { type: String, unique: true },
//   firstname: String,
//   middlename: String,
//   lastname: String,
//   dob: String,
//   gender: String,
//   marital: String,
//   homeAddress: String,
//   postalAddress: String,
//   contactEmail: String,
//   phone: String,
const handler = async (req, res, userId) => {
  console.log(req);
  const { method } = req;
  const { agentUserId } = req.body;
  await mongooseConnect();

  if (method === "PUT") {
    const {
      username,
      email,
      phone,
      _id,
      firstname,
      middlename,
      lastname,
      gender,
      marital,
      agentUserId,
      country,
      postalAddress,
      homeAddress,
    } = req.body;
    const profileDoc = await User.updateOne(
      { _id: agentUserId || userId },
      {
        username,
        email,
        phone,
        _id: agentUserId || userId,
        firstname,
        middlename,
        lastname,
        gender,
        marital,
        country,
        postalAddress,
        homeAddress,
      }
    );
    res.json(profileDoc);
  }
  if (method === "POST") {
    res.json(
      await User.findOne({ _id: agentUserId || userId }).populate("country")
    );
  }
};

export default protectedRoute(handler);
