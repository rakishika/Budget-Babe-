var item = {
  "id": "budgetBabe",
  "title": "BudgetBabe",
  "contexts": ["selection"]
};


function isInt(value) {
  return !isNaN(value) &&
  parseInt(Number(value)) == value &&
  !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(item);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == "budgetBabe" && clickData.selectionText){
    if(isInt(clickData.selectionText)){
      chrome.storage.sync.get(['total', 'limit'], function(budget){
        var newTotal = 0;
        if (budget.total){
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({'total': newTotal}, function(){
          if(newTotal >= budget.limit){
            var notifOptions = {
              type: "basic",
              iconUrl: "get_started48.png",
              title: "Over budget!",
              message: "If you make this purchase you will go over budget"
            };
            chrome.notifications.create('limitNotif', notifOptions);
          }
        });
      });
    }
  }
});
chrome.storage.onChanged.addListener(function(changes, storageName){
  chrome.pageAction.setBadgeText({"text": changes.total.newValue.toString()});
});






// var menuItem = {
//   "id": "budgetBabe",
//   "title": "BudgetBabe",
//   "contexts": ["selection"]
// };
//
// function isInt(value) {
//   return !isNaN(value) &&
//   parseInt(Number(value)) == value &&
//   !isNaN(parseInt(value, 10));
// }
//
//
// chrome.contextMenus.create(menuItem);
//
//
// chrome.contextMenus.onClicked.addListener(function(clickData){
//   if (clickData.menuItemId == "budgetBabe" && clickData.selectionText){
//     if (isInt(clickData.selectionText)){
//       chrome.storage.sync.get(['total','limit'], function(budget){
//         var newTotal = 0;
//         if (budget.total){
//           newTotal += parseInt(budget.total);
//         }
//
//
//         newTotal += parseInt(clickData.selectionText);
//
//
//         chrome.storage.sync.set({'total': newTotal}, function(){
//           if (newTotal >= budget.limit){
//
//             var notifOptions = {
//               type: "basic",
//               iconUrl: "icon48.png",
//               title: "Limit reached!",
//               message: "Uh oh, look's like you've reached your alloted limit."
//             };
//
//             chrome.notifications.create('limitNotif', notifOptions);
//           }
//         });
//       });
//     }
//   }
// });
//
//
//
//
// chrome.storage.onChanged.addListener(function(changes, storageName){
//   chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
// });
