var options = {
  init: function() {
    document.querySelector('#opt_all').checked = localStorage["any"] == "true" || 'undefined' == typeof(localStorage["any"])
                                               ? true
                                               : false;

    document.querySelector('#opt_domains')
                                      .value = localStorage["val"]
                                             ? localStorage["val"]
                                             : "vk.com";
    document.querySelector('#opt_exclude_domains')
                                      .value = localStorage["exc"]
                                             ? localStorage["exc"]
                                             : "";
  },

  save: function() {
    localStorage["any"] = document.querySelector('#opt_all').checked;
    localStorage["val"] = document.querySelector('#opt_domains').value;
    localStorage["exc"] = document.querySelector('#opt_exclude_domains').value;
  }
};

document.addEventListener('DOMContentLoaded', options.init);
document.querySelector('#save').addEventListener('click', options.save);