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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/admin/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/admin/admin.js":
/*!****************************!*\
  !*** ./src/admin/admin.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/admin.scss */ "./src/admin/styles/admin.scss");
/* harmony import */ var _styles_admin_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_admin_scss__WEBPACK_IMPORTED_MODULE_0__);


var _showErrorField = function _showErrorField(form, field, message) {
  var formGroup = field.closest('.form-group');
  field.addClass('is-invalid');
  formGroup.addClass('has-error');
  var errorMessageEl = formGroup.find('.nf-error-message');

  if (errorMessageEl.length === 0) {
    errorMessageEl = $("<div class=\"nf-error-message text-danger form-text small\" style=\"display: none;\"></div>");
    field.after(errorMessageEl);
  }

  errorMessageEl.html(message);
  form.niceform('showElement', errorMessageEl);
};

var setCustomDefaults = function setCustomDefaults() {
  swal.setDefaults({
    buttonsStyling: false,
    confirmButtonClass: 'btn btn-primary',
    cancelButtonClass: 'btn btn-light'
  });
  Msg.extraClass = 'alert-styled-left alert-dismissible';
  Msg.iconEnabled = false;

  NiceForm.DEFAULTS.showError = function (form, errorFields, options) {
    errorFields.forEach(function (field) {
      _showErrorField(form, field, field.attr('data-error-message'));
    });
  };

  NiceForm.DEFAULTS.onAjaxError = function (jqXhr, form, options) {
    if (jqXhr.responseJSON) {
      Msg.error(jqXhr.responseJSON.message || options.locale.unknownErrorMessage);
      jqXhr.responseJSON.errorFields && jqXhr.responseJSON.errorFields.forEach(function (error) {
        _showErrorField(form, form.find("[name=\"".concat(error.name, "\"]")), error.message);
      });
    } else {
      Msg.error(options.locale.unknownErrorMessage);
    }
  };

  NiceForm.DEFAULTS.onAjaxSuccess = function (resp, form, options) {
    Msg.success(resp.message || options.locale.successMessage);
  };
};

var initSidebar = function initSidebar() {
  $('.sidebar-fixed .sidebar-content').length > 0 && new PerfectScrollbar('.sidebar-fixed .sidebar-content', {
    wheelSpeed: 2,
    wheelPropagation: true
  });
};

var initTableList = function initTableList() {
  var table = $('.table-list');

  if (table.length > 0) {
    table.on('click', '.btn-delete', function (e) {
      e.preventDefault();
      var a = $(this);
      swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this record?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm() {
          return new Promise(function (resolve) {
            $.ajax({
              url: a.attr('href'),
              dataType: 'json',
              type: 'post',
              success: function success() {
                resolve();
              },
              error: function error() {
                Msg.error('Error!');
              }
            });
          });
        },
        allowOutsideClick: false
      }).then(function (result) {
        result.value && $('#table-list-content').reloadFragment({
          whenComplete: function whenComplete() {
            Msg.success('Deleted!');
          }
        });
      });
    });
  }
};

var initFormDetails = function initFormDetails() {
  var form = $('.form-details');

  if (form.length > 0) {
    form.niceform({
      onSuccess: function onSuccess() {
        Msg.success('Saved!');
      }
    });
    var trigger = $('[data-trigger=form-submit]');

    if (trigger.length > 0) {
      trigger.on('click', function (e) {
        e.preventDefault();
        form.trigger('submit');
      });
    }
  }
};

var initToggler = function initToggler() {
  $('.toggler').each(function () {
    new Switchery(this);
  });
};

