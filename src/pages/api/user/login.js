import { hash, compare } from "bcrypt";
//import { v4 as uuidv4 } from "uuid";
import { mongooseConnect } from "../../../../lib/mongoose";
import { User } from "../../../../models/User";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  console.log(req.body);

  if (method === "POST") {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    compare(password, user.password, (err, result) => {
      if (err) {
        res.json({
          error: true,
          message: "Email or password does not exist",
        });
      } else if (result) {
        const token = jwt.sign(
          { userId: user._id, email: user.email, password: user.password },
          process.env.JWT_SECRET,
          {
            expiresIn: "1y",
          }
        );
        res.json({
          error: false,
          token,
          user: {
            userId: user._id,
            email: user.email,
            password: user.password,
          },
        });
      } else {
        res.json({
          error: true,
          message: "Email or password does not exist",
        });
      }
    });
  }
}
