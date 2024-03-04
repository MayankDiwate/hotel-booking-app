import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("firstName", "Please enter a first name").isString(),
    check("lastName", "Please enter a last name").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
