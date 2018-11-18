const express = require('express'), server = express();
const url = require('url');
const formidable = require('formidable');
const os = require('os');

//dang ky duong dan tuyet doi co dinh cho ionic
server.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
server.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    const reqUrlString = req.url;
    //const reqOriginalPath = req.originalUrl;
    const method = req.method;
    const pathName = decodeURIComponent(url.parse(reqUrlString, true, false).pathname);

    const reqFullHost = req.protocol + '://' + req.get('host');

    //encodeURIComponent('אובמה') // %D7%90%D7%95%D7%91%D7%9E%D7%94 
    //decodeURIComponent('%D7%90%D7%95%D7%91%D7%9E%D7%94') // אובמה

    if ("POST" == method) {
        //neu duong dan post co ten la upload file thi xu ly upload
        if (pathName == '/form') {
            var form = new formidable.IncomingForm();
            //luu tru file vao dia 
            form.parse(req, function (err, fields, files) {
                //lay ket qua form o day
                console.log(files);
                console.log(fields);
                console.log(err);
            });
        }
        res.end(JSON.stringify({
                                command_id: method,
                                status:  "ok", 
                                message: "file uploaded!"
                                }));
    }else{
        //tra cho public
        next();
    }
    
    

});

server.set('port', process.env.PORT || 9235);

server.listen(server.get('port'), function () {
    console.log("Server (" + os.platform() + "; " + os.arch() + ") is started with PORT: " + + server.get('port')
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    );
});