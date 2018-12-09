var express = require('express');
var router = express.Router();
var fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'public/images/'});

router.get('/', function(req, res, next) {
  let jsonData = fs.readFileSync(__dirname + '/../storages/assets.json', 'utf8');
  let dataObject = JSON.parse(jsonData);
  
  res.send(dataObject);
});

router.post('/', upload.single('assetFile'), function (req, res) {
  console.log('file: ' + req.file.filename);
  console.log('file: ' + req.file.path);
  console.log('file: ' + req.file.originalname);

  res.send({result: 'success'});
});

module.exports = router;
