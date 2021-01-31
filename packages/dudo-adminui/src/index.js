// Fonts
// -----------------------------------------------
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';

// jQuery
// -----------------------------------------------
import $ from 'jquery';
window.jQuery = window.$ = $;

// Moment
// -----------------------------------------------
import moment from 'moment';
window.moment = moment;

// Bootstrap
// -----------------------------------------------
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min';

// OverlayScrollbars
// -----------------------------------------------
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min';

// Import SweetAlert2
// -----------------------------------------------
import Swal from 'sweetalert2';
window.Swal = Swal;
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';

// ICheck
// -----------------------------------------------
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css';

// Dropzone
// -----------------------------------------------
import Dropzone from 'dropzone/dist/min/dropzone-amd-module.min';
Dropzone.autoDiscover = false;
window.Dropzone = Dropzone;
import 'dropzone/dist/dropzone.css';


// AdminLTE
// -----------------------------------------------
import 'admin-lte/dist/js/adminlte.min';
import 'admin-lte/dist/css/adminlte.min.css';

// Common scripts
// -----------------------------------------------
import initToggler from './initToggler';
import initMsg from './initMsg';
import initForm from './initForm';
import initBtnLoading from './initBtnLoading';
import initBtnReload from './initBtnReload';
import initPreviewableImage from './initPreviewableImage';
import initDateTimerPicker from './initDateTimerPicker';
import initDateRangePicker from './initDateRangePicker';
import initCardList from './initRecordList';
import initICheck from './initICheck';
import initSelect2 from './initSelect2';
import initFilePicker from './initFilePicker';
import initCKEditor from './initCKEditor';
import initCopyClipboard from './initCopyClipboard';
import initDropzoneUploader from './initDropzoneUploader';
import initImageUploader from './initImageUploader';
import initLightBox from './initLightBox';
import initChkAll from './initChkAll';

// Common style
// -----------------------------------------------
import './admin.scss';

// Reload if needed
// -----------------------------------------------
$(document).ajaxComplete(function (e, xhr) {
    const { responseJSON } = xhr;
    if (responseJSON && responseJSON.status && responseJSON.data.reload) {
        window.location.reload();
    }
});

$(() => {
    initMsg();
    initToggler();
    initForm();
    initCardList();
    initBtnLoading();
    initBtnReload();
    initPreviewableImage();
    initDateTimerPicker();
    initDateRangePicker();
    initICheck();
    initSelect2();
    initFilePicker();
    initCKEditor();
    initCopyClipboard();
    initDropzoneUploader();
    initImageUploader();
    initLightBox();
    initChkAll();
});
