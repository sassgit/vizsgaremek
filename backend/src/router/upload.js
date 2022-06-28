const router = require('express').Router();
const fs = require('fs');
const { join } = require('path');
const fileUpload = require('express-fileupload');
const service = require('../service/base')(require('../model/photo'));
const { editEnable } = require('../auth/autorization');

router.use(fileUpload({
  useTempFiles: true
}));
router.post('/images', editEnable, async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const uploadFile = req.files.uploadFile;
    let storedFileName = uploadFile.name;
    let nameArray = storedFileName.split('.');
    const alt = nameArray.slice(0, nameArray.length - 1).join('.');
    let idx = 0;
    while (service.search({
        storedFileName
      })) {
      nameArray[storedFileName.length - 1] = `${storedFileName}_${++idx}`;
      storedFileName = nameArray.join('.');
    }
    const photo = await service.create({
      storedFileName,
      alt,
      fileSize: uploadFile.size
    });
    if (!photo)
      return res.status(501).send('Database Error');
    const uploadPath = join(__dirname, '../../www/images', storedFileName);
    uploadFile.mv(uploadPath, (err) => {
      if (err) {
        await service.delete(photo._id);
        return res.status(500).json(err);
      }
      res.json(photo);
    });
  } catch (err) {
    return res.status(501).json(err);
  }
});