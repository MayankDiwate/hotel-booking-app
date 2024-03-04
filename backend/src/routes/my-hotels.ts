import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../middleware/auth";
import Hotel, { HotelType } from "../models/hotel";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities must be an array"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // 1. Upload images to cloudinary
      const uploadPromises = imageFiles.map(async (imageFile) => {
        const b64 = Buffer.from(imageFile.buffer).toString("base64");
        let dataURI = `data:${imageFile.mimetype};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });
      const imageUrls = await Promise.all(uploadPromises);

      //   2. if upload is successful add URLs to new hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUploaded = new Date();
      newHotel.userId = req.userId;

      // 3. Save hotel to database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4. Return success response
      return res.status(201).json({ message: "Hotel created successfully" });
    } catch (error) {
      console.error("Error uploading images:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
