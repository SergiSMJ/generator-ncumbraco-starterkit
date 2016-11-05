'use strict';

var NovicellCorporate = NovicellCorporate || {};

NovicellCorporate.rowsBackgrounds = NovicellCorporate.rowsBackgrounds || function() {
  function backgroundImages() {
    var imageList = document.querySelectorAll("div[data-background-image]");
    for (var i = 0; i < imageList.length; i++) {
      var url = imageList[i].getAttribute('data-background-image');
      imageList[i].style.backgroundImage="url('" + url + "')";
    }
  }

  function themes() {
    var themeList = document.querySelectorAll("div[data-theme]");
    for (var i = 0; i < themeList.length; i++) {
      var themeClass = themeList[i].getAttribute('data-theme');
      themeList[i].className += " " + themeClass;
    }
  }

  return {
    backgroundImages: backgroundImages,
    themes: themes
  };

}();
