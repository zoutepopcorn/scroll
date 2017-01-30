var aTab;

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    aTab = tabs[0];
});

init = function() {
    console.log("init");
    inLibs();
    addButton("github", "fa-github");
    addButton("click", "fa-magic");
    // Click #id -> to -> id()
    $(".app").click(function() {
        var fn = window[this.id];
        fn();
        // setTimeout(function () {
          $('body').hide();
        // }, 200)
        setTimeout(function () {
          window.close();
        }, 1500);
    });
}

scroll = function() {
    // chrome.tabs.insertCSS({ file : "bspage.css" });
    executeScripts(null, [
        { code: "test();" }
    ]);
}

save = function() {
    function getDomain(url){
      domain=url.split("//")[1];
      domain = domain.replace("www.", "");
      return domain.split("/")[0];
    }
    function getDate() {
        function aZero(n) {
            return n.toString().length == 1 ?  n = '0' + n: n = n + '';
        }
        var now = new Date();
        var dd = now.getDate();
        var mm = now.getMonth()+1;
        var y = now.getFullYear();
        return y.toString().substr(2,2) + aZero(mm) + aZero(dd) + '_';
    }
    chrome.pageCapture.saveAsMHTML({tabId: aTab.id}, function(blob) {
        var filename = getDate() + getDomain(aTab.url) + ".mhtml";
        saveAs(blob, filename);
    });
};

github = function() {
    chrome.tabs.create({ url: "http://github.com/" });
};

click = function() {
    executeScripts(null, [
        { code: "clickAll();" }
    ]);
}

inLibs = function() {
  console.log("Ok");
    chrome.tabs.executeScript(null, { file : "load.js" },
        function(out) {
            console.log("Ok");
            console.log(out[0]);
            if(out[0]) {
                executeScripts(null, [
                  { file: "js_lib/jq.js" },
                  { file: "js_lib/bs.js" },
                  { file: "js_lib/nt.js" },
                  { file: "scroll.js" }
                ]);
            }
      });
};

executeScripts = function(tabId, injectDetailsArray) {
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }
    var callback = null;
    for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        callback = createCallback(tabId, injectDetailsArray[i], callback);
    if (callback !== null)
        callback();
}

addButton = function(id, icon) {
    $("#show").append(`
        <div class="app" id="` + id + `">
            <i class="fa ` + icon + `"></i>
            <div class="txt">` + id + `</div>
        </div>
    `);
};

init();

// See more
// #id_588a0b94bbbcb1988663697 > span:nth-child(6) > span > a > span

//
// see_more_link_inner


//
// UFIPagerLink

// #u_jsonp_5_i > div > div._3b-9 > div > div.UFIRow.UFIPagerRow._4oep._48pi > div > div:nth-child(2) > a > em
