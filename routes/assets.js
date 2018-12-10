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
  console.log('filename: ' + req.file.filename);
  console.log('path: ' + req.file.path);
  console.log('originalname: ' + req.file.originalname);

  console.log('assetName: ' + req.body.assetName);

  let jsonData = fs.readFileSync(__dirname + '/../storages/assets.json', 'utf8');
  let assets = JSON.parse(jsonData);
  let mapSetList =  assets.mapSetList;
  mapSetList[req.body.assetName] = req.file.filename;

  let mapList = assets.mapList;
  mapList.push(req.body.assetName);

  let writeAssetData = {'mapSetList': mapSetList, 'mapList': mapList};
  fs.writeFileSync(__dirname + '/../storages/assets.json', JSON.stringify(writeAssetData), 'utf8');

  res.send({result: 'success'});
});

module.exports = router;
