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
    var $cropperModal = $("\n            <div class=\"modal\">\n                <div class=\"modal-dialog modal-lg\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close crop-cancel\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span></button>\n                            <h4 class=\"modal-title\">Crop Image</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <div class=\"image-container\"></div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <div class=\"pull-left\">\n                                <span data-width></span> x <span data-height></span>\n                            </div>\n                            <button type=\"button\" class=\"btn btn-default crop-cancel\" data-dismiss=\"modal\">Close</button>\n                            <button type=\"button\" class=\"btn btn-primary crop-upload\">Crop & Upload</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
    var $uploadCrop = $cropperModal.find('.crop-upload');
    var $cancelCrop = $cropperModal.find('.crop-cancel');
    $cropperModal.modal({
      backdrop: 'static',
      keyboard: false
    });
    $cropperModal.on('show.bs.modal', function (e) {
      console.log('Fired');

      if ($(".modal-backdrop").length > 1) {
        $(".modal-backdrop").not(':first').remove();
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
    $('#images-wrapper').reloadFragment();
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
    var $image = $(this).closest('.image');

    if (confirm('Are you sure you want to delete this image?')) {
      $.ajax({
        url: '/image/delete',
        type: 'post',
        dataType: 'json',
        data: {
          file: $image.attr('title')
        }
      }).done(function (data) {
        if (data && data.status) {
          Msg.success('Deleted!');
          wrapper.reloadFragment();
        }
      });
    }
  });
};

$(function () {
  initDropzone();
  initImageActions();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2ltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9zdHlsZXMvaW1hZ2Uuc2Nzcz8wYWZiIl0sIm5hbWVzIjpbImRhdGFVUkl0b0Jsb2IiLCJkYXRhVVJJIiwiYnl0ZVN0cmluZyIsImF0b2IiLCJzcGxpdCIsImFiIiwiQXJyYXlCdWZmZXIiLCJsZW5ndGgiLCJpYSIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsIkJsb2IiLCJ0eXBlIiwiRHJvcHpvbmUiLCJhdXRvRGlzY292ZXIiLCJpbml0RHJvcHpvbmUiLCJteURyb3B6b25lIiwicGFyYW1OYW1lIiwibWF4RmlsZXNpemUiLCJhY2NlcHRlZEZpbGVzIiwiYXV0b1Byb2Nlc3NRdWV1ZSIsImRpY3REZWZhdWx0TWVzc2FnZSIsImRpY3RGaWxlVG9vQmlnIiwiZGljdEludmFsaWRGaWxlVHlwZSIsIm9uIiwiZmlsZSIsImNyb3BwZWQiLCJjYWNoZWRGaWxlbmFtZSIsIm5hbWUiLCJyZW1vdmVGaWxlIiwiJGNyb3BwZXJNb2RhbCIsIiQiLCIkdXBsb2FkQ3JvcCIsImZpbmQiLCIkY2FuY2VsQ3JvcCIsIm1vZGFsIiwiYmFja2Ryb3AiLCJrZXlib2FyZCIsImUiLCJjb25zb2xlIiwibG9nIiwibm90IiwicmVtb3ZlIiwiJGltZyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJodG1sIiwiYXR0ciIsInJlc3VsdCIsImNyb3BwZXIiLCJwcmV2aWV3Iiwidmlld01vZGUiLCJhc3BlY3RSYXRpbyIsIm1vdmFibGUiLCJjcm9wQm94UmVzaXphYmxlIiwiY3JvcCIsImV2ZW50IiwiJGNyb3BNb2RhbCIsInBhcmVudHMiLCIkY3JvcEJveFdpZHRoIiwiJGNyb3BCb3hIZWlnaHQiLCJjYldpZHRoIiwiTWF0aCIsInJvdW5kIiwiZGV0YWlsIiwid2lkdGgiLCJjYkhlaWdodCIsImhlaWdodCIsInRleHQiLCJyZWFkQXNEYXRhVVJMIiwiYmxvYiIsInRvRGF0YVVSTCIsIm5ld0ZpbGUiLCJhZGRGaWxlIiwicHJvY2Vzc1F1ZXVlIiwicmVsb2FkRnJhZ21lbnQiLCJpbml0SW1hZ2VBY3Rpb25zIiwid3JhcHBlciIsInByZXZlbnREZWZhdWx0IiwiYnRuIiwiaW1hZ2VVUkwiLCJ3aW5kb3ciLCJvcGVuZXIiLCJvblNlbGVjdEltYWdlIiwiJGltYWdlIiwiY2xvc2VzdCIsImNvbmZpcm0iLCJhamF4IiwidXJsIiwiZGF0YVR5cGUiLCJkYXRhIiwiZG9uZSIsInN0YXR1cyIsIk1zZyIsInN1Y2Nlc3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7O0FBRUEsSUFBTUEsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDQyxPQUFELEVBQWE7QUFDL0IsTUFBSUMsVUFBVSxHQUFHQyxJQUFJLENBQUNGLE9BQU8s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LEVBQUUsZUFERjtBQUVIN0UsWUFBSSxFQUFFLE1BRkg7QUFHSDhFLGdCQUFRLEVBQUUsTUFIUDtBQUlIQyxZQUFJLEVBQUU7QUFDRmxFLGNBQUksRUFBRTRELE1BQU0sQ0FBQ3JDLElBQVAsQ0FBWSxPQUFaO0FBREo7QUFKSCxPQUFQLEVBT0c0QyxJQVBILENBT1EsVUFBVUQsSUFBVixFQUFnQjtBQUNwQixZQUFJQSxJQUFJLElBQUlBLElBQUksQ0FBQ0UsTUFBakIsRUFBeUI7QUFDckJDLGFBQUcsQ0FBQ0MsT0FBSixDQUFZLFVBQVo7QUFDQWpCLGlCQUFPLENBQUNGLGNBQVI7QUFDSDtBQUNKLE9BWkQ7QUFhSDtBQUNKLEdBcEJEO0FBcUJILENBbkNEOztBQXFDQTdDLENBQUMsQ0FBQyxZQUFNO0FBQ0poQixjQUFZO0FBQ1o4RCxrQkFBZ0I7QUFDbkIsQ0FIQSxDQUFELEM7Ozs7Ozs7Ozs7O0FDOUpBLHVDIiwiZmlsZSI6ImFkbWluL2ltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYWRtaW4vaW1hZ2UuanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2ltYWdlLnNjc3MnO1xyXG5cclxuY29uc3QgZGF0YVVSSXRvQmxvYiA9IChkYXRhVVJJKSA9PiB7XHJcbiAgICBsZXQgYnl0ZVN0cmluZyA9IGF0b2IoZGF0YVVSSS5zcGxpdCgnLCcpWzFdKTtcclxuICAgIGxldCBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XHJcbiAgICBsZXQgaWEgPSBuZXcgVWludDhBcnJheShhYik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgQmxvYihbYWJdLCB7dHlwZTogJ2ltYWdlL2pwZWcnfSk7XHJcbn07XHJcblxyXG5Ecm9wem9uZS5hdXRvRGlzY292ZXIgPSBmYWxzZTtcclxuY29uc3QgaW5pdERyb3B6b25lID0gKCkgPT4ge1xyXG4gICAgbGV0IG15RHJvcHpvbmUgPSBuZXcgRHJvcHpvbmUoJyNpbWFnZS11cGxvYWQtd2lkZ2V0Jywge1xyXG4gICAgICAgIHBhcmFtTmFtZTogJ2ZpbGUnLFxyXG4gICAgICAgIG1heEZpbGVzaXplOiAzLFxyXG4gICAgICAgIGFjY2VwdGVkRmlsZXM6ICdpbWFnZS8qJyxcclxuICAgICAgICBhdXRvUHJvY2Vzc1F1ZXVlOiBmYWxzZSxcclxuICAgICAgICBkaWN0RGVmYXVsdE1lc3NhZ2U6ICdEcmFnICZhbXA7IGRyb3Agb3IgY2xpY2sgdG8gY2hvb3NlIHVwbG9hZCBmaWxlJyxcclxuICAgICAgICBkaWN0RmlsZVRvb0JpZzogJ1lvdXIgZmlsZSBoYXMgZXhjZWVkZWQge3ttYXhGaWxlc2l6ZX19TUInLFxyXG4gICAgICAgIGRpY3RJbnZhbGlkRmlsZVR5cGU6ICdZb3VyIGZpbGUgaXMgbm90IGltYWdlJ1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIG15RHJvcHpvbmUub24oJ3RodW1ibmFpbCcsIGZ1bmN0aW9uIChmaWxlKSB7XHJcbiAgICAgICAgaWYgKGZpbGUuY3JvcHBlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjYWNoZWRGaWxlbmFtZSA9IGZpbGUubmFtZTtcclxuICAgICAgICBteURyb3B6b25lLnJlbW92ZUZpbGUoZmlsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRjcm9wcGVyTW9kYWwgPSAkKGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWxnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZSBjcm9wLWNhbmNlbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5Dcm9wIEltYWdlPC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS13aWR0aD48L3NwYW4+IHggPHNwYW4gZGF0YS1oZWlnaHQ+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBjcm9wLWNhbmNlbFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGNyb3AtdXBsb2FkXCI+Q3JvcCAmIFVwbG9hZDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgKTtcclxuICAgICAgICBsZXQgJHVwbG9hZENyb3AgPSAkY3JvcHBlck1vZGFsLmZpbmQoJy5jcm9wLXVwbG9hZCcpO1xyXG4gICAgICAgIGxldCAkY2FuY2VsQ3JvcCA9ICRjcm9wcGVyTW9kYWwuZmluZCgnLmNyb3AtY2FuY2VsJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCh7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJyxcclxuICAgICAgICAgICAga2V5Ym9hcmQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNyb3BwZXJNb2RhbC5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGaXJlZCcpO1xyXG4gICAgICAgICAgICBpZiAoJChcIi5tb2RhbC1iYWNrZHJvcFwiKS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vZGFsLWJhY2tkcm9wXCIpLm5vdCgnOmZpcnN0JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCAkaW1nID0gJCgnPGltZyBjbGFzcz1cImltZy1yZXNwb25zaXZlXCIgLz4nKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICByZWFkZXIub25sb2FkZW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLmZpbmQoJy5pbWFnZS1jb250YWluZXInKS5odG1sKCRpbWcpO1xyXG4gICAgICAgICAgICAkaW1nLmF0dHIoJ3NyYycsIHJlYWRlci5yZXN1bHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGltZy5jcm9wcGVyKHtcclxuICAgICAgICAgICAgICAgIHByZXZpZXc6ICcuaW1hZ2UtcHJldmlldycsXHJcbiAgICAgICAgICAgICAgICB2aWV3TW9kZTogMyxcclxuICAgICAgICAgICAgICAgIGFzcGVjdFJhdGlvOiAnJyxcclxuICAgICAgICAgICAgICAgIG1vdmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY3JvcEJveFJlc2l6YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNyb3A6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3JvcE1vZGFsID0gJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNyb3BCb3hXaWR0aCA9ICRjcm9wTW9kYWwuZmluZCgnc3BhbltkYXRhLXdpZHRoXScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3JvcEJveEhlaWdodCA9ICRjcm9wTW9kYWwuZmluZCgnc3BhbltkYXRhLWhlaWdodF0nKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2JXaWR0aCA9IE1hdGgucm91bmQoZXZlbnQuZGV0YWlsLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2JIZWlnaHQgPSBNYXRoLnJvdW5kKGV2ZW50LmRldGFpbC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRjcm9wQm94V2lkdGguYXR0cignZGF0YS13aWR0aCcsIGNiV2lkdGgpLnRleHQoJ1dpZHRoOiAnICsgY2JXaWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNyb3BCb3hIZWlnaHQuYXR0cignZGF0YS13aWR0aCcsIGNiSGVpZ2h0KS50ZXh0KCdIZWlnaHQ6ICcgKyBjYkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHVwbG9hZENyb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgYmxvYiA9ICRpbWcuY3JvcHBlcignZ2V0Q3JvcHBlZENhbnZhcycpLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgICAgICBsZXQgbmV3RmlsZSA9IGRhdGFVUkl0b0Jsb2IoYmxvYik7XHJcbiAgICAgICAgICAgIG5ld0ZpbGUuY3JvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG5ld0ZpbGUubmFtZSA9IGNhY2hlZEZpbGVuYW1lO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbXlEcm9wem9uZS5hZGRGaWxlKG5ld0ZpbGUpO1xyXG4gICAgICAgICAgICBteURyb3B6b25lLnByb2Nlc3NRdWV1ZSgpO1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNhbmNlbENyb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkY3JvcHBlck1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbXlEcm9wem9uZS5vbignc3VjY2VzcycsIGZ1bmN0aW9uIChmaWxlKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVGaWxlKGZpbGUpO1xyXG4gICAgICAgICQoJyNpbWFnZXMtd3JhcHBlcicpLnJlbG9hZEZyYWdtZW50KCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGluaXRJbWFnZUFjdGlvbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gICQoJyNpbWFnZXMtd3JhcHBlcicpO1xyXG4gICAgXHJcbiAgICB3cmFwcGVyLm9uKCdjbGljaycsICcuYnRuLXNlbGVjdC1pbWFnZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBidG4gPSAkKHRoaXMpO1xyXG4gICAgICAgIGxldCBpbWFnZVVSTCA9IGJ0bi5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHdpbmRvdy5vcGVuZXIpIHtcclxuICAgICAgICAgICAgd2luZG93Lm9wZW5lci5vblNlbGVjdEltYWdlKGltYWdlVVJMKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgd3JhcHBlci5vbignY2xpY2snLCAnLmJ0bi1kZWxldGUtaW1hZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgJGltYWdlID0gJCh0aGlzKS5jbG9zZXN0KCcuaW1hZ2UnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGltYWdlPycpKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvaW1hZ2UvZGVsZXRlJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogJGltYWdlLmF0dHIoJ3RpdGxlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBNc2cuc3VjY2VzcygnRGVsZXRlZCEnKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnJlbG9hZEZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4kKCgpID0+IHtcclxuICAgIGluaXREcm9wem9uZSgpO1xyXG4gICAgaW5pdEltYWdlQWN0aW9ucygpO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==