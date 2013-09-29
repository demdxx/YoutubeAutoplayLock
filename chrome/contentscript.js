!(function(){
  var codeBlock = {
    storage: {},
    check: function(s, list) {
      var result = false;
      for (var k in list) {
        var v = list[k];
        if (!v) continue;
        // var not = '!' == v[0];
        var reg = new RegExp("^" + v + "$", "i"); // (not ? v.substr(1) : v)
        if (reg.test(s)) {
          result = true;
          break;
        } 
      }
      return result;
    },

    checkDomain: function() {
      if (this.storage["any"] == "true" || 'undefined' == typeof(this.storage["any"])) {
        return true;
      }
      var att = url.parse(document.location.href);
      if (typeof(att.host) != 'undefined') {
        if ('undefined' == typeof(this.storage["val"])) {
          this.storage["val"] = 'vk.com';
        }
        if (!this.storage["val"] || "" == this.storage["val"].trim()) {
          return false;
        }
        if (this.storage["exc"] && "" != this.storage["exc"].trim()) {
          if (this.check(att.host, this.storage["exc"].trim().split("\n"))) {
            return false;
          }
        }
        return this.check(att.host, this.storage["val"].trim().split("\n"));
      }
      return true;
    },

    init: function() {
      var self = this;
      chrome.extension.sendMessage({method: "getStorage"}, function(response) {
        self.storage = response;
        if (self.checkDomain()) {
          $(document).on("click", "body", self.onclick);
          self.removeAutoplay();
        }
      });
    },

    onclick: function() {
      codeBlock.removeAutoplay();
      setTimeout(function(){ codeBlock.removeAutoplay(); }, 300);
    },

    removeAutoplay: function() {
      $("iframe").each(function(){
        var $this = $(this);
        var src = $this.attr("src");
        if ('string' == typeof(src)) {
          // http://www.youtube.com/embed/dXuRfOKmUdo?autoplay=1&autohide=1&wmode=opaque&showinfo=0
          var _url = url.parse(src);
          var _params = url.get(_url.query);
          if (typeof (_params.autoplay) != 'undefined' && /^http(s)?:\/\/(www\.)youtube.com\/embed\//i.test(src)) {
            delete _params.autoplay;
            delete _url.query;
            delete _url.url;
            _url.get = _params;
            $this.attr("src", url.build(_url));
          }
        }
      });
    }
  };

  codeBlock.init();
})();