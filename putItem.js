var express = require('express');
var router = express();
var fs = require("fs");

var fileName = 'items.json';

router.put('/putItem/:id', function (req, res) {

    var item = {
        "id": req.params.id,
        "barcode": "ITEM000005",
        "name": "123",
        "unit": "袋",
        "price": 3.50
    };

    fs.readFile(fileName, "utf8", function (err, data) {
        if (err) {
            res.status(404).end(fileName + '文件不存在!');

            return;
        }
        if(data === ''){
            res.status(404).end(fileName + '文件中没有商品数据!');

            return;
        }
        data = JSON.parse(data);
        var itemid = data['item' + req.params.id];
        if (itemid === undefined) {
            res.status(404).end("id为" + req.params.id + "的商品不存在！");

            return;
        }
        data['item' + req.params.id] = item;
        fs.writeFile(fileName, JSON.stringify(data), function (err) {
            if (err) {
                res.status(404).end('未找到' + fileName + '文件!');

                return;
            }
        });
        res.status(200).json(item);
    });
});

module.exports = router;
