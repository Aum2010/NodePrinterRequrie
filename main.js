const util = require('util');
const express = require('express')
const app = express()
const port = 60146
const QR = require('qrcode')
const bodyParser = require('body-parser')
var cors = require('cors')
const fs = require('fs');
const sys = require('util');



app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb',extended: true }))
const exec = util.promisify(require('child_process').exec);


async function lsWithGrep() {
  try {
      //await exec('sudo qrcode -o out.png ${msg}');
	//await QR.toFile("out.png",msg);
      const { stdout, stderr } = await exec('sudo lp -o fit-to-page image.png');
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
  }catch {
     return ;
  };
};

app.get('/', (req, res) => {
	//lsWithGrep("Smart123456");
	res.json({"flag":"1"})
})

app.get('/gps',(req,res) => {
	res.json({"lat":set_lat,"lon":set_lon})
	//gps.on('data',({lat,lon}) => {res.json({lat,lon})});
})

app.post('/print',(req,res) => {
	// Remove header
	//console.log(req.body.data)
	let base64Image = req.body.data.toString().split(';base64,').pop();
	fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
	  console.log('File created');
	});
//	lsWithGrep();
	res.json({"msg":"1"})
	res.status(200)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

//lsWithGrep("Hello");
