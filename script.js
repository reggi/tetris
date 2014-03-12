$(document).ready(function(){
  window.scrollTo(0,document.body.scrollHeight);

  var lib = {};

  function roundToNearest( number, multiple ){
    return Math.round(number/multiple)*multiple;
  }

  lib.bottomFramework = function(scrollTop){
    var docHeight = $(document).height();
    var windowHeight = $(window).height();
    var scrollBottom = docHeight - (scrollTop + windowHeight);
    return scrollBottom;
  }

  lib.scrollBottom = function(){
    var scrollTop = $(window).scrollTop();
    return lib.bottomFramework(scrollTop);
  }

  lib.create = function(c, bottom, left, max_bottom){
    var piece = $(c).clone();
    if(piece.length === 0) throw new Error("no piece:"+ c);
    var style = {
      "position": "absolute",
      "bottom": (bottom * 40) + "px",
      "left": (left * 40) + "px",
    };
    var max_bottom = max_bottom * 40;
    var piece_styled = piece.css(style).attr("data-max-bottom", max_bottom);
    $("#board").append(piece_styled);
  }

  lib.create(".l.r1", 0, 0, 0);
  lib.create(".i.r1", 3, 3, 0);
  lib.create(".s.r2", 8, 2, 2);
  lib.create(".j.r2", 4, 0, 1);
  lib.create(".o", 5, 3, 1);
  lib.create(".z.r1", 6, 6, 0);
  lib.create(".t.r2", 9, 5, 1);
  lib.create(".i.r2", 9, 0, 2);
  lib.create(".j.r3", 2, 9, 0);
  lib.create(".z.r2", 12, 7, 1);
  lib.create(".l.r2", 5, 10, 1);
  lib.create(".t.r4", 15, 8, 2);
  lib.create(".i.r2", 7, 12, 0);
  lib.create(".o", 1, 13, 0);
  lib.create(".j.r4", 12, 11, 2);
  lib.create(".t.r1", 4, 15, 0);
  lib.create(".s.r2", 7, 15, 1);
  lib.create(".s.r1", 12, 13, 2);
  lib.create(".l.r3", 16, 13, 3);
  lib.create(".o", 14, 1, 4);
  lib.create(".l.r4", 15, 3, 3);

  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  $("#board .piece").each(function(){
    var $this = $(this);
    var bottom = $this.css("bottom").replace("px","");
    $(window).on("scroll",function(){
      var scrollBottom = lib.scrollBottom();
      var maxBottom = ($this.attr("data-max-bottom")) ? $this.attr("data-max-bottom") : "0";
      if(scrollBottom >= (bottom - maxBottom)){
        $this.css({"position":"fixed", "bottom": maxBottom + "px"});
      }else{
        $this.css({"position":"absolute", "bottom": bottom + "px" });
      }
    });
  });

  $("#board .piece").on("click",function(e){
    var $clone = $(this).clone();
    $("#board").append($clone);
    var original_event = e;
    var mouse_event;
    $(document).on("mousemove",function( event ) {
      mouse_event = event;
      var x =  $(document).height() - event.pageY;
      $clone.css({
        "left": roundToNearest(event.pageX, 40) - 40,
        "bottom": roundToNearest(x, 40) - 40,
        "position": "absolute"
      });
    });
    $(document).keypress(function(e) {
      if (e.which !== 114) return false;
    });
    $clone.on("click", function(){
      $(document).unbind("mousemove");
      $(document).unbind("keypress");
    });
  });

});
