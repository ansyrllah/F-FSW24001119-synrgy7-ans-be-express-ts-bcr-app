import { Request, Response, NextFunction } from "express";
import multer, { Multer } from "multer";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const multerUpload: Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req: Request, file: Express.Multer.File, callback: Function) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(
          "Invalid file type. Only JPEG, PNG, and GIF images are allowed."));
    }
  },
});

function upload(file: string) {
  return(req: Request, res: Response, next: NextFunction) => {
    const singleUpload = multerUpload.single(file);

    singleUpload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  }
}


const noneMulter: Multer = multer();

export { upload, noneMulter };
