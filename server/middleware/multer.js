import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads"); //img saved in uploads folder
  },
  filename(req, file, cb) {
    const id = uuid(); //create random id

    const extName = file.originalname.split(".").pop(); //give extension name for file(.png,.jpg)

    const filename = `${id}.${extName}`;

    cb(null, filename); //use this filename for saving file
  },
});

export const uploadFiles = multer({ storage }).single("image");
