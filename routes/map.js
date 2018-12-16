var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/map/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

router.post('/load', upload.single('mapFile'), function (req, res) {
  let jsonData = fs.readFileSync(__dirname + '/../public/map/' + req.body.fileName, 'utf8');
  let mapData = JSON.parse(jsonData);

  res.send(mapData);
});

router.post('/save', function (req, res) {
  let obj = {};

  obj['row'] = req.body.row;
  obj['col'] = req.body.col;
  obj['width'] = req.body.width;
  obj['height'] = req.body.height;
  obj['matcher'] = req.body.matcher;
  obj['map'] = req.body.map;

  let jsonData = JSON.stringify(obj);

  let fileName = req.body.fileName + '_' + new Date().getTime();
  fs.writeFileSync(__dirname + '/../temp/' + fileName +'.json', jsonData, 'utf8');
  res.download(__dirname + '/../temp/' + fileName +'.json');
});

module.exports = router;