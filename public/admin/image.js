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
          var cbWidth = Math.round(event.width);
          var cbHeight = Math.round(event.height);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2ltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9zdHlsZXMvaW1hZ2Uuc2Nzcz9jN2UzIl0sIm5hbWVzIjpbImRhdGFVUkl0b0Jsb2IiLCJkYXRhVVJJIiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsImFiIiwiQXJyYXlCdWZmZXIiLCJsZW5ndGgiLCJpYSIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsIkJsb2IiLCJ0eXBlIiwiRHJvcHpvbmUiLCJhdXRvRGlzY292ZXIiLCJpbml0RHJvcHpvbmUiLCJteURyb3B6b25lIiwicGFyYW1OYW1lIiwibWF4RmlsZXNpemUiLCJhY2NlcHRlZEZpbGVzIiwiYXV0b1Byb2Nlc3NRdWV1ZSIsImRpY3REZWZhdWx0TWVzc2FnZSIsImRpY3RGaWxlVG9vQmlnIiwiZGljdEludmFsaWRGaWxlVHlwZSIsIm9uIiwiZmlsZSIsImNyb3BwZWQiLCJjYWNoZWRGaWxlbmFtZSIsIm5hbWUiLCJyZW1vdmVGaWxlIiwiJGNyb3BwZXJNb2RhbCIsIiQiLCIkdXBsb2FkQ3JvcCIsImZpbmQiLCIkY2FuY2VsQ3JvcCIsIm1vZGFsIiwiYmFja2Ryb3AiLCJrZXlib2FyZCIsImUiLCJub3QiLCJyZW1vdmUiLCIkaW1nIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsImh0bWwiLCJhdHRyIiwicmVzdWx0IiwiY3JvcHBlciIsInByZXZpZXciLCJ2aWV3TW9kZSIsImFzcGVjdFJhdGlvIiwibW92YWJsZSIsImNyb3BCb3hSZXNpemFibGUiLCJjcm9wIiwiZXZlbnQiLCIkY3JvcE1vZGFsIiwicGFyZW50cyIsIiRjcm9wQm94V2lkdGgiLCIkY3JvcEJveEhlaWdodCIsImNiV2lkdGgiLCJNYXRoIiwicm91bmQiLCJ3aWR0aCIsImNiSGVpZ2h0IiwiaGVpZ2h0IiwidGV4dCIsInJlYWRBc0RhdGFVUkwiLCJibG9iIiwidG9EYXRhVVJMIiwibmV3RmlsZSIsImFkZEZpbGUiLCJwcm9jZXNzUXVldWUiLCJyZWxvYWRGcmFnbWVudCIsIndoZW5Db21wbGV0ZSIsImluaXRGYW5jeUJveCIsImluaXRJbWFnZUFjdGlvbnMiLCJ3cmFwcGVyIiwicHJldmVudERlZmF1bHQiLCJidG4iLCJpbWFnZVVSTCIsIndpbmRvdyIsIm9wZW5lciIsIm9uU2VsZWN0SW1hZ2UiLCJhIiwic3dhbCIsInRpdGxlIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25UZXh0Iiwic2hvd0xvYWRlck9uQ29uZmlybSIsInByZUNvbmZpcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImRhdGEiLCJkb25lIiwic3RhdHVzIiwiYWxsb3dPdXRzaWRlQ2xpY2siLCJ0aGVuIiwidmFsdWUiLCJNc2ciLCJzdWNjZXNzIiwiZmFuY3lib3giLCJwYWRkaW5nIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztR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eUUsUUFBckIsQ0FBOEI7QUFDMUJDLFdBQU8sRUFBRTtBQURpQixHQUE5QjtBQUdILENBSkQ7O0FBTUExRSxDQUFDLENBQUMsWUFBTTtBQUNKaEIsY0FBWTtBQUNaNkQsa0JBQWdCO0FBQ2hCRCxjQUFZO0FBQ2YsQ0FKQSxDQUFELEM7Ozs7Ozs7Ozs7O0FDbEtBLHVDIiwiZmlsZSI6ImFkbWluL2ltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYWRtaW4vaW1hZ2UuanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2ltYWdlLnNjc3MnO1xyXG5cclxuY29uc3QgZGF0YVVSSXRvQmxvYiA9IChkYXRhVVJJKSA9PiB7XHJcbiAgICBsZXQgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcclxuICAgIGxldCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XHJcbiAgICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShhYik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgQmxvYihbYWJdLCB7dHlwZTogJ2ltYWdlL2pwZWcnfSk7XHJcbn07XHJcblxyXG5Ecm9wem9uZS5hdXRvRGlzY292ZXIgPSBmYWxzZTtcclxuY29uc3QgaW5pdERyb3B6b25lID0gKCkgPT4ge1xyXG4gICAgbGV0IG15RHJvcHpvbmUgPSBuZXcgRHJvcHpvbmUoJyNpbWFnZS11cGxvYWQtd2lkZ2V0Jywge1xyXG4gICAgICAgIHBhcmFtTmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgIG1heEZpbGVzaXplOiAzLFxyXG4gICAgICAgIGFjY2VwdGVkRmlsZXM6ICdpbWFnZS8qJyxcclxuICAgICAgICBhdXRvUHJvY2Vzc1F1ZXVlOiBmYWxzZSxcclxuICAgICAgICBkaWN0RGVmYXVsdE1lc3NhZ2U6ICdEcmFnICZhbXA7IGRyb3Agb3IgY2xpY2sgdG8gY2hvb3NlIHVwbG9hZCBmaWxlJyxcclxuICAgICAgICBkaWN0RmlsZVRvb0JpZzogJ1lvdXIgZmlsZSBoYXMgZXhjZWVkZWQge3ttYXhGaWxlc2l6ZX19TUInLFxyXG4gICAgICAgIGRpY3RJbnZhbGlkRmlsZVR5cGU6ICdZb3VyIGZpbGUgaXMgbm90IGltYWdlJ1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIG15RHJvcHpvbmUub24oJ3RodW1ibmFpbCcsIGZ1bmN0aW9uIChmaWxlKSB7XHJcbiAgICAgICAgaWYgKGZpbGUuY3JvcHBlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjYWNoZWRGaWxlbmFtZSA9IGZpbGUubmFtZTtcclxuICAgICAgICBteURyb3B6b25lLnJlbW92ZUZpbGUoZmlsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRjcm9wcGVyTW9kYWwgPSAkKCcjbW9kYWwtY3JvcCcpO1xyXG4gICAgICAgIGxldCAkdXBsb2FkQ3JvcCA9ICRjcm9wcGVyTW9kYWwuZmluZCgnLmNyb3AtdXBsb2FkJyk7XHJcbiAgICAgICAgbGV0ICRjYW5jZWxDcm9wID0gJGNyb3BwZXJNb2RhbC5maW5kKCcuY3JvcC1jYW5jZWwnKTtcclxuICAgICAgICBcclxuICAgICAgICAkY3JvcHBlck1vZGFsLm1vZGFsKHtcclxuICAgICAgICAgICAgYmFja2Ryb3A6ICdzdGF0aWMnLFxyXG4gICAgICAgICAgICBrZXlib2FyZDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkY3JvcHBlck1vZGFsLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKCQoJy5tb2RhbC1iYWNrZHJvcCcpLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICQoJy5tb2RhbC1iYWNrZHJvcCcpLm5vdCgnOmZpcnN0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCAkaW1nID0gJCgnPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgLz4nKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLmZpbmQoJy5pbWFnZS1jb250YWluZXInKS5odG1sKCRpbWcpO1xyXG4gICAgICAgICAgICAkaW1nLmF0dHIoJ3NyYycsIHJlYWRlci5yZXN1bHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGltZy5jcm9wcGVyKHtcclxuICAgICAgICAgICAgICAgIHByZXZpZXc6ICcuaW1hZ2UtcHJldmlldycsXHJcbiAgICAgICAgICAgICAgICB2aWV3TW9kZTogMyxcclxuICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiAnJyxcclxuICAgICAgICAgICAgICAgIG1vdmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY3JvcEJveFJlc2l6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNyb3A6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3JvcE1vZGFsID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNyb3BCb3hXaWR0aCA9ICRjcm9wTW9kYWwuZmluZCgnc3BhbltkYXRhLXdpZHRoXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3JvcEJveEhlaWdodCA9ICRjcm9wTW9kYWwuZmluZCgnc3BhbltkYXRhLWhlaWdodF0nKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2JXaWR0aCA9IE1hdGgucm91bmQoZXZlbnQud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYkhlaWdodCA9IE1hdGgucm91bmQoZXZlbnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAkY3JvcEJveFdpZHRoLmF0dHIoJ2RhdGEtd2lkdGgnLCBjYldpZHRoKS50ZXh0KCdXaWR0aDogJyArIGNiV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjcm9wQm94SGVpZ2h0LmF0dHIoJ2RhdGEtd2lkdGgnLCBjYkhlaWdodCkudGV4dCgnSGVpZ2h0OiAnICsgY2JIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICR1cGxvYWRDcm9wLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGJsb2IgPSAkaW1nLmNyb3BwZXIoJ2dldENyb3BwZWRDYW52YXMnKS50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0ZpbGUgPSBkYXRhVVJJdG9CbG9iKGJsb2IpO1xyXG4gICAgICAgICAgICBuZXdGaWxlLmNyb3BwZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBuZXdGaWxlLm5hbWUgPSBjYWNoZWRGaWxlbmFtZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG15RHJvcHpvbmUuYWRkRmlsZShuZXdGaWxlKTtcclxuICAgICAgICAgICAgbXlEcm9wem9uZS5wcm9jZXNzUXVldWUoKTtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRjYW5jZWxDcm9wLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIG15RHJvcHpvbmUub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbiAoZmlsZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcclxuICAgICAgICBcclxuICAgICAgICAkKCcjaW1hZ2VzLXdyYXBwZXInKS5yZWxvYWRGcmFnbWVudCh7XHJcbiAgICAgICAgICAgIHdoZW5Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaW5pdEZhbmN5Qm94KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgaW5pdEltYWdlQWN0aW9ucyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSAkKCcjaW1hZ2VzLXdyYXBwZXInKTtcclxuICAgIFxyXG4gICAgd3JhcHBlci5vbignY2xpY2snLCAnLmJ0bi1zZWxlY3QtaW1hZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgYnRuID0gJCh0aGlzKTtcclxuICAgICAgICBsZXQgaW1hZ2VVUkwgPSBidG4uYXR0cignaHJlZicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh3aW5kb3cub3BlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuZXIub25TZWxlY3RJbWFnZShpbWFnZVVSTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHdyYXBwZXIub24oJ2NsaWNrJywgJy5idG4tZGVsZXRlLWltYWdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGEgPSAkKHRoaXMpO1xyXG4gICAgXHJcbiAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgICAgICAgIHRleHQ6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaW1hZ2U/JyxcclxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0IScsXHJcbiAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgICAgICAgIHByZUNvbmZpcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy9pbWFnZS9kZWxldGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IGEuYXR0cignZGF0YS1pbWFnZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbGxvd091dHNpZGVDbGljazogZmFsc2VcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlICYmIHdyYXBwZXIucmVsb2FkRnJhZ21lbnQoe1xyXG4gICAgICAgICAgICAgICAgd2hlbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgTXNnLnN1Y2Nlc3MoJ0RlbGV0ZWQhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBpbml0RmFuY3lCb3ggPSAoKSA9PiB7XHJcbiAgICAkKCcuYnRuLXpvb20taW1hZ2UnKS5mYW5jeWJveCh7XHJcbiAgICAgICAgcGFkZGluZzogM1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4kKCgpID0+IHtcclxuICAgIGluaXREcm9wem9uZSgpO1xyXG4gICAgaW5pdEltYWdlQWN0aW9ucygpO1xyXG4gICAgaW5pdEZhbmN5Qm94KCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9