$(function () {
  setCustomDefaults();
  initSidebar();
  initTableList();
  initFormDetails();
  initToggler();
}); // (function ($, window) {
//     Dropzone.autoDiscover = false;
//
//     var initICheck = function () {
//         var inputs = $('[type=checkbox], [type=radio]').not('.toggler');
//
//         if (inputs.length > 0) {
//             inputs.iCheck({
//                 checkboxClass: 'icheckbox_flat-green',
//                 radioClass: 'iradio_flat-green'
//             });
//         }
//     };
//
//     var initDatePicker = function () {
//         $('.date-picker').each(function () {
//             var picker = $(this);
//             picker.datetimepicker({
//                 locale: 'en',
//                 format: 'L'
//             });
//         });
//     };
//
//     var initDateTimerPicker = function () {
//         $('.datetime-picker').each(function () {
//             var picker = $(this);
//             picker.datetimepicker({
//                 locale: 'en'
//             });
//         });
//     };
//
//     var initDateRangePicker = function () {
//         $('.date-range-picker').each(function () {
//             var wrapper = $(this);
//             var txtStart = wrapper.find('[name=startDate]');
//             var startDate = txtStart.val() || null;
//             var txtEnd = wrapper.find('[name=endDate]');
//             var endDate = txtEnd.val() || null;
//             var placeholder = $('<input type="text" class="form-control required" />');
//
//             var options = {
//                 locale: {
//                     format: 'DD/MM/YYYY'
//                 }
//             };
//
//             if (startDate && endDate) {
//                 options.startDate = startDate;
//                 options.endDate = endDate;
//             }
//
//             wrapper.append(placeholder);
//             placeholder.daterangepicker(options, function (start, end, label) {
//                 txtStart.val(start.format('DD/MM/YYYY'));
//                 txtEnd.val(end.format('DD/MM/YYYY'));
//             });
//
//             if (!(startDate && endDate)) {
//                 placeholder.val('');
//             }
//         });
//     };
//
//     var initSelect2 = function () {
//         $('select').each(function () {
//             var select = $(this);
//             var isCustomContent = select.find('[data-html]').length > 0;
//
//             select.addClass('select2');
//             select.select2({
//                 escapeMarkup: function (markup) {
//                     return markup;
//                 },
//                 templateResult: function (data) {
//                     return isCustomContent ? data.element ? data.element.getAttribute('data-html') : data.text : data.text;
//                 },
//                 templateSelection: function (data) {
//                     return isCustomContent ? data.element.getAttribute('data-html') : data.text;
//                 }
//             });
//         });
//     };
//

/***/ }),

