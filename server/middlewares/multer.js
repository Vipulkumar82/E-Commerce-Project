//this file is used to handle file to upload using multer
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename(req, file, cb){
    const id = uuidv4();  //it creates random id

    const extName = file.originalname.split('.').pop(); //get the file extension

    const fileName = `${id}.${extName}`; //create a new file name with the id and extension
    cb(null, fileName); //pass the new file name to the callback
  }
  
});

export const uploadFiles = multer({storage}).single("image")