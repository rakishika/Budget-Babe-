// let page = document.getElementById('buttonDiv');
//  const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
//  function constructOptions(kButtonColors) {
//    for (let item of kButtonColors) {
//      let button = document.createElement('button');
//      button.style.backgroundColor = item;
//      button.addEventListener('click', function() {
//        chrome.storage.sync.set({color: item}, function() {
//          console.log('color is ' + item);
//        })
//      });
//      page.appendChild(button);
//    }
//  }
//  constructOptions(kButtonColors);

$(function(){
 chrome.storage.sync.get('limit', function(budget){
   $('#limit').val(budget.limit);
 })

 $('#saveLimit').click(function(){
   var limit = $('#limit').val();
   if(limit){
     chrome.storage.sync.set({'limit' : limit}, function(){
       close();
     });
   }
 });

 $('#resetTotal').click(function(){
   chrome.storage.sync.set({'total': 0}, function(){

     var notifOptions = {
               type: "basic",
               iconUrl: "images/get_started48.png",
               title: "Changing total spendings",
               message: "Total spendings has now been reset to 0."
           };

           chrome.notifications.create('resetNotif', notifOptions);
 });
});
});
