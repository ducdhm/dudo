/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/admin/image.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/admin/image.js":
/*!****************************!*\
  !*** ./src/admin/image.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_image_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/image.scss */ "./src/admin/styles/image.scss");
/* harmony import */ var _styles_image_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_image_scss__WEBPACK_IMPORTED_MODULE_0__);


var dataURItoBlob = function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {
    type: 'image/jpeg'
  });
};

Dropzone.autoDiscover = false;

var initDropzone = function initDropzone() {
  var myDropzone = new Dropzone('#image-upload-widget', {
    paramName: 'file',
    maxFilesize: 3,
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    dictDefaultMessage: 'Drag &amp; drop or click to choose upload file',
    dictFileTooBig: 'Your file has exceeded {{maxFilesize}}MB',
    dictInvalidFileType: 'Your file is not image'
  });
  myDropzone.on('thumbnail', function (file) {
    if (file.cropped) {
      return;
    }

    var cachedFilename = file.name;
    myDropzone.removeFile(file);
    var $cropperModal = $('#modal-crop');
    var $uploadCrop = $cropperModal.find('.crop-upload');
    var $cancelCrop = $cropperModal.find('.crop-cancel');
    $cropperModal.modal({
      backdrop: 'static',
      keyboard: false
    });
    $cropperModal.on('show.bs.modal', function (e) {
      if ($('.modal-backdrop').length > 1) {
        $('.modal-backdrop').not(':first').remove();
      }
    }).modal('show');
    var $img = $('<img class="img-responsive" />');
    var reader = new FileReader();

    reader.onloadend = function () {
      $cropperModal.find('.image-container').html($img);
      $img.attr('src', reader.result);
      $img.cropper({
        preview: '.image-preview',
        viewMode: 3,
        aspectRatio: '',
        movable: false,
        cropBoxResizable: true,
        crop: function crop(event) {
          var $cropModal = $(this).parents('.modal');
          var $cropBoxWidth = $cropModal.find('span[data-width]');
          var $cropBoxHeight = $cropModal.find('span[data-height]');
          var cbWidth = Math.round(event.detail.width);
          var cbHeight = Math.round(event.detail.height);
          $cropBoxWidth.attr('data-width', cbWidth).text('Width: ' + cbWidth);
          $cropBoxHeight.attr('data-width', cbHeight).text('Height: ' + cbHeight);
        }
      });
    };

    reader.readAsDataURL(file);
    $uploadCrop.on('click', function () {
      var blob = $img.cropper('getCroppedCanvas').toDataURL();
      var newFile = dataURItoBlob(blob);
      newFile.cropped = true;
      newFile.name = cachedFilename;
      myDropzone.addFile(newFile);
      myDropzone.processQueue();
      $cropperModal.modal('hide');
      $cropperModal.remove();
    });
    $cancelCrop.on('click', function () {
      $cropperModal.modal('hide');
      $cropperModal.remove();
    });
  });
  myDropzone.on('success', function (file) {
    this.removeFile(file);
    $('#images-wrapper').reloadFragment({
      whenComplete: function whenComplete() {
        initFancyBox();
      }
    });
  });
};

var initImageActions = function initImageActions() {
  var wrapper = $('#images-wrapper');
  wrapper.on('click', '.btn-select-image', function (e) {
    e.preventDefault();
    var btn = $(this);
    var imageURL = btn.attr('href');

    if (window.opener) {
      window.opener.onSelectImage(imageURL);
    }
  });
  wrapper.on('click', '.btn-delete-image', function (e) {
    e.preventDefault();
    var a = $(this);
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this image?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: function preConfirm() {
        return new Promise(function (resolve) {
          $.ajax({
            url: '/image/delete',
            type: 'post',
            dataType: 'json',
            data: {
              file: a.attr('data-image')
            }
          }).done(function (data) {
            if (data && data.status) {
              resolve();
            }
          });
        });
      },
      allowOutsideClick: false
    }).then(function (result) {
      result.value && wrapper.reloadFragment({
        whenComplete: function whenComplete() {
          Msg.success('Deleted!');
        }
      });
    });
  });
};

