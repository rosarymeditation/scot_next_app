import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { User } from "../../../../models/User";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import {
  CREATE_USER,
  LOGIN,
  REGISTER,
  UPDATE_USER,
} from "../../../layout/headers/menu-data";
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  console.log(req.body);
  if (method === "POST" && req.body.routeName == UPDATE_USER) {
    console.log("---------------------Update User-------------------------");
    const { email, password, firstname, middlename, lastname, id } = req.body;
    hash(password, 10, async function (err, hash) {
      const userDoc = await User.create({
        _id: id,
        email,
        password: hash,
        firstname,
        middlename,
        lastname,
      });

      res.json(userDoc);
    });
  }

  if (method === "POST" && req.body.routeName == REGISTER) {
    console.log("---------------------Register-------------------------");
    try {
      const { email, password, phone } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ error: true, message: "Email already exist" });
      }
      hash(password, 10, async function (err, hash) {
        console.log(err);
        const user = await User.create({
          _id: uuidv4(),
          email,
          password: hash,
          phone,
        });
        const token = jwt.sign(
          { id: user._id, email: user.email, password: user.password },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y",
          }
        );
        res.json({ error: false, token });
      });
    } catch (err) {
      console.log({ error: true, msg: "Could not register" });
    }
  }

  if (method === "POST" && req.body.routeName == LOGIN) {
    console.log("---------------------Login-------------------------");

    console.log("---------------------Login-------------------------");
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.json({
          error: false,
          message: "Email or password does not exist",
        });
      } else if (result) {
        const token = jwt.sign(
          { id: user._id, email: user.email, password: user.password },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y",
          }
        );
        res.json({ error: false, token });
      } else {
        res.json({
          error: false,
          message: "Email or password does not exist",
        });
      }
    });
  }
}
