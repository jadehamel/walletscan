var params = window .location .search .replace('?','') .split('&') .reduce( function(p,e){ var a = e.split('='); p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]); return p; }, {} );
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
var vkl=0;

document.getElementById("ad").innerHTML = "";
document.getElementById("pri").innerHTML = "";

window.blockchains = [
//ETH
                      { 
                        name: "Ethereum",
                        symbol: "ETH",
                        explorers: [{
                          name: "Etherscan",
                          urls: {
                            address: "https://etherscan.io/address/"
                          }
                        }],
                        good_wallets: window.eth_wallets
                          //good_wallets: window.eth_wallets
                    }, 
// LTC
                    { 

                        name: "Litecoin",
                        symbol: "LTC",
                        explorers: [{
                          name: "Blockchair",
                          urls: {
                            address: "https://blockchair.com/litecoin/address/"
                          }
                        }],
                        good_wallets: []
                      },
// DOGE
                    { 

                        name: "Dogecoin",
                        symbol: "DOGE",
                        explorers: [{
                          name: "Blockchair",
                          urls: {
                            address: "https://blockchair.com/dogecoin/address/"
                          }
                        }],
                        good_wallets: []
                      },       
];

function resetWalletData() {
  window.results = 1;
  window.max_results = 100;
}

function clearAddresses(show = true) {
  $("#toggle").text("SCAN MORE");
  if (show) {
    $("#clearAddresses").hide();
    document.getElementById("csv").innerHTML = "";
  } else {
    $("#toggle").show.click();
  }
}

function clickOnClear() {
  if (window.results != 1) {
    clearAddresses(false);
  }
}

function updateMax() {
  window.max_results = Number(document.getElementById("nbmax").value);
  document.getElementById("nbmax").value = window.max_results;
}

function showWallet(wweb, address, num) {
  window.results++
  if (window.results <= (window.max_results + 1)) {
    var html_to_insert = "<br/>" + wweb;
    document.getElementById('csv').innerHTML += html_to_insert;
    $("#clearAddresses").show();

  } else {
    $("#toggle").click();
    resetWalletData();
    updateMax();
  }
}

function all_features(blockain_id, address, num) {
  bc = window.blockchains[blockain_id];
  bc_x_url = bc.explorers[0].urls.address;
  wweb = compare_best_wallets(bc, address, num);
  showWallet(wweb, address, num)
}

function compare_best_wallets(blockchain, address, num) {
  good_wallets = blockchain.good_wallets;
  bc_x_url = bc.explorers[0].urls.address
  wweb = (window.results + ";<a target='_blank' href='" + bc_x_url + "" + address + "'>" + address + "</a>;" + num);
  // compare with good wallets addresses
  if (_.includes(window.good_wallets, address)) {
    wweb = (window.results + ";<h1><a target='_blank' href='" + bc_x_url + "'>" + bc_x_url + "</a><h1>;" + num);
    $("#toggle").click().hide();
  }
  return wweb;
}

function intervalDo() {
  if (flaghide == 0) {

// ETHEREUM
    if (document.getElementById("rETH").checked) {
      var num ="";
      var possible = "0123456789abcdef";
      for (var i = 0; i < 64; i++)
      num += possible.charAt(Math.floor(Math.random() * possible.length));
      var privBuffer11 = EthJS.Util.toBuffer(EthJS.Util.addHexPrefix(num));
      var address = EthJS.Util.bufferToHex(EthJS.Util.privateToAddress(privBuffer11));
      document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Public: </span>" + address + "</a>";
      document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private: </span>" + num;
      all_features(0, address, num);
    }

//LITECOIN
    if (document.getElementById("rLTC").checked) {
      var lite = bitcoin.networks.bitcoin;
      lite.pubKeyHash = 0x30; lite.wif = 0xb0; 
      var keyPairL = bitcoin.ECPair.makeRandom();
      var addressL = keyPairL.getAddress();
      var privKeyL = keyPairL.toWIF();
      document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Litecoin address: </span>" + addressL;
      document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyL;
    
      all_features(1, addressL, privKeyL)
    }

//DOGE
    if (document.getElementById('rDOGE').checked) {
      var doge = bitcoin.networks.bitcoin;
      doge.pubKeyHash = 0x1e; doge.wif = 0x9e; 
      var keyPairDo = bitcoin.ECPair.makeRandom();
      var addressDo = keyPairDo.getAddress();
      var privKeyDo = keyPairDo.toWIF();
      document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Dogecoin address: </span>" + addressDo;
      document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyDo;
    
      all_features(2, addressDo, privKeyDo)
    }

// ETHEREUM CLASSIC
    if (document.getElementById('radio4').checked) {
      var num ="";
      var possible = "0123456789abcdef";
      for (var i = 0; i < 64; i++)
      num += possible.charAt(Math.floor(Math.random() * possible.length));
      document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Ethereum Classic address: </span>" + address;
      document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + num;
    }

// DASH
    if (document.getElementById('rDASH').checked) {
      var dash = bitcoin.networks.bitcoin;
      dash.pubKeyHash = 0x4c; dash.wif = 0xcc; 
      var keyPairD = bitcoin.ECPair.makeRandom();
      var addressD = keyPairD.getAddress();
      var privKeyD = keyPairD.toWIF();
      document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Dash address: </span>" + addressD;
      document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyD;
    }
    
//ZCASH
    if (document.getElementById('rZCASH').checked) {
      var zec = bitcoin.networks.bitcoin;
      zec.pubKeyHash = 0x3f; zec.wif = 0x80; 
      var keyPairDo = bitcoin.ECPair.makeRandom();
      var addressDo = keyPairDo.getAddress();
      var privKeyDo = keyPairDo.toWIF();
      
      document.getElementById("ad").innerHTML = "<span style='color:#818e9a;'>Zcash address: </span>";
      document.getElementById("pri").innerHTML = "<span style='color:#818e9a;'>Private key: </span>" + privKeyDo;
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
  if (vkl==1) {
    $("#toggle").text("SCAN MORE");
    o = 0;
    speed_day = 0;
    clearInterval(timer)
    vkl=vkl+1;
    flag++;
  }
  z=z+1;
};

var flag = 0;

timer = setInterval(intervalDo, rangeValue );

$("#toggle").click(function(e){
  e.preventDefault();
  if ( flag == 0 ) {
    $("#toggle").text("SCAN MORE");
    o = 0;
    speed_day = 0;
    clearInterval(timer);
    flag++;
  } else {
    $("#toggle").text('Stop');
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
    document.getElementById("ad2").innerHTML = "";
    document.getElementById("pri2").innerHTML = "";
    document.getElementById("ad").innerHTML = "";
    document.getElementById("pri").innerHTML = "";
    flaghide++;
  } else {
    flaghide = 0;
  }
});

$(document).ready(function() {
  clearAddresses();
  resetWalletData();
  $("#nbmax").val(window.max_results);
  updateMax();
  $("#toggle").show().click();
});