/***/ "./src/admin/styles/admin.scss":
/*!*************************************!*\
  !*** ./src/admin/styles/admin.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FkbWluL2FkbWluLmpzIiwid2VicGFjazovLy8uL3NyYy9hZG1pbi9zdHlsZXMvYWRtaW4uc2Nzcz8yYjlhIl0sIm5hbWVzIjpbIl9zaG93RXJyb3JGaWVsZCIsImZvcm0iLCJmaWVsZCIsIm1lc3NhZ2UiLCJmb3JtR3JvdXAiLCJjbG9zZXN0IiwiYWRkQ2xhc3MiLCJlcnJvck1lc3NhZ2VFbCIsImZpbmQiLCJsZW5ndGgiLCIkIiwiYWZ0ZXIiLCJodG1sIiwibmljZWZvcm0iLCJzZXRDdXN0b21EZWZhdWx0cyIsInN3YWwiLCJzZXREZWZhdWx0cyIsImJ1dHRvbnNTdHlsaW5nIiwiY29uZmlybUJ1dHRvbkNsYXNzIiwiY2FuY2VsQnV0dG9uQ2xhc3MiLCJNc2ciLCJleHRyYUNsYXNzIiwiaWNvbkVuYWJsZWQiLCJOaWNlRm9ybSIsIkRFRkFVTFRTIiwic2hvd0Vycm9yIiwiZXJyb3JGaWVsZHMiLCJvcHRpb25zIiwiZm9yRWFjaCIsImF0dHIiLCJvbkFqYXhFcnJvciIsImpxWGhyIiwicmVzcG9uc2VKU09OIiwiZXJyb3IiLCJsb2NhbGUiLCJ1bmtub3duRXJyb3JNZXNzYWdlIiwibmFtZSIsIm9uQWpheFN1Y2Nlc3MiLCJyZXNwIiwic3VjY2VzcyIsInN1Y2Nlc3NNZXNzYWdlIiwiaW5pdFNpZGViYXIiLCJQZXJmZWN0U2Nyb2xsYmFyIiwid2hlZWxTcGVlZCIsIndoZWVsUHJvcGFnYXRpb24iLCJpbml0VGFibGVMaXN0IiwidGFibGUiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImEiLCJ0aXRsZSIsInRleHQiLCJ0eXBlIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25UZXh0Iiwic2hvd0xvYWRlck9uQ29uZmlybSIsInByZUNvbmZpcm0iLCJQcm9taXNlIiwicmVzb2x2ZSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImFsbG93T3V0c2lkZUNsaWNrIiwidGhlbiIsInJlc3VsdCIsInZhbHVlIiwicmVsb2FkRnJhZ21lbnQiLCJ3aGVuQ29tcGxldGUiLCJpbml0Rm9ybURldGFpbHMiLCJvblN1Y2Nlc3MiLCJ0cmlnZ2VyIiwiaW5pdFRvZ2dsZXIiLCJlYWNoIiwiU3dpdGNoZXJ5Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBOztBQUVBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWNDLE9BQWQsRUFBMEI7QUFDOUMsTUFBSUMsU0FBUyxHQUFHRixLQUFLLENBQUNHLE9BQU4sQ0FBYyxhQUFkLENBQWhCO0FBRUFILE9BQUssQ0FBQ0ksUUFBTixDQUFlLFlBQWY7QUFDQUYsV0FBUyxDQUFDRSxRQUFWLENBQW1CLFdBQW5CO0FBRUEsTUFBSUMsY0FBYyxHQUFHSCxTQUFTLENBQUNJLElBQVYsQ0FBZSxtQkFB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDM05BLHVDIiwiZmlsZSI6ImFkbWluL2FkbWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYWRtaW4vYWRtaW4uanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2FkbWluLnNjc3MnO1xyXG5cclxuY29uc3QgX3Nob3dFcnJvckZpZWxkID0gKGZvcm0sIGZpZWxkLCBtZXNzYWdlKSA9PiB7XHJcbiAgICBsZXQgZm9ybUdyb3VwID0gZmllbGQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKTtcclxuICAgIFxyXG4gICAgZmllbGQuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKTtcclxuICAgIGZvcm1Hcm91cC5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgICBcclxuICAgIGxldCBlcnJvck1lc3NhZ2VFbCA9IGZvcm1Hcm91cC5maW5kKCcubmYtZXJyb3ItbWVzc2FnZScpO1xyXG4gICAgaWYgKGVycm9yTWVzc2FnZUVsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGVycm9yTWVzc2FnZUVsID0gJChgPGRpdiBjbGFzcz1cIm5mLWVycm9yLW1lc3NhZ2UgdGV4dC1kYW5nZXIgZm9ybS10ZXh0IHNtYWxsXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvZGl2PmApO1xyXG4gICAgICAgIGZpZWxkLmFmdGVyKGVycm9yTWVzc2FnZUVsKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXJyb3JNZXNzYWdlRWwuaHRtbChtZXNzYWdlKTtcclxuICAgIGZvcm0ubmljZWZvcm0oJ3Nob3dFbGVtZW50JywgZXJyb3JNZXNzYWdlRWwpO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0Q3VzdG9tRGVmYXVsdHMgPSAoKSA9PiB7XHJcbiAgICBzd2FsLnNldERlZmF1bHRzKHtcclxuICAgICAgICBidXR0b25zU3R5bGluZzogZmFsc2UsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5JyxcclxuICAgICAgICBjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG4tbGlnaHQnXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgTXNnLmV4dHJhQ2xhc3MgPSAnYWxlcnQtc3R5bGVkLWxlZnQgYWxlcnQtZGlzbWlzc2libGUnO1xyXG4gICAgTXNnLmljb25FbmFibGVkID0gZmFsc2U7XHJcbiAgICBcclxuICAgIE5pY2VGb3JtLkRFRkFVTFRTLnNob3dFcnJvciA9IChmb3JtLCBlcnJvckZpZWxkcywgb3B0aW9ucykgPT4ge1xyXG4gICAgICAgIGVycm9yRmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgICAgICAgIF9zaG93RXJyb3JGaWVsZChmb3JtLCBmaWVsZCwgZmllbGQuYXR0cignZGF0YS1lcnJvci1tZXNzYWdlJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgTmljZUZvcm0uREVGQVVMVFMub25BamF4RXJyb3IgPSAoanFYaHIsIGZvcm0sIG9wdGlvbnMpID0+IHtcclxuICAgICAgICBpZiAoanFYaHIucmVzcG9uc2VKU09OKSB7XHJcbiAgICAgICAgICAgIE1zZy5lcnJvcihqcVhoci5yZXNwb25zZUpTT04ubWVzc2FnZSB8fCBvcHRpb25zLmxvY2FsZS51bmtub3duRXJyb3JNZXNzYWdlKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAganFYaHIucmVzcG9uc2VKU09OLmVycm9yRmllbGRzICYmIGpxWGhyLnJlc3BvbnNlSlNPTi5lcnJvckZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgX3Nob3dFcnJvckZpZWxkKGZvcm0sIGZvcm0uZmluZChgW25hbWU9XCIke2Vycm9yLm5hbWV9XCJdYCksIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBNc2cuZXJyb3Iob3B0aW9ucy5sb2NhbGUudW5rbm93bkVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgTmljZUZvcm0uREVGQVVMVFMub25BamF4U3VjY2VzcyA9IChyZXNwLCBmb3JtLCBvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgTXNnLnN1Y2Nlc3MocmVzcC5tZXNzYWdlIHx8IG9wdGlvbnMubG9jYWxlLnN1Y2Nlc3NNZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICBcclxufTtcclxuXHJcbmNvbnN0IGluaXRTaWRlYmFyID0gKCkgPT4ge1xyXG4gICAgJCgnLnNpZGViYXItZml4ZWQgLnNpZGViYXItY29udGVudCcpLmxlbmd0aCA+IDAgJiYgbmV3IFBlcmZlY3RTY3JvbGxiYXIoJy5zaWRlYmFyLWZpeGVkIC5zaWRlYmFyLWNvbnRlbnQnLCB7XHJcbiAgICAgICAgd2hlZWxTcGVlZDogMixcclxuICAgICAgICB3aGVlbFByb3BhZ2F0aW9uOiB0cnVlXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGluaXRUYWJsZUxpc3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YWJsZSA9ICQoJy50YWJsZS1saXN0Jyk7XHJcbiAgICBpZiAodGFibGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRhYmxlLm9uKCdjbGljaycsICcuYnRuLWRlbGV0ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyByZWNvcmQ/JyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ1llcywgZGVsZXRlIGl0IScsXHJcbiAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJlQ29uZmlybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBhLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXNnLmVycm9yKCdFcnJvciEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWxsb3dPdXRzaWRlQ2xpY2s6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnZhbHVlICYmICQoJyN0YWJsZS1saXN0LWNvbnRlbnQnKS5yZWxvYWRGcmFnbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hlbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1zZy5zdWNjZXNzKCdEZWxldGVkIScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGluaXRGb3JtRGV0YWlscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSAkKCcuZm9ybS1kZXRhaWxzJyk7XHJcbiAgICBpZiAoZm9ybS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9ybS5uaWNlZm9ybSh7XHJcbiAgICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgTXNnLnN1Y2Nlc3MoJ1NhdmVkIScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9ICQoJ1tkYXRhLXRyaWdnZXI9Zm9ybS1zdWJtaXRdJyk7XHJcbiAgICAgICAgaWYgKHRyaWdnZXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZvcm0udHJpZ2dlcignc3VibWl0Jyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgaW5pdFRvZ2dsZXIgPSAoKSA9PiB7XHJcbiAgICAkKCcudG9nZ2xlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG5ldyBTd2l0Y2hlcnkodGhpcyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbiQoKCkgPT4ge1xyXG4gICAgc2V0Q3VzdG9tRGVmYXVsdHMoKTtcclxuICAgIGluaXRTaWRlYmFyKCk7XHJcbiAgICBpbml0VGFibGVMaXN0KCk7XHJcbiAgICBpbml0Rm9ybURldGFpbHMoKTtcclxuICAgIGluaXRUb2dnbGVyKCk7XHJcbn0pO1xyXG5cclxuLy8gKGZ1bmN0aW9uICgkLCB3aW5kb3cpIHtcclxuLy8gICAgIERyb3B6b25lLmF1dG9EaXNjb3ZlciA9IGZhbHNlO1xyXG4vL1xyXG4vLyAgICAgdmFyIGluaXRJQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgdmFyIGlucHV0cyA9ICQoJ1t0eXBlPWNoZWNrYm94XSwgW3R5cGU9cmFkaW9dJykubm90KCcudG9nZ2xlcicpO1xyXG4vL1xyXG4vLyAgICAgICAgIGlmIChpbnB1dHMubGVuZ3RoID4gMCkge1xyXG4vLyAgICAgICAgICAgICBpbnB1dHMuaUNoZWNrKHtcclxuLy8gICAgICAgICAgICAgICAgIGNoZWNrYm94Q2xhc3M6ICdpY2hlY2tib3hfZmxhdC1ncmVlbicsXHJcbi8vICAgICAgICAgICAgICAgICByYWRpb0NsYXNzOiAnaXJhZGlvX2ZsYXQtZ3JlZW4nXHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH07XHJcbi8vXHJcbi8vICAgICB2YXIgaW5pdERhdGVQaWNrZXIgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgJCgnLmRhdGUtcGlja2VyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBwaWNrZXIgPSAkKHRoaXMpO1xyXG4vLyAgICAgICAgICAgICBwaWNrZXIuZGF0ZXRpbWVwaWNrZXIoe1xyXG4vLyAgICAgICAgICAgICAgICAgbG9jYWxlOiAnZW4nLFxyXG4vLyAgICAgICAgICAgICAgICAgZm9ybWF0OiAnTCdcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9O1xyXG4vL1xyXG4vLyAgICAgdmFyIGluaXREYXRlVGltZXJQaWNrZXIgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgJCgnLmRhdGV0aW1lLXBpY2tlcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgICAgICAgICB2YXIgcGlja2VyID0gJCh0aGlzKTtcclxuLy8gICAgICAgICAgICAgcGlja2VyLmRhdGV0aW1lcGlja2VyKHtcclxuLy8gICAgICAgICAgICAgICAgIGxvY2FsZTogJ2VuJ1xyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH07XHJcbi8vXHJcbi8vICAgICB2YXIgaW5pdERhdGVSYW5nZVBpY2tlciA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAkKCcuZGF0ZS1yYW5nZS1waWNrZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSAkKHRoaXMpO1xyXG4vLyAgICAgICAgICAgICB2YXIgdHh0U3RhcnQgPSB3cmFwcGVyLmZpbmQoJ1tuYW1lPXN0YXJ0RGF0ZV0nKTtcclxuLy8gICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IHR4dFN0YXJ0LnZhbCgpIHx8IG51bGw7XHJcbi8vICAgICAgICAgICAgIHZhciB0eHRFbmQgPSB3cmFwcGVyLmZpbmQoJ1tuYW1lPWVuZERhdGVdJyk7XHJcbi8vICAgICAgICAgICAgIHZhciBlbmREYXRlID0gdHh0RW5kLnZhbCgpIHx8IG51bGw7XHJcbi8vICAgICAgICAgICAgIHZhciBwbGFjZWhvbGRlciA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHJlcXVpcmVkXCIgLz4nKTtcclxuLy9cclxuLy8gICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbi8vICAgICAgICAgICAgICAgICBsb2NhbGU6IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdERC9NTS9ZWVlZJ1xyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9O1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcclxuLy8gICAgICAgICAgICAgICAgIG9wdGlvbnMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4vLyAgICAgICAgICAgICAgICAgb3B0aW9ucy5lbmREYXRlID0gZW5kRGF0ZTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vL1xyXG4vLyAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZChwbGFjZWhvbGRlcik7XHJcbi8vICAgICAgICAgICAgIHBsYWNlaG9sZGVyLmRhdGVyYW5nZXBpY2tlcihvcHRpb25zLCBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgbGFiZWwpIHtcclxuLy8gICAgICAgICAgICAgICAgIHR4dFN0YXJ0LnZhbChzdGFydC5mb3JtYXQoJ0REL01NL1lZWVknKSk7XHJcbi8vICAgICAgICAgICAgICAgICB0eHRFbmQudmFsKGVuZC5mb3JtYXQoJ0REL01NL1lZWVknKSk7XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgICAgICAgICBpZiAoIShzdGFydERhdGUgJiYgZW5kRGF0ZSkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyLnZhbCgnJyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH07XHJcbi8vXHJcbi8vICAgICB2YXIgaW5pdFNlbGVjdDIgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBzZWxlY3QgPSAkKHRoaXMpO1xyXG4vLyAgICAgICAgICAgICB2YXIgaXNDdXN0b21Db250ZW50ID0gc2VsZWN0LmZpbmQoJ1tkYXRhLWh0bWxdJykubGVuZ3RoID4gMDtcclxuLy9cclxuLy8gICAgICAgICAgICAgc2VsZWN0LmFkZENsYXNzKCdzZWxlY3QyJyk7XHJcbi8vICAgICAgICAgICAgIHNlbGVjdC5zZWxlY3QyKHtcclxuLy8gICAgICAgICAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24gKG1hcmt1cCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXJrdXA7XHJcbi8vICAgICAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzQ3VzdG9tQ29udGVudCA/IGRhdGEuZWxlbWVudCA/IGRhdGEuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHRtbCcpIDogZGF0YS50ZXh0IDogZGF0YS50ZXh0O1xyXG4vLyAgICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0N1c3RvbUNvbnRlbnQgPyBkYXRhLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWh0bWwnKSA6IGRhdGEudGV4dDtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9O1xyXG4vL1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9