$(function(){

  chrome.storage.sync.get(['total','limit'],function(budget){
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
  })

  document.getElementById('amount').style.height="20px";
  document.getElementById('amount').style.fontSize="14pt";

  $('#spendAmount').click(function(){
    chrome.storage.sync.get(['total', 'limit'], function(budget){
      var newTotal = 0;
      if (budget.total){
        newTotal += parseInt(budget.total);
      }

      var amount = $('#amount').val();
      if (amount){
        newTotal += parseInt(amount);
      }


      // chrome.storage.sync.set({'total': newTotal});

      chrome.storage.sync.set({'total': newTotal} , function(){
        console.log(amount, newTotal, budget.limit)
        if(amount && newTotal >= budget.limit){
          console.log('Hello')
          var notifOptions = {
            type: "basic",
            iconUrl: "images/get_started48.png",
            title: "Over budget!",
            message: "If you make this purchase you will go over budget"
          };
          chrome.notifications.clear('limitNotif')
          chrome.notifications.create('limitNotif', notifOptions, (noteId) => {
            console.log('Got notification with id: ', noteId)
          });

        }
      });



      $('#total').text(newTotal);
      $('#amount').val('');
    });
  });
});
