const express = require('express'), server = express();
const url = require('url');
const formidable = require('formidable');
const os = require('os');

//khai bao cac bien toan cuc de truy van
var reqUrlString;
var reqOriginalPath;
var method;
var pathName;
var reqFullHost;

server.use(function (req, res, next) {
    //lay cac thong tin request ban dau de luu vao csdl
    
    //doan lay thong tin cac bien su dung sau nay
    reqUrlString = req.url;
    reqOriginalPath = req.originalUrl;
    method = req.method;
    pathName = decodeURIComponent(url.parse(reqUrlString, true, false).pathname);
    reqFullHost = req.protocol + '://' + req.get('host');
    //encodeURIComponent('אובמה') // %D7%90%D7%95%D7%91%D7%9E%D7%94 
    //decodeURIComponent('%D7%90%D7%95%D7%91%D7%9E%D7%94') // אובמה
    console.log('from:' + req.ip + '\n' + method +" " + reqFullHost + '/' + pathName);
    //-----------------------------------------

    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
    //muon cho phep truy cap tu server nao thi reply cac website tuong ung
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    //tra den phien tiep theo
    next();
});

//-----------------------------------------
//dang ky duong dan tuyet doi co dinh cho ionic
server.use(express.static(__dirname + '/www'));
//server.use(express.static('www'));


server.post('/file_upload',(req,res,next)=>{
    const form = new formidable.IncomingForm();
            //luu tru file vao dia 
    form.parse(req, function (err, fields, files) {
                //lay ket qua form o day
                console.log('files:');
                
                for (let key in files) {
                    console.log(' name=' + key + ' value=');
                    //console.log(files[key]);
                    console.log( files[key].type + "; " + files[key].name + "; " +  files[key].size);
                }
                //console.log(files);
                console.log('fields:');
                //console.log(fields);
                for (let key in fields) {
                    console.log(' name=' + key + ' value=' + fields[key]);
                }

                console.log('err:' + JSON.stringify(err));

            });
    //gui trang thai bao noi dung tra ve
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(JSON.stringify({
                command_id: method,
                status:  "ok", 
                message: "file uploaded!"
                }));
});



//The 404 Route (ALWAYS Keep this as the last route)
server.get('*', function(req, res){
  //gui trang thai bao noi dung tra ve
  res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>Đừng tìm kiếm vô ích. Đố mầy hack tau đấy!</h1>Are You Lazy???');
});

//-----------------------------------------------------
// cau hinh may chu cho start chay
server.set('port', process.env.PORT || 9235);

server.listen(server.get('port'), function () {
    console.log("Server (" + os.platform() + "; " + os.arch() + ") is started with PORT: " + + server.get('port')
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    );
});