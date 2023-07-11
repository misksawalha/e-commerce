import multer from 'multer';
import { nanoid } from 'nanoid';

export const multerValidation = {
  image: ['image/jpeg'],
  pdf: ['application/pdf']
};

export const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(400).json({ message: "multer error ", error });
  } else {
    next();
  }
};

export const myMulter = (customValidation) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `upload/`);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid file type", false);
    }
  };

  const upload = multer({ dest: 'upload', fileFilter, storage });
  return upload;
};
