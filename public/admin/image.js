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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2ltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9zdHlsZXMvaW1hZ2Uuc2NzcyJdLCJuYW1lcyI6WyJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJhYiIsIkFycmF5QnVmZmVyIiwibGVuZ3RoIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwidHlwZSIsIkRyb3B6b25lIiwiYXV0b0Rpc2NvdmVyIiwiaW5pdERyb3B6b25lIiwibXlEcm9wem9uZSIsInBhcmFtTmFtZSIsIm1heEZpbGVzaXplIiwiYWNjZXB0ZWRGaWxlcyIsImF1dG9Qcm9jZXNzUXVldWUiLCJkaWN0RGVmYXVsdE1lc3NhZ2UiLCJkaWN0RmlsZVRvb0JpZyIsImRpY3RJbnZhbGlkRmlsZVR5cGUiLCJvbiIsImZpbGUiLCJjcm9wcGVkIiwiY2FjaGVkRmlsZW5hbWUiLCJuYW1lIiwicmVtb3ZlRmlsZSIsIiRjcm9wcGVyTW9kYWwiLCIkIiwiJHVwbG9hZENyb3AiLCJmaW5kIiwiJGNhbmNlbENyb3AiLCJtb2RhbCIsImJhY2tkcm9wIiwia2V5Ym9hcmQiLCJlIiwibm90IiwicmVtb3ZlIiwiJGltZyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJodG1sIiwiYXR0ciIsInJlc3VsdCIsImNyb3BwZXIiLCJwcmV2aWV3Iiwidmlld01vZGUiLCJhc3BlY3RSYXRpbyIsIm1vdmFibGUiLCJjcm9wQm94UmVzaXphYmxlIiwiY3JvcCIsImV2ZW50IiwiJGNyb3BNb2RhbCIsInBhcmVudHMiLCIkY3JvcEJveFdpZHRoIiwiJGNyb3BCb3hIZWlnaHQiLCJjYldpZHRoIiwiTWF0aCIsInJvdW5kIiwid2lkdGgiLCJjYkhlaWdodCIsImhlaWdodCIsInRleHQiLCJyZWFkQXNEYXRhVVJMIiwiYmxvYiIsInRvRGF0YVVSTCIsIm5ld0ZpbGUiLCJhZGRGaWxlIiwicHJvY2Vzc1F1ZXVlIiwicmVsb2FkRnJhZ21lbnQiLCJ3aGVuQ29tcGxldGUiLCJpbml0RmFuY3lCb3giLCJpbml0SW1hZ2VBY3Rpb25zIiwid3JhcHBlciIsInByZXZlbnREZWZhdWx0IiwiYnRuIiwiaW1hZ2VVUkwiLCJ3aW5kb3ciLCJvcGVuZXIiLCJvblNlbGVjdEltYWdlIiwiYSIsInN3YWwiLCJ0aXRsZSIsInNob3dDYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uVGV4dCIsInNob3dMb2FkZXJPbkNvbmZpcm0iLCJwcmVDb25maXJtIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhamF4IiwidXJsIiwiZGF0YVR5cGUiLCJkYXRhIiwiZG9uZSIsInN0YXR1cyIsImFsbG93T3V0c2lkZUNsaWNrIiwidGhlbiIsInZhbHVlIiwiTXNnIiwic3VjY2VzcyIsImZhbmN5Ym94IiwicGFkZGluZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7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QXJCLENBQThCO0FBQzFCQyxXQUFPLEVBQUU7QUFEaUIsR0FBOUI7QUFHSCxDQUpEOztBQU1BMUUsQ0FBQyxDQUFDLFlBQU07QUFDSmhCLGNBQVk7QUFDWjZELGtCQUFnQjtBQUNoQkQsY0FBWTtBQUNmLENBSkEsQ0FBRCxDOzs7Ozs7Ozs7OztBQ2xLQSx1QyIsImZpbGUiOiJhZG1pbi9pbWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FkbWluL2ltYWdlLmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbWFnZS5zY3NzJztcclxuXHJcbmNvbnN0IGRhdGFVUkl0b0Jsb2IgPSAoZGF0YVVSSSkgPT4ge1xyXG4gICAgbGV0IGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XHJcbiAgICBsZXQgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xyXG4gICAgbGV0IGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWFbaV0gPSBieXRlU3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IEJsb2IoW2FiXSwge3R5cGU6ICdpbWFnZS9qcGVnJ30pO1xyXG59O1xyXG5cclxuRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gZmFsc2U7XHJcbmNvbnN0IGluaXREcm9wem9uZSA9ICgpID0+IHtcclxuICAgIGxldCBteURyb3B6b25lID0gbmV3IERyb3B6b25lKCcjaW1hZ2UtdXBsb2FkLXdpZGdldCcsIHtcclxuICAgICAgICBwYXJhbU5hbWU6ICdmaWxlJyxcclxuICAgICAgICBtYXhGaWxlc2l6ZTogMyxcclxuICAgICAgICBhY2NlcHRlZEZpbGVzOiAnaW1hZ2UvKicsXHJcbiAgICAgICAgYXV0b1Byb2Nlc3NRdWV1ZTogZmFsc2UsXHJcbiAgICAgICAgZGljdERlZmF1bHRNZXNzYWdlOiAnRHJhZyAmYW1wOyBkcm9wIG9yIGNsaWNrIHRvIGNob29zZSB1cGxvYWQgZmlsZScsXHJcbiAgICAgICAgZGljdEZpbGVUb29CaWc6ICdZb3VyIGZpbGUgaGFzIGV4Y2VlZGVkIHt7bWF4RmlsZXNpemV9fU1CJyxcclxuICAgICAgICBkaWN0SW52YWxpZEZpbGVUeXBlOiAnWW91ciBmaWxlIGlzIG5vdCBpbWFnZSdcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBteURyb3B6b25lLm9uKCd0aHVtYm5haWwnLCBmdW5jdGlvbiAoZmlsZSkge1xyXG4gICAgICAgIGlmIChmaWxlLmNyb3BwZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2FjaGVkRmlsZW5hbWUgPSBmaWxlLm5hbWU7XHJcbiAgICAgICAgbXlEcm9wem9uZS5yZW1vdmVGaWxlKGZpbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCAkY3JvcHBlck1vZGFsID0gJCgnI21vZGFsLWNyb3AnKTtcclxuICAgICAgICBsZXQgJHVwbG9hZENyb3AgPSAkY3JvcHBlck1vZGFsLmZpbmQoJy5jcm9wLXVwbG9hZCcpO1xyXG4gICAgICAgIGxldCAkY2FuY2VsQ3JvcCA9ICRjcm9wcGVyTW9kYWwuZmluZCgnLmNyb3AtY2FuY2VsJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNyb3BwZXJNb2RhbC5tb2RhbCh7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wOiAnc3RhdGljJyxcclxuICAgICAgICAgICAga2V5Ym9hcmQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGNyb3BwZXJNb2RhbC5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmICgkKCcubW9kYWwtYmFja2Ryb3AnKS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5ub3QoJzpmaXJzdCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgJGltZyA9ICQoJzxpbWcgY2xhc3M9XCJpbWctcmVzcG9uc2l2ZVwiIC8+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5maW5kKCcuaW1hZ2UtY29udGFpbmVyJykuaHRtbCgkaW1nKTtcclxuICAgICAgICAgICAgJGltZy5hdHRyKCdzcmMnLCByZWFkZXIucmVzdWx0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRpbWcuY3JvcHBlcih7XHJcbiAgICAgICAgICAgICAgICBwcmV2aWV3OiAnLmltYWdlLXByZXZpZXcnLFxyXG4gICAgICAgICAgICAgICAgdmlld01vZGU6IDMsXHJcbiAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogJycsXHJcbiAgICAgICAgICAgICAgICBtb3ZhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNyb3BCb3hSZXNpemFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjcm9wOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNyb3BNb2RhbCA9ICQodGhpcykucGFyZW50cygnLm1vZGFsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjcm9wQm94V2lkdGggPSAkY3JvcE1vZGFsLmZpbmQoJ3NwYW5bZGF0YS13aWR0aF0nKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGNyb3BCb3hIZWlnaHQgPSAkY3JvcE1vZGFsLmZpbmQoJ3NwYW5bZGF0YS1oZWlnaHRdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNiV2lkdGggPSBNYXRoLnJvdW5kKGV2ZW50LndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2JIZWlnaHQgPSBNYXRoLnJvdW5kKGV2ZW50LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNyb3BCb3hXaWR0aC5hdHRyKCdkYXRhLXdpZHRoJywgY2JXaWR0aCkudGV4dCgnV2lkdGg6ICcgKyBjYldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3JvcEJveEhlaWdodC5hdHRyKCdkYXRhLXdpZHRoJywgY2JIZWlnaHQpLnRleHQoJ0hlaWdodDogJyArIGNiSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICAgICBcclxuICAgICAgICAkdXBsb2FkQ3JvcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBibG9iID0gJGltZy5jcm9wcGVyKCdnZXRDcm9wcGVkQ2FudmFzJykudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdGaWxlID0gZGF0YVVSSXRvQmxvYihibG9iKTtcclxuICAgICAgICAgICAgbmV3RmlsZS5jcm9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmV3RmlsZS5uYW1lID0gY2FjaGVkRmlsZW5hbWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBteURyb3B6b25lLmFkZEZpbGUobmV3RmlsZSk7XHJcbiAgICAgICAgICAgIG15RHJvcHpvbmUucHJvY2Vzc1F1ZXVlKCk7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkY2FuY2VsQ3JvcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBteURyb3B6b25lLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gKGZpbGUpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnI2ltYWdlcy13cmFwcGVyJykucmVsb2FkRnJhZ21lbnQoe1xyXG4gICAgICAgICAgICB3aGVuQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGluaXRGYW5jeUJveCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGluaXRJbWFnZUFjdGlvbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gJCgnI2ltYWdlcy13cmFwcGVyJyk7XHJcbiAgICBcclxuICAgIHdyYXBwZXIub24oJ2NsaWNrJywgJy5idG4tc2VsZWN0LWltYWdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ0biA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGltYWdlVVJMID0gYnRuLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAod2luZG93Lm9wZW5lcikge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbmVyLm9uU2VsZWN0SW1hZ2UoaW1hZ2VVUkwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB3cmFwcGVyLm9uKCdjbGljaycsICcuYnRuLWRlbGV0ZS1pbWFnZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhID0gJCh0aGlzKTtcclxuICAgIFxyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGltYWdlPycsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnLFxyXG4gICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmVDb25maXJtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvaW1hZ2UvZGVsZXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBhLmF0dHIoJ2RhdGEtaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC52YWx1ZSAmJiB3cmFwcGVyLnJlbG9hZEZyYWdtZW50KHtcclxuICAgICAgICAgICAgICAgIHdoZW5Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIE1zZy5zdWNjZXNzKCdEZWxldGVkIScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgaW5pdEZhbmN5Qm94ID0gKCkgPT4ge1xyXG4gICAgJCgnLmJ0bi16b29tLWltYWdlJykuZmFuY3lib3goe1xyXG4gICAgICAgIHBhZGRpbmc6IDNcclxuICAgIH0pO1xyXG59O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgICBpbml0RHJvcHpvbmUoKTtcclxuICAgIGluaXRJbWFnZUFjdGlvbnMoKTtcclxuICAgIGluaXRGYW5jeUJveCgpO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==