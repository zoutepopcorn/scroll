var isUp = false;
var intMsg = null;
var klok = null;
var time = 0;
var title = document.title;
var isLoaded = true;

/*function isLoaded() {
    return true;
}*/


function secstr() {
   time++;
   return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}


function test() {
    ct(jQuery.active,"blue");
    console.log("test " + document.title);
    var sc = new Scroll();
    sc.scroller();
    setTimeout(function () {
        $.notify("scrollen gestart", "success");
    }, 200);
    intMsg = setInterval(function () {
        $.notify("scroll omhoog om te stoppen", "info");
    }, 6500);
    klok = setInterval(function () {
        console.log("...");
        document.title = "(" + secstr() + ") " +title;
    }, 1000);
}

function saver() {
    var sv = new Saver();
    sv.saver();
}

function clickAll() {
    $('.see_more_link_inner').each(function() {

        this.click();
    });
    console.log("plop");
    $('.UFIPagerLink').each(function() {
        this.click();
    });
    console.log("plop");

    $('a._5v47.fss').each(function() {
        this.click();
    });
    console.log("plop");
//#u_0_17 > div > div._3b-9 > div > div.UFIRow._48ph.UFIComment._4oep > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div.UFICommentContent > span:nth-child(2) > span > span > span > a > em

}

function ct(msg, color) {
    console.log("%c" + msg, "color:" + color + ";font-weight:bold;");
}


class Scroll {
    constructor() {
        ct("scroll","green");
    }
    scroller() {
        $(".alert").show();
        var int  = setInterval(function(){
              var dh = $(document).height();
              $("body, html").animate({
                  scrollTop: dh
              }, 1);
              ct(jQuery.active,"blue");
              if(isUp) {
                  clearInterval(int);
                  clearInterval(klok);
                  document.title = "(v)" + title;
              }
        }, 200);
    }
}

class Saver {
  constructor() {

  }
  saver() {
      console.log("hop");
      setTimeout(function () {

      }, 1000);
  }
}

$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        isUp = true;
        if(intMsg) {
          clearInterval(intMsg);
          console.log("scr>> " + intMsg);
          intMsg = null;
          $.notify("scrollen gestopt", "warning");
        }

    }
    else {
        // console.log('Scroll down');
    }
});
