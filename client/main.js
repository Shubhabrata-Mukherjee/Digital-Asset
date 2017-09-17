import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//address='0x95d902cba20c50d64b049d021b2bf18930ca9dba';
address='0x9F1fafE80c3265378e883C3215EF86766bE26Fe5';
//ABI=[{"constant":false,"inputs":[{"name":"vidAddress","type":"address"},{"name":"tokens","type":"uint256[]"},{"name":"newOwner","type":"address"},{"name":"secondAcc","type":"address"},{"name":"percent","type":"uint256"}],"name":"transferTokens","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"readAllVids","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vidAddress","type":"address"},{"name":"amount","type":"uint256"},{"name":"secondAcc","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"vidAddress","type":"address"}],"name":"readVideoBySender","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"vidAddress","type":"address"}],"name":"validateToken","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"vidAddress","type":"address"}],"name":"readTokensForVidBySender","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vidAddress","type":"address"},{"name":"title","type":"string"},{"name":"initialSupply","type":"uint256"},{"name":"owner","type":"address"},{"name":"buyPrice","type":"uint256"}],"name":"addVid","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"ReturnResult","type":"event"}];
ABI=[ { "constant": false, "inputs": [ { "name": "vidAddress", "type": "address" } ], "name": "checkPushBuy", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vidAddress", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "secondAcc", "type": "address" }, { "name": "single_pay", "type": "bool" } ], "name": "buyTokens", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "readAllVids", "outputs": [ { "name": "", "type": "address[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vidAddress", "type": "address" }, { "name": "tokens", "type": "uint256[]" }, { "name": "newOwner", "type": "address" }, { "name": "secondAcc", "type": "address" }, { "name": "percent", "type": "uint256" }, { "name": "single_pay", "type": "bool" } ], "name": "transferTokens", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [ { "name": "vidAddress", "type": "address" } ], "name": "readVideoBySender", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256[]", "value": [] }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "vidAddress", "type": "address" } ], "name": "validateToken", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vidAddress", "type": "address" } ], "name": "delVidZero", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "vidAddress", "type": "address" } ], "name": "readTokensForVidBySender", "outputs": [ { "name": "", "type": "uint256[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vidAddress", "type": "address" }, { "name": "title", "type": "string" }, { "name": "initialSupply", "type": "uint256" }, { "name": "owner", "type": "address" }, { "name": "buyPrice", "type": "uint256" } ], "name": "addVid", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "vidAddress", "type": "address" } ], "name": "readAllUsers", "outputs": [ { "name": "", "type": "address[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" }, { "name": "vidAddress", "type": "address" } ], "name": "checkPushTransfer", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" } ], "name": "ReturnResult", "type": "event" } ];

//Template for reading a particular video for a user
Template.readVidForUser.onCreated(function readStart() {   

  this.video = new ReactiveVar(0);
  this.vidAddress = new ReactiveVar("");
  this.title = new ReactiveVar(0);
  this.token_quantity = new ReactiveVar(0);
  this.tokens = new ReactiveVar(0);
  this.buyprice = new ReactiveVar(0);
  this.currentSupply=new ReactiveVar(0);
});

Template.readVidForUser.helpers({
  video() {
    return Template.instance().video.get();
  },title(){
    return Template.instance().title.get();
  },token_quantity(){
    return Template.instance().token_quantity.get();
  },tokens(){
    return Template.instance().tokens.get();
  },buyprice(){
    return Template.instance().buyprice.get();
  },currentSupply(){
    return Template.instance().currentSupply.get();
  }
});

//Template to Add vid to contract for a particular owner 
Template.addVid.onCreated(function addVidstart() {            

  this.response = new ReactiveVar(0);

});

Template.addVid.helpers({
  response() {
    return Template.instance().response.get();
  },
});

//Template to buy Tokens for a video
Template.buyTokens.onCreated(function buyTokensStart() {            

  this.buyTokensResult = new ReactiveVar(0);
});

Template.buyTokens.helpers({
  buyTokensResult() {
    return Template.instance().buyTokensResult.get();
  },
});

//Template to verify availability of Tokens for a video
Template.validateToken.onCreated(function buyTokensStart() {            

  this.validationResult = new ReactiveVar(0);
});

Template.validateToken.helpers({
  validationResult() {
    return Template.instance().validationResult.get();
  },
});

//Template to read all videos for the sender
Template.readAllVids.onCreated(function buyTokensStart() {            

  this.readAllVidResult = new ReactiveVar(0);
});

Template.readAllVids.helpers({
  readAllVidResult() {
    return Template.instance().readAllVidResult.get();
  },
});

//Template to transfer tokens to any other 
Template.transfertokens.onCreated(function buyTokensStart() {            

  this.transferResult = new ReactiveVar(0);
});

Template.transfertokens.helpers({
  transferResult() {
    return Template.instance().transferResult.get();
  },
});

