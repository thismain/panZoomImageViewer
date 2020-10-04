let tabs = new Set();

function inject(tabId){
chrome.tabs.executeScript(tabId, { file: "content.js", runAt: "document_end" });
}

function onHeadersReceived(details){
if(!tabs.has(details.tabId)){
details.responseHeaders.some(function(header){
if(header.name.toLowerCase() === "content-type" && 
/^image\/(jpeg|png|gif|(x-|vnd\.microsoft\.)icon|bmp|webp)$/.test(header.value)){
tabs.add(details.tabId);
return true;
} //end header name
}); //end details response headers
} //end !tabs
}//end on headers received



function onTabUpdated(_, changeInfo, tab){
if(/^file:\/\/\/.+\.(jpe?g|png|gif|ico|bmp|webp|jfif|pjp(eg)?)$/.test(tab.url) && 
changeInfo.status === "loading" || tabs.has(tab.id)){
inject(tab.id);
tabs.delete(tab.id);
} //end if loading
}//end on tab updated


chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, { types: [ "main_frame" ], urls: [ "http://*/*", "https://*/*" ] }, [ "responseHeaders" ]);

chrome.tabs.onUpdated.addListener(onTabUpdated);


