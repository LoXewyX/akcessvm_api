import User from "../model/user.model";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ISignup } from "../interfaces/user.interface";

const handleNewUser = async (req: Request, res: Response) => {
  const {
    user,
    name,
    sex,
    borndate,
    street,
    city,
    country,
    zip,
    pwd,
  } = req.body as ISignup;
  if (
    !user ||
    !name ||
    !sex ||
    !borndate ||
    !street ||
    !city ||
    !country ||
    !zip ||
    !pwd
  )
    return res
      .status(400)
      .json({ message: "Invalid request content." });

  // check for duplicate users in the db
  const duplicate = await User.findOne({ user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the pwd - 10 rounds SHA1
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      user,
      name,
      pwd: hashedPwd,
      image: "http://localhost:3500/cdn/img/user.png",
      sex,
      borndate: new Date(borndate),
      street,
      city,
      country,
      zip,
      mod: "",
      email: "",
      phone: "",
      courses: [],
    });

    res.status(201).json({ success: `User ${user} created!` });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    else res.status(500).json({ message: "An unknown error occurred." });
  }
};

export { handleNewUser };