var initFancyBox = function initFancyBox() {
  $('.btn-zoom-image').fancybox({
    padding: 3
  });
};

$(function () {
  initDropzone();
  initImageActions();
  initFancyBox();
});

/***/ }),

/***/ "./src/admin/styles/image.scss":
/*!*************************************!*\
  !*** ./src/admin/styles/image.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2ltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9zdHlsZXMvaW1hZ2Uuc2Nzcz8wYWZiIl0sIm5hbWVzIjpbImRhdGFVUkl0b0Jsb2IiLCJkYXRhVVJJIiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsImFiIiwiQXJyYXlCdWZmZXIiLCJsZW5ndGgiLCJpYSIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsIkJsb2IiLCJ0eXBlIiwiRHJvcHpvbmUiLCJhdXRvRGlzY292ZXIiLCJpbml0RHJvcHpvbmUiLCJteURyb3B6b25lIiwicGFyYW1OYW1lIiwibWF4RmlsZXNpemUiLCJhY2NlcHRlZEZpbGVzIiwiYXV0b1Byb2Nlc3NRdWV1ZSIsImRpY3REZWZhdWx0TWVzc2FnZSIsImRpY3RGaWxlVG9vQmlnIiwiZGljdEludmFsaWRGaWxlVHlwZSIsIm9uIiwiZmlsZSIsImNyb3BwZWQiLCJjYWNoZWRGaWxlbmFtZSIsIm5hbWUiLCJyZW1vdmVGaWxlIiwiJGNyb3BwZXJNb2RhbCIsIiQiLCIkdXBsb2FkQ3JvcCIsImZpbmQiLCIkY2FuY2VsQ3JvcCIsIm1vZGFsIiwiYmFja2Ryb3AiLCJrZXlib2FyZCIsImUiLCJub3QiLCJyZW1vdmUiLCIkaW1nIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsImh0bWwiLCJhdHRyIiwicmVzdWx0IiwiY3JvcHBlciIsInByZXZpZXciLCJ2aWV3TW9kZSIsImFzcGVjdFJhdGlvIiwibW92YWJsZSIsImNyb3BCb3hSZXNpemFibGUiLCJjcm9wIiwiZXZlbnQiLCIkY3JvcE1vZGFsIiwicGFyZW50cyIsIiRjcm9wQm94V2lkdGgiLCIkY3JvcEJveEhlaWdodCIsImNiV2lkdGgiLCJNYXRoIiwicm91bmQiLCJkZXRhaWwiLCJ3aWR0aCIsImNiSGVpZ2h0IiwiaGVpZ2h0IiwidGV4dCIsInJlYWRBc0RhdGFVUkwiLCJibG9iIiwidG9EYXRhVVJMIiwibmV3RmlsZSIsImFkZEZpbGUiLCJwcm9jZXNzUXVldWUiLCJyZWxvYWRGcmFnbWVudCIsIndoZW5Db21wbGV0ZSIsImluaXRGYW5jeUJveCIsImluaXRJbWFnZUFjdGlvbnMiLCJ3cmFwcGVyIiwicHJldmVudERlZmF1bHQiLCJidG4iLCJpbWFnZVVSTCIsIndpbmRvdyIsIm9wZW5lciIsIm9uU2VsZWN0SW1hZ2UiLCJhIiwic3dhbCIsInRpdGxlIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25UZXh0Iiwic2hvd0xvYWRlck9uQ29uZmlybSIsInByZUNvbmZpcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImRhdGEiLCJkb25lIiwic3RhdHVzIiwiYWxsb3dPdXRzaWRlQ2xpY2siLCJ0aGVuIiwidmFsdWUiLCJNc2ciLCJzdWNjZXNzIiwiZmFuY3lib3giLCJwYWRkaW5nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0Qs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dkI3QyxHQUFDLENBQUMsaUJBQUQsQ0FBRCxDQUFxQjBFLFFBQXJCLENBQThCO0FBQzFCQyxXQUFPLEVBQUU7QUFEaUIsR0FBOUI7QUFHSCxDQUpEOztBQU1BM0UsQ0FBQyxDQUFDLFlBQU07QUFDSmhCLGNBQVk7QUFDWjhELGtCQUFnQjtBQUNoQkQsY0FBWTtBQUNmLENBSkEsQ0FBRCxDOzs7Ozs7Ozs7OztBQ2xLQSx1QyIsImZpbGUiOiJhZG1pbi9pbWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FkbWluL2ltYWdlLmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbWFnZS5zY3NzJztcclxuXHJcbmNvbnN0IGRhdGFVUkl0b0Jsb2IgPSAoZGF0YVVSSSkgPT4ge1xyXG4gICAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XHJcbiAgICBsZXQgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xyXG4gICAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IEJsb2IoW2FiXSwge3R5cGU6ICdpbWFnZS9qcGVnJ30pO1xyXG59O1xyXG5cclxuRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gZmFsc2U7XHJcbmNvbnN0IGluaXREcm9wem9uZSA9ICgpID0+IHtcclxuICAgIGxldCBteURyb3B6b25lID0gbmV3IERyb3B6b25lKCcjaW1hZ2UtdXBsb2FkLXdpZGdldCcsIHtcclxuICAgICAgICBwYXJhbU5hbWU6ICdmaWxlJyxcclxuICAgICAgICBtYXhGaWxlc2l6ZTogMyxcclxuICAgICAgICBhY2NlcHRlZEZpbGVzOiAnaW1hZ2UvKicsXHJcbiAgICAgICAgYXV0b1Byb2Nlc3NRdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgZGljdERlZmF1bHRNZXNzYWdlOiAnRHJhZyAmYW1wOyBkcm9wIG9yIGNsaWNrIHRvIGNob29zZSB1cGxvYWQgZmlsZScsXHJcbiAgICAgICAgZGljdEZpbGVUb29CaWc6ICdZb3VyIGZpbGUgaGFzIGV4Y2VlZGVkIHt7bWF4RmlsZXNpemV9fU1CJyxcclxuICAgICAgICBkaWN0SW52YWxpZEZpbGVUeXBlOiAnWW91ciBmaWxlIGlzIG5vdCBpbWFnZSdcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBteURyb3B6b25lLm9uKCd0aHVtYm5haWwnLCBmdW5jdGlvbiAoZmlsZSkge1xyXG4gICAgICAgIGlmIChmaWxlLmNyb3BwZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2FjaGVkRmlsZW5hbWUgPSBmaWxlLm5hbWU7XHJcbiAgICAgICAgbXlEcm9wem9uZS5yZW1vdmVGaWxlKGZpbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCAkY3JvcHBlck1vZGFsID0gJCgnI21vZGFsLWNyb3AnKTtcclxuICAgICAgICBsZXQgJHVwbG9hZENyb3AgPSAkY3JvcHBlck1vZGFsLmZpbmQoJy5jcm9wLXVwbG9hZCcpO1xyXG4gICAgICAgIGxldCAkY2FuY2VsQ3JvcCA9ICRjcm9wcGVyTW9kYWwuZmluZCgnLmNyb3AtY2FuY2VsJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCh7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJyxcclxuICAgICAgICAgICAga2V5Ym9hcmQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNyb3BwZXJNb2RhbC5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcubW9kYWwtYmFja2Ryb3AnKS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5ub3QoJzpmaXJzdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgJGltZyA9ICQoJzxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIC8+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5maW5kKCcuaW1hZ2UtY29udGFpbmVyJykuaHRtbCgkaW1nKTtcclxuICAgICAgICAgICAgJGltZy5hdHRyKCdzcmMnLCByZWFkZXIucmVzdWx0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRpbWcuY3JvcHBlcih7XHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3OiAnLmltYWdlLXByZXZpZXcnLFxyXG4gICAgICAgICAgICAgICAgdmlld01vZGU6IDMsXHJcbiAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogJycsXHJcbiAgICAgICAgICAgICAgICBtb3ZhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNyb3BCb3hSZXNpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjcm9wOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNyb3BNb2RhbCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjcm9wQm94V2lkdGggPSAkY3JvcE1vZGFsLmZpbmQoJ3NwYW5bZGF0YS13aWR0aF0nKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNyb3BCb3hIZWlnaHQgPSAkY3JvcE1vZGFsLmZpbmQoJ3NwYW5bZGF0YS1oZWlnaHRdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNiV2lkdGggPSBNYXRoLnJvdW5kKGV2ZW50LmRldGFpbC53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNiSGVpZ2h0ID0gTWF0aC5yb3VuZChldmVudC5kZXRhaWwuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAkY3JvcEJveFdpZHRoLmF0dHIoJ2RhdGEtd2lkdGgnLCBjYldpZHRoKS50ZXh0KCdXaWR0aDogJyArIGNiV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjcm9wQm94SGVpZ2h0LmF0dHIoJ2RhdGEtd2lkdGgnLCBjYkhlaWdodCkudGV4dCgnSGVpZ2h0OiAnICsgY2JIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR1cGxvYWRDcm9wLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGJsb2IgPSAkaW1nLmNyb3BwZXIoJ2dldENyb3BwZWRDYW52YXMnKS50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0ZpbGUgPSBkYXRhVVJJdG9CbG9iKGJsb2IpO1xyXG4gICAgICAgICAgICBuZXdGaWxlLmNyb3BwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBuZXdGaWxlLm5hbWUgPSBjYWNoZWRGaWxlbmFtZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG15RHJvcHpvbmUuYWRkRmlsZShuZXdGaWxlKTtcclxuICAgICAgICAgICAgbXlEcm9wem9uZS5wcm9jZXNzUXVldWUoKTtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRjYW5jZWxDcm9wLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIG15RHJvcHpvbmUub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiAoZmlsZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcclxuICAgICAgICBcclxuICAgICAgICAkKCcjaW1hZ2VzLXdyYXBwZXInKS5yZWxvYWRGcmFnbWVudCh7XHJcbiAgICAgICAgICAgIHdoZW5Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW5pdEZhbmN5Qm94KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgaW5pdEltYWdlQWN0aW9ucyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSAkKCcjaW1hZ2VzLXdyYXBwZXInKTtcclxuICAgIFxyXG4gICAgd3JhcHBlci5vbignY2xpY2snLCAnLmJ0bi1zZWxlY3QtaW1hZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYnRuID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgaW1hZ2VVUkwgPSBidG4uYXR0cignaHJlZicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh3aW5kb3cub3BlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuZXIub25TZWxlY3RJbWFnZShpbWFnZVVSTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHdyYXBwZXIub24oJ2NsaWNrJywgJy5idG4tZGVsZXRlLWltYWdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGEgPSAkKHRoaXMpO1xyXG4gICAgXHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgICAgICAgIHRleHQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaW1hZ2U/JyxcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0IScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgICAgICAgIHByZUNvbmZpcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9pbWFnZS9kZWxldGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGEuYXR0cignZGF0YS1pbWFnZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlICYmIHdyYXBwZXIucmVsb2FkRnJhZ21lbnQoe1xyXG4gICAgICAgICAgICAgICAgd2hlbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgTXNnLnN1Y2Nlc3MoJ0RlbGV0ZWQhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBpbml0RmFuY3lCb3ggPSAoKSA9PiB7XHJcbiAgICAkKCcuYnRuLXpvb20taW1hZ2UnKS5mYW5jeWJveCh7XHJcbiAgICAgICAgcGFkZGluZzogM1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4kKCgpID0+IHtcclxuICAgIGluaXREcm9wem9uZSgpO1xyXG4gICAgaW5pdEltYWdlQWN0aW9ucygpO1xyXG4gICAgaW5pdEZhbmN5Qm94KCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9