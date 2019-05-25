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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2ltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9zdHlsZXMvaW1hZ2Uuc2NzcyJdLCJuYW1lcyI6WyJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsImJ5dGVTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJhYiIsIkFycmF5QnVmZmVyIiwibGVuZ3RoIiwiaWEiLCJVaW50OEFycmF5IiwiaSIsImNoYXJDb2RlQXQiLCJCbG9iIiwidHlwZSIsIkRyb3B6b25lIiwiYXV0b0Rpc2NvdmVyIiwiaW5pdERyb3B6b25lIiwibXlEcm9wem9uZSIsInBhcmFtTmFtZSIsIm1heEZpbGVzaXplIiwiYWNjZXB0ZWRGaWxlcyIsImF1dG9Qcm9jZXNzUXVldWUiLCJkaWN0RGVmYXVsdE1lc3NhZ2UiLCJkaWN0RmlsZVRvb0JpZyIsImRpY3RJbnZhbGlkRmlsZVR5cGUiLCJvbiIsImZpbGUiLCJjcm9wcGVkIiwiY2FjaGVkRmlsZW5hbWUiLCJuYW1lIiwicmVtb3ZlRmlsZSIsIiRjcm9wcGVyTW9kYWwiLCIkIiwiJHVwbG9hZENyb3AiLCJmaW5kIiwiJGNhbmNlbENyb3AiLCJtb2RhbCIsImJhY2tkcm9wIiwia2V5Ym9hcmQiLCJlIiwibm90IiwicmVtb3ZlIiwiJGltZyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWRlbmQiLCJodG1sIiwiYXR0ciIsInJlc3VsdCIsImNyb3BwZXIiLCJwcmV2aWV3Iiwidmlld01vZGUiLCJhc3BlY3RSYXRpbyIsIm1vdmFibGUiLCJjcm9wQm94UmVzaXphYmxlIiwiY3JvcCIsImV2ZW50IiwiJGNyb3BNb2RhbCIsInBhcmVudHMiLCIkY3JvcEJveFdpZHRoIiwiJGNyb3BCb3hIZWlnaHQiLCJjYldpZHRoIiwiTWF0aCIsInJvdW5kIiwiZGV0YWlsIiwid2lkdGgiLCJjYkhlaWdodCIsImhlaWdodCIsInRleHQiLCJyZWFkQXNEYXRhVVJMIiwiYmxvYiIsInRvRGF0YVVSTCIsIm5ld0ZpbGUiLCJhZGRGaWxlIiwicHJvY2Vzc1F1ZXVlIiwicmVsb2FkRnJhZ21lbnQiLCJ3aGVuQ29tcGxldGUiLCJpbml0RmFuY3lCb3giLCJpbml0SW1hZ2VBY3Rpb25zIiwid3JhcHBlciIsInByZXZlbnREZWZhdWx0IiwiYnRuIiwiaW1hZ2VVUkwiLCJ3aW5kb3ciLCJvcGVuZXIiLCJvblNlbGVjdEltYWdlIiwiYSIsInN3YWwiLCJ0aXRsZSIsInNob3dDYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uVGV4dCIsInNob3dMb2FkZXJPbkNvbmZpcm0iLCJwcmVDb25maXJtIiwiUHJvbWlzZSIsInJlc29sdmUiLCJhamF4IiwidXJsIiwiZGF0YVR5cGUiLCJkYXRhIiwiZG9uZSIsInN0YXR1cyIsImFsbG93T3V0c2lkZUNsaWNrIiwidGhlbiIsInZhbHVlIiwiTXNnIiwic3VjY2VzcyIsImZhbmN5Ym94IiwicGFkZGluZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUEr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R0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUIwRSxRQUFyQixDQUE4QjtBQUMxQkMsV0FBTyxFQUFFO0FBRGlCLEdBQTlCO0FBR0gsQ0FKRDs7QUFNQTNFLENBQUMsQ0FBQyxZQUFNO0FBQ0poQixjQUFZO0FBQ1o4RCxrQkFBZ0I7QUFDaEJELGNBQVk7QUFDZixDQUpBLENBQUQsQzs7Ozs7Ozs7Ozs7QUNsS0EsdUMiLCJmaWxlIjoiYWRtaW4vaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hZG1pbi9pbWFnZS5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW1hZ2Uuc2Nzcyc7XHJcblxyXG5jb25zdCBkYXRhVVJJdG9CbG9iID0gKGRhdGFVUkkpID0+IHtcclxuICAgIGxldCBieXRlU3RyaW5nID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xyXG4gICAgbGV0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcclxuICAgIGxldCBpYSA9IG5ldyBVaW50OEFycmF5KGFiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHt0eXBlOiAnaW1hZ2UvanBlZyd9KTtcclxufTtcclxuXHJcbkRyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlO1xyXG5jb25zdCBpbml0RHJvcHpvbmUgPSAoKSA9PiB7XHJcbiAgICBsZXQgbXlEcm9wem9uZSA9IG5ldyBEcm9wem9uZSgnI2ltYWdlLXVwbG9hZC13aWRnZXQnLCB7XHJcbiAgICAgICAgcGFyYW1OYW1lOiAnZmlsZScsXHJcbiAgICAgICAgbWF4RmlsZXNpemU6IDMsXHJcbiAgICAgICAgYWNjZXB0ZWRGaWxlczogJ2ltYWdlLyonLFxyXG4gICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IGZhbHNlLFxyXG4gICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJ0RyYWcgJmFtcDsgZHJvcCBvciBjbGljayB0byBjaG9vc2UgdXBsb2FkIGZpbGUnLFxyXG4gICAgICAgIGRpY3RGaWxlVG9vQmlnOiAnWW91ciBmaWxlIGhhcyBleGNlZWRlZCB7e21heEZpbGVzaXplfX1NQicsXHJcbiAgICAgICAgZGljdEludmFsaWRGaWxlVHlwZTogJ1lvdXIgZmlsZSBpcyBub3QgaW1hZ2UnXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbXlEcm9wem9uZS5vbigndGh1bWJuYWlsJywgZnVuY3Rpb24gKGZpbGUpIHtcclxuICAgICAgICBpZiAoZmlsZS5jcm9wcGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNhY2hlZEZpbGVuYW1lID0gZmlsZS5uYW1lO1xyXG4gICAgICAgIG15RHJvcHpvbmUucmVtb3ZlRmlsZShmaWxlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgJGNyb3BwZXJNb2RhbCA9ICQoJyNtb2RhbC1jcm9wJyk7XHJcbiAgICAgICAgbGV0ICR1cGxvYWRDcm9wID0gJGNyb3BwZXJNb2RhbC5maW5kKCcuY3JvcC11cGxvYWQnKTtcclxuICAgICAgICBsZXQgJGNhbmNlbENyb3AgPSAkY3JvcHBlck1vZGFsLmZpbmQoJy5jcm9wLWNhbmNlbCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRjcm9wcGVyTW9kYWwubW9kYWwoe1xyXG4gICAgICAgICAgICBiYWNrZHJvcDogJ3N0YXRpYycsXHJcbiAgICAgICAgICAgIGtleWJvYXJkOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRjcm9wcGVyTW9kYWwub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoJCgnLm1vZGFsLWJhY2tkcm9wJykubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLm1vZGFsLWJhY2tkcm9wJykubm90KCc6Zmlyc3QnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0ICRpbWcgPSAkKCc8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmVcIiAvPicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwuZmluZCgnLmltYWdlLWNvbnRhaW5lcicpLmh0bWwoJGltZyk7XHJcbiAgICAgICAgICAgICRpbWcuYXR0cignc3JjJywgcmVhZGVyLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkaW1nLmNyb3BwZXIoe1xyXG4gICAgICAgICAgICAgICAgcHJldmlldzogJy5pbWFnZS1wcmV2aWV3JyxcclxuICAgICAgICAgICAgICAgIHZpZXdNb2RlOiAzLFxyXG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86ICcnLFxyXG4gICAgICAgICAgICAgICAgbW92YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjcm9wQm94UmVzaXphYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3JvcDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjcm9wTW9kYWwgPSAkKHRoaXMpLnBhcmVudHMoJy5tb2RhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkY3JvcEJveFdpZHRoID0gJGNyb3BNb2RhbC5maW5kKCdzcGFuW2RhdGEtd2lkdGhdJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRjcm9wQm94SGVpZ2h0ID0gJGNyb3BNb2RhbC5maW5kKCdzcGFuW2RhdGEtaGVpZ2h0XScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYldpZHRoID0gTWF0aC5yb3VuZChldmVudC5kZXRhaWwud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYkhlaWdodCA9IE1hdGgucm91bmQoZXZlbnQuZGV0YWlsLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNyb3BCb3hXaWR0aC5hdHRyKCdkYXRhLXdpZHRoJywgY2JXaWR0aCkudGV4dCgnV2lkdGg6ICcgKyBjYldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAkY3JvcEJveEhlaWdodC5hdHRyKCdkYXRhLXdpZHRoJywgY2JIZWlnaHQpLnRleHQoJ0hlaWdodDogJyArIGNiSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgICAgICBcclxuICAgICAgICAkdXBsb2FkQ3JvcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBibG9iID0gJGltZy5jcm9wcGVyKCdnZXRDcm9wcGVkQ2FudmFzJykudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdGaWxlID0gZGF0YVVSSXRvQmxvYihibG9iKTtcclxuICAgICAgICAgICAgbmV3RmlsZS5jcm9wcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmV3RmlsZS5uYW1lID0gY2FjaGVkRmlsZW5hbWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBteURyb3B6b25lLmFkZEZpbGUobmV3RmlsZSk7XHJcbiAgICAgICAgICAgIG15RHJvcHpvbmUucHJvY2Vzc1F1ZXVlKCk7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkY2FuY2VsQ3JvcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRjcm9wcGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJGNyb3BwZXJNb2RhbC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBteURyb3B6b25lLm9uKCdzdWNjZXNzJywgZnVuY3Rpb24gKGZpbGUpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUZpbGUoZmlsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnI2ltYWdlcy13cmFwcGVyJykucmVsb2FkRnJhZ21lbnQoe1xyXG4gICAgICAgICAgICB3aGVuQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGluaXRGYW5jeUJveCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGluaXRJbWFnZUFjdGlvbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gJCgnI2ltYWdlcy13cmFwcGVyJyk7XHJcbiAgICBcclxuICAgIHdyYXBwZXIub24oJ2NsaWNrJywgJy5idG4tc2VsZWN0LWltYWdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ0biA9ICQodGhpcyk7XHJcbiAgICAgICAgbGV0IGltYWdlVVJMID0gYnRuLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAod2luZG93Lm9wZW5lcikge1xyXG4gICAgICAgICAgICB3aW5kb3cub3BlbmVyLm9uU2VsZWN0SW1hZ2UoaW1hZ2VVUkwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB3cmFwcGVyLm9uKCdjbGljaycsICcuYnRuLWRlbGV0ZS1pbWFnZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhID0gJCh0aGlzKTtcclxuICAgIFxyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGltYWdlPycsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdZZXMsIGRlbGV0ZSBpdCEnLFxyXG4gICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmVDb25maXJtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcvaW1hZ2UvZGVsZXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiBhLmF0dHIoJ2RhdGEtaW1hZ2UnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC52YWx1ZSAmJiB3cmFwcGVyLnJlbG9hZEZyYWdtZW50KHtcclxuICAgICAgICAgICAgICAgIHdoZW5Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIE1zZy5zdWNjZXNzKCdEZWxldGVkIScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgaW5pdEZhbmN5Qm94ID0gKCkgPT4ge1xyXG4gICAgJCgnLmJ0bi16b29tLWltYWdlJykuZmFuY3lib3goe1xyXG4gICAgICAgIHBhZGRpbmc6IDNcclxuICAgIH0pO1xyXG59O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgICBpbml0RHJvcHpvbmUoKTtcclxuICAgIGluaXRJbWFnZUFjdGlvbnMoKTtcclxuICAgIGluaXRGYW5jeUJveCgpO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==