//Template to read all users for a video
Template.readAllUsers.onCreated(function buyTokensStart() {            

  this.readAlluserResult = new ReactiveVar(0);
});

Template.readAllUsers.helpers({
  readAlluserResult() {
    return Template.instance().readAlluserResult.get();
  },
});


//EVENTS
Template.readVidForUser.events({
  'click button'(event, instance) {
    
    vidAddress=document.getElementById('address').value;
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    digitalVidContract.readVideoBySender(vidAddress,function(err,result){
      console.log(result);
      var res=[];
      for (var i=0;i<result[3].length;i++){
        if (parseInt(result[3][i])){
          res.push(result[3][i]);
        }
      }
      instance.video.set(result[0]);
      instance.title.set(result[1]);
      instance.token_quantity.set(result[2]);
      instance.tokens.set(res);
      instance.buyprice.set(result[4]);
      instance.currentSupply.set(result[5]);
    });

    // web3.eth.getBalance(document.getElementById('address').value,function(err,result){
    //   instance.ether.set(result);
    // });
    
  },
});


Template.addVid.events({
  'click button'(event, instance) {
    
    supply=document.getElementById('supply').value;
    owner=document.getElementById('owner').value;
    buyprice=document.getElementById('buyprice').value;
    title=document.getElementById('title').value;
    hash=web3.sha3(title+buyprice+owner+supply+Date.now());
    vidAddress='0x'+hash.slice(26,hash.length);
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    digitalVidContract.addVid(vidAddress,title,supply,owner,buyprice*1000000000000000000,function(err,result){
      if (err){
        console.log(err);
        instance.response.set(' error generating a video-'+err);
      } else {
        console.log(vidAddress);
        instance.response.set(' video address generated-'+vidAddress);
      }
  });

    
  },
});


Template.buyTokens.events({
  'click button'(event, instance) {
    vidAddress=document.getElementById('vAddress').value;
    amount=document.getElementById('amount').value;
    secondAcc=document.getElementById('secondAcc').value;
    bool=document.getElementById('bool').value;
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    var e;
    digitalVidContract.readVideoBySender(vidAddress,function(err,result){
      console.log('====================video buyprice============================')
      if (err){
        console.log(err);
      }
      console.log(result);
      e=parseInt(result[4])*parseInt(amount);
      console.log('=========='+e);
        digitalVidContract.buyTokens(vidAddress,amount,secondAcc,bool,{value:e},function(err,result){
        console.log(result);
        instance.buyTokensResult.set(result);
      });
    });

    
    

    
  },
});

Template.validateToken.events({
  'click button'(event, instance) {
    vidAddress=document.getElementById('vidad').value;
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    digitalVidContract.validateToken(vidAddress,function(err,result){
      console.log(result);
      if (result==true){
      instance.validationResult.set(result);
      }else {
        instance.validationResult.set('false');
      }
    });

    
  },
});


Template.readAllVids.events({
  'click button'(event, instance) {
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    digitalVidContract.readAllVids(function(err,result){
      console.log(result);
      var res=[];
      for (var i=0;i<result.length;i++){
        if (parseInt(result[i])){
          res.push(result[i]);
        }
      }
      instance.readAllVidResult.set(res);
    });

    
  },
});


Template.transfertokens.events({
  'click button'(event, instance) {
    newOwner=document.getElementById('newOwner').value;
    vidAddress=document.getElementById('vidadd1').value;
    tokenString=document.getElementById('tokensToTransfer').value;
    secondAcc=document.getElementById('secondAcc').value;
    percent=parseInt(document.getElementById('percent').value);
    tokens=tokenString.split(',');
    var tokenAsIntegers=[];
    console.log('========transfer debug=========');
    console.log(tokens[0]);
    for (z=0;z<tokens.length;z++){
      if (isNaN(tokens[z])||tokens[z]==""||parseInt(tokens[z]==NaN)){
        console.log('only numbers expected.');
        return;  
      }
      tokenAsIntegers.push(parseInt(tokens[z]));
    }
    console.log(tokenAsIntegers);
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    digitalVidContract.readVideoBySender(vidAddress,function(err,result){
      console.log('====================video buyprice============================')
      if (err){
        console.log(err);
      }
      ether=result[4]*tokenAsIntegers.length*percent/100;
    digitalVidContract.transferTokens(vidAddress,tokenAsIntegers,newOwner,secondAcc,percent,{value:ether},function(err,result){
      console.log(result);
      instance.transferResult.set(result);
    });
    });
    
  },
});

Template.readAllUsers.events({
  'click button'(event, instance) {
    web3.eth.defaultAccount=web3.eth.accounts[0];
    digitalVidContract=web3.eth.contract(ABI).at(address);
    digitalVidContract.readAllUsers(function(err,result){
      console.log(result);
      var res=[];
      for (var i=0;i<result.length;i++){
        if (parseInt(result[i])){
          res.push(result[i]);
        }
      }
      instance.readAlluserResult.set(res);
    });

    
  },
});
