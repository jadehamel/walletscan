﻿var params = window .location .search .replace('?','') .split('&') .reduce( function(p,e){ var a = e.split('='); p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]); return p; }, {} );
var rangeValue = 0,
timer = 0;
var n=1;
var z=0;
var koef=0;
var now = new Date();
var minstart = new Date();
var o = 0;
var speed_day = 0;
var nmid=0;
var address=1;
var address2=1;
var balance_check = null;
var coin = null;
window.wallets = [];
window.publics = [];
window.csv = [];
window.results = 0;
window.max_results = 25;
var vkl=0;
var bitcore = require("bitcore-lib");
//var CoinKey = require('coinkey.js');
document.getElementById("ad").innerHTML = "If you see this inscription";
document.getElementById("pri").innerHTML = "Then your browser is not supported";

function showWallet(csvs, wweb, address, num) {
  window.results++
  if (window.results <= (window.max_results + 1)) {
    window.wallets.push(wallet);
    window.publics.push(address);
    window.csv.push(csvs);
    var html_to_insert = "<br/>" + wweb;
    document.getElementById('csv').innerHTML += html_to_insert;
  } else {
    $("#toggle").click().hide();
  }
}

function intervalDo() {
	
	if (flaghide == 0) {
		
		if (document.getElementById('radio3').checked) {
    			var num ="";
    			var possible = "0123456789abcdef";
    			for (var i = 0; i < 64; i++)
    			num += possible.charAt(Math.floor(Math.random() * possible.length));
    			///var num ="0000000000000000000000000000000000000000000000000000000000000039";
    			var privBuffer11 = EthJS.Util.toBuffer(EthJS.Util.addHexPrefix(num));
    			var address = EthJS.Util.bufferToHex(EthJS.Util.privateToAddress(privBuffer11));
    			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Public: </span>" + address + "</a>";
    			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private: </span>" + num;
          wallet = { pub: address, prv:  num };
          index = window.results.toString();
          csvs = (index + ";" + address + ";" + num);
          wweb = (index + ";<a target='_blank' href='https://etherscan.io/address/" + address + "'>" + address + "</a>;" + num);
          showWallet(csvs, wweb, address, num);
		}
		
		if (document.getElementById('radio4').checked) {
			var num ="";
			var possible = "0123456789abcdef";
			for (var i = 0; i < 64; i++)
			num += possible.charAt(Math.floor(Math.random() * possible.length));
			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Ethereum Classic address: </span>" + address;
			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + num;
			
			coin = 'etc';
		}
		
		
		if (document.getElementById('radio5').checked) {
			var lite = bitcoin.networks.bitcoin;
			lite.pubKeyHash = 0x30; lite.wif = 0xb0; 
			var keyPairL = bitcoin.ECPair.makeRandom();
			var addressL = keyPairL.getAddress();
			var privKeyL = keyPairL.toWIF();
			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Litecoin address: </span>" + addressL;
			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyL;
			
			coin = 'ltc';
		}
		
		if (document.getElementById('radio6').checked) {
			var dash = bitcoin.networks.bitcoin;
			dash.pubKeyHash = 0x4c; dash.wif = 0xcc; 
			var keyPairD = bitcoin.ECPair.makeRandom();
			var addressD = keyPairD.getAddress();
			var privKeyD = keyPairD.toWIF();
			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Dash address: </span>" + addressD;
			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyD;
			
			coin = 'dash';
		}
		
		if (document.getElementById('radio7').checked) {
			var doge = bitcoin.networks.bitcoin;
			doge.pubKeyHash = 0x1e; doge.wif = 0x9e; 
			var keyPairDo = bitcoin.ECPair.makeRandom();
			var addressDo = keyPairDo.getAddress();
			var privKeyDo = keyPairDo.toWIF();
			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Dogecoin address: </span>" + addressDo;
			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyDo;
			
			coin = 'doge';
		}
		
		if (document.getElementById('radio8').checked) {
			var zec = bitcoin.networks.bitcoin;
			zec.pubKeyHash = 0x3f; zec.wif = 0x80; 
			var keyPairDo = bitcoin.ECPair.makeRandom();
			var addressDo = keyPairDo.getAddress();
			var privKeyDo = keyPairDo.toWIF();
			
			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Zcash address: </span>";
			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyDo;
			
			coin = 'zcash';
		}
		
		if (document.getElementById('radio9').checked) {
			var btg = bitcoin.networks.bitcoin;
			btg.pubKeyHash = 0x26; btg.wif = 0x80; 
			var keyPairDo = bitcoin.ECPair.makeRandom();
			var addressDo = keyPairDo.getAddress();
			var privKeyDo = keyPairDo.toWIF();
			document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Bitcoin Gold address: </span>" + addressDo;
			document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyDo;
		}
		
		
		
	}
	n=n+1;
	var now1 = new Date();
	vkl=vkl+1;
	//if ((now1-now)<0 && vkl==0) {
	if (vkl==1) {
		$('#toggle').text('Start');
		o = 0;
		speed_day = 0;
		clearInterval(timer)
		vkl=vkl+1;
		flag++;
	}
	z=z+1;
};

function balance(balance_check, coin) {
	
	if(coin == 'btc'){
		var x = new XMLHttpRequest();
		x.open("GET", "https://secretscan.org/btc/" + balance_check, true);
		x.onload = function (){
			
			document.getElementById("test").innerHTML = x.responseText + " Balance";
		}
		x.send(null);
	}
	
	if(coin == 'eth'){
		var x = new XMLHttpRequest();
		x.open("GET", "https://secretscan.org/eth/" + balance_check, true);
		x.onload = function (){
			
			document.getElementById("test").innerHTML = x.responseText + " Balance";
		}
		x.send(null);
	}
	

}

/*timer = setInterval(intervalDo, rangeValue );
	
	
	
	$('#range').change(function(){
	rangeValue = $(this).val();
	clearInterval(timer)
	o = 0;speed_day = 0;
	timer = setInterval(intervalDo, rangeValue );
})*/

var flag = 0;
var test = "test";

timer = setInterval(intervalDo, rangeValue );

$('#toggle').click(function(e){
	e.preventDefault();
	if ( flag == 0 ) {
		$('#toggle').text('Start');
		o = 0;
		speed_day = 0;
		clearInterval(timer);
		
		balance(balance_check, coin);
		flag++;
		} else {
		$('#toggle').text('Stop');
		rangeValue = $(this).val();
		clearInterval(timer);
		timer = setInterval(intervalDo, rangeValue );
		flag = 0;
		now = new Date();
	}
});



var flaghide =0;
$('#hidekey').click(function(f){
	f.preventDefault();
	if ( flaghide == 0 ) {
		$('#hidekey').text('Показать');
		document.getElementById("ad2").innerHTML = "";
		document.getElementById("pri2").innerHTML = "";
		document.getElementById("ad").innerHTML = "";
		document.getElementById("pri").innerHTML = "";
		
		flaghide++;
		} else {
		$('#hidekey').text('Скрыть');
		flaghide = 0;
	}
});
