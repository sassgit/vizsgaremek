const fsp = require('fs').promises;
const { join } = require('path');
const Photo = require('../../model/photo');
const service = require('../../service/base')(Photo);
const access = {...require('../../auth/defaultacces')};
const deleteEnable = access.deleteEnable;
const patchEnable = access.patchEnable;
access.putEnable = false;
access.deleteEnable = false;
access.patchEnable = (req, res, next) => {
  if (req.body) {
    req.body = { alt: req.body.alt };
  }
  if (patchEnable && typeof patchEnable === 'function')
    patchEnable(req, res, next);
  else
    next();
}
const router = require('../base')(Photo, access);

router.delete('/:id', deleteEnable, async (req, res, next) => {
  try {
    const id = req.params.id;
    const photo = await service.findOne(id);
    await fsp.unlink(join(__dirname, Photo.storedFileName))
    const deleted = await photo.delete();
    return res.json(deleted);
  } catch (err) {
    return res.status(501).json(err);
  }
})
module.exports = router;
