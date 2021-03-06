var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  let jsonData = fs.readFileSync(__dirname + '/../storages/assets.json', 'utf8');
  let dataObject = JSON.parse(jsonData);

  res.send(dataObject);
});

router.post('/upload', upload.single('assetFile'), function (req, res) {
  console.log('assetName: ' + req.body.assetName);

  let jsonData = fs.readFileSync(__dirname + '/../storages/assets.json', 'utf8');
  let assets = JSON.parse(jsonData);
  let mapSetList =  assets.mapSetList;
  let fileName = req.file.filename;
  let dotIndex = fileName.indexOf('.');
  fileName = fileName.slice(0, dotIndex);
  mapSetList[req.body.assetName] = fileName;

  let mapList = assets.mapList;
  mapList.push(req.body.assetName);

  let writeAssetData = {'mapSetList': mapSetList, 'mapList': mapList};
  fs.writeFileSync(__dirname + '/../storages/assets.json', JSON.stringify(writeAssetData), 'utf8');

  res.send({result: 'success'});
});

router.delete('/', function(req, res, next) {
  console.log(req.body);
  let deleteList = req.body.deleteList;

  let jsonData = fs.readFileSync(__dirname + '/../storages/assets.json', 'utf8');
  let assets = JSON.parse(jsonData);
  let mapSetList =  assets.mapSetList;
  let mapList = assets.mapList;
  let index = 0;

  for (let i = 0; i < deleteList.length; i++) {
    delete mapSetList[deleteList[i]];
    index = mapList.indexOf(deleteList[i]);
    mapList.splice(index, 1);
  }
  let writeAssetData = {'mapSetList': mapSetList, 'mapList': mapList};
  fs.writeFileSync(__dirname + '/../storages/assets.json', JSON.stringify(writeAssetData), 'utf8');

  res.send({result: 'success'});
});

module.exports = router;
