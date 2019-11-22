const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.set("view engine","ejs");

app.get("/", (req, res)=>{
	res.sendFile(__dirname + "/index.html");
});

let brainWallet = (uinput, callback)=>{
	let input = new Buffer(uinput);
	let hash = bitcore.crypto.Hash.sha256(input);
	let bn = bitcore.crypto.BN.fromBuffer(hash);
	let pk = new bitcore.PrivateKey(bn).toWIF();
	let addy = new bitcore.PrivateKey(bn).toAddress();
	callback(pk, addy);
};

app.post("/wallet", (req, res)=>{
	let brainsrc = req.body.brainsrc;
	brainWallet(brainsrc, (pk, addy)=>{
		res.send("Ｔhe brain wallet of: " + brainsrc + "<br>Addy: " + addy + "<br>Private key: " + pk);
	});
});

app.listen(3000, ()=>{
	console.log("server run on port 3000");
});