
pragma solidity ^0.4.11;
contract digitalToken{
   
   //video structure
   struct video {
       address vidAddress;
       string title;
       uint initialSupply;
       uint currentSupply;
       mapping(address=>uint[])tokens;
       mapping(address=>uint)tokenQuantity;
       address owner;
       uint256 buyPrice;
   }
   
   event ReturnResult(string message);             //event for returning result for any function
   
   mapping(address=>video)videos;                  //mapping all for all videos added
   mapping(address=>address[])userVideos;          //stack of videos for every user
   
   /*
     * addVid
     * adding a new video to the contract 
     * @param address vidAddress, uint tokens, string vidTitle, address owner, uint256 buyprice
     * @event ReturnResult 
     * @author Sankalp Sharma
     */    
   function addVid(address vidAddress,string title,uint initialSupply,address owner,uint256 buyPrice){
       if (videos[vidAddress].vidAddress!=address(0x0)||initialSupply==0){
           revert();
       }
       video memory v;
       v.vidAddress=vidAddress;
       v.title=title;
       v.initialSupply=initialSupply;
       v.currentSupply=initialSupply;
       v.owner=owner;
       v.buyPrice=buyPrice;
       videos[vidAddress]=v;
   }
   
   /*
     * payEther
     * to transfer ether to video owner and secondAcc
     * param address vidAddress,uint etherAmount, address secondAcc
     * @author Shubhabrata Mukherjee
     */
   function payEther(address vidAddress,uint256 etherAmount,address secondAcc) internal {
       videos[vidAddress].owner.transfer(etherAmount/2);
       secondAcc.transfer(etherAmount/2);
   }
   
   /*
     * buyTokens
     * buying tokens for a given video
     * @param  address vidAddress, uint amount, address secondAcc
     * @author Shubhabrata Mukherjee
     */
   function buyTokens(address vidAddress,uint amount,address secondAcc) payable {
       if (videos[vidAddress].vidAddress!=address(0x0)){
           if (videos[vidAddress].currentSupply<amount){
               ReturnResult('supply insufficient for request');
               revert();
           }
           if (msg.value<videos[vidAddress].buyPrice*amount){
               ReturnResult('ether sent inefficient');
               revert();
           }
           if (msg.value>videos[vidAddress].buyPrice*amount){
               msg.sender.transfer(msg.value-videos[vidAddress].buyPrice*amount);
           }
           payEther(vidAddress,videos[vidAddress].buyPrice*amount,secondAcc);
           if (videos[vidAddress].tokenQuantity[msg.sender]<1){
               userVideos[msg.sender].push(vidAddress);
           }
           for (uint i=1;i<=amount;i++){
               videos[vidAddress].tokens[msg.sender].push(videos[vidAddress].initialSupply-videos[vidAddress].currentSupply+i);
           }
           
           videos[vidAddress].tokenQuantity[msg.sender]+=amount;    
           videos[vidAddress].currentSupply-=amount;
       } else {
           ReturnResult('no such video');
           revert();
       }
   }
   
   /*
     * transferTokens
     * transferring video tokens to another user 
     * @param address vidAddress,uint[] tokenNumbers, address newOwner, address secondAcc,uint percent
     * @author Sankalp Sharma
     */
   function transferTokens(address vidAddress,uint[] tokens,address newOwner,address secondAcc, uint percent)payable {
       bool changeFlag=false;
       uint count=0;
       
       ReturnResult('coming here');
       if (videos[vidAddress].vidAddress==address(0x0)){
           ReturnResult('video doesnt exist');
           revert();
       }
       
       if (videos[vidAddress].tokenQuantity[msg.sender]<1){
           ReturnResult('no tokens available');
           revert();
       }
       
       if (videos[vidAddress].tokenQuantity[newOwner]<1){
           changeFlag=true;
       }
       for (uint i=0;i<videos[vidAddress].tokens[msg.sender].length;i++){
           
           for (uint j=0;j<tokens.length;j++){
               if (tokens[j]==videos[vidAddress].tokens[msg.sender][i]&&tokens[j]!=0){
                   delete videos[vidAddress].tokens[msg.sender][i];
                   videos[vidAddress].tokens[newOwner].push(tokens[j]);
                   videos[vidAddress].tokenQuantity[newOwner]+=1;
                   videos[vidAddress].tokenQuantity[msg.sender]-=1;
                   count++;
               }
           }
       }
       uint256 requiredPay=videos[vidAddress].buyPrice*count*percent/100;
       if (requiredPay>msg.value){
           ReturnResult("insufficient ether transferred");
           revert();
       }
       if (msg.value-requiredPay>0){
           msg.sender.transfer(msg.value-requiredPay);
       }
       
       
       if (count>0){
           payEther(vidAddress,requiredPay,secondAcc);
       }
       
       if (videos[vidAddress].tokenQuantity[newOwner]>0&&changeFlag==true){
           userVideos[newOwner].push(vidAddress);
       }
       
       if (videos[vidAddress].tokenQuantity[msg.sender]==0){
           for (uint k=0;k<userVideos[msg.sender].length;k++){
               if (userVideos[msg.sender][k]==vidAddress){
                    delete userVideos[msg.sender][k];    
               }
               
           }
           
       }
       
   }
   
   /*
     * validateToken
     * validation to check the availability of video to a user 
     * @param  address vidAddress
     * @return bool
     * @author Sankalp Sharma
     */
   function validateToken(address vidAddress)constant returns(bool){
       if (videos[vidAddress].tokenQuantity[msg.sender]>0){
           return true;
       } else {
           return false;
       }
   }
     /*
     * readVidBySender
     *reading video for the sender of the transaction  
     * @param address vidAddress
     * @return address vidAddress, uint tokens, string vidTitle,address owner, uint256 buyprice
     * @author Shubhabrata Mukherjee
     */
   function readVideoBySender(address vidAddress)constant returns(address,string,uint,uint[],uint256,uint){
       return (videos[vidAddress].vidAddress,videos[vidAddress].title,videos[vidAddress].tokenQuantity[msg.sender],videos[vidAddress].tokens[msg.sender],videos[vidAddress].buyPrice,videos[vidAddress].currentSupply);
   }
   
   /*
     * readAllVids
     * reading all videos for a 
     * @return  address[] vidAddress
     * @author Shubhabrata Mukherjee
     */
   function readAllVids()constant returns(address[]){
       return userVideos[msg.sender];
   }
    /*
     * readTokensForVidBySender
     * reading all tokens for a avideo for a user
     * @return  uint[] tokens
     * @author Shubhabrata Mukherjee
     */
    function readTokensForVidBySender(address vidAddress) constant returns(uint[]){
        return videos[vidAddress].tokens[msg.sender];
    }
   

}
