import { hash } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { User } from "../../../../models/User";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
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
          { userId: user._id, email: user.email, password: user.password },
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
}
