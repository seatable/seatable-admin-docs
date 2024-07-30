function update_css_color(version) {
  var color = document.getElementById("seatable_custom_color").value;
  console.log(
    "Let me update the color in the css code to " +
      color +
      " for version " +
      version
  );
  var divElement = document.getElementById("seatable_custom_color_output");
  var codeElement = divElement.querySelector("code");

  if (version === "v5.0") {
    var css_input = `.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container,.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container:hover{border-color:##maincolor##}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-name{color:##maincolor##}
.add-workflow-task-dialog .add-workflow-task-body .submit-workflow.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.app-folder-tree .app-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.app-icon-settings-popover-nav .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-map-dialog-cn .dtable-app-column-setting-item-title .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer;font-weight:450}
.app-select-page-item-popover .popover .app-select-page-item-popover-image-container{border:2px solid ##maincolor##;border-radius:3px;overflow:hidden}
.app-settings-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-settings-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.automatic-action-addition-toggle{color:##maincolor##;cursor:pointer}
.badge-primary{color:#fff;background-color:##maincolor##}
.batch-popover .batch-popover-footer .replace-search-item{background:##maincolor##;border:1px solid #e4e4e4;color:#fff}
.bg-primary{background-color:##maincolor## !important}
.big-data-import-process .am-progress-bar{background-color:##maincolor##;border:none;border-radius:5px;height:10px!important}
.border-primary{border-color:##maincolor## !important}
.btn-link{font-weight:400;color:##maincolor##;text-decoration:none}
.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:##maincolor##;background-color:transparent}
.btn-outline-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active,.btn-outline-primary:not(:disabled):not(.disabled).active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary{color:##maincolor##;border-color:##maincolor##}
.btn-outline-universal-01.disabled,.btn-outline-universal-01:disabled{background-color:initial;color:##maincolor##}
.btn-outline-universal-01.focus,.btn-outline-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active,.btn-outline-universal-01:not(:disabled):not(.disabled):active,.show>.btn-outline-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active:focus,.btn-outline-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01{background-color:initial;background-image:none;border-color:##maincolor##;color:##maincolor##}
.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:focus,.btn-primary.focus{color:#fff;background-color:##maincolor##;border-color:##maincolor##;box-shadow:0 0 0 2px rgba(255,147,38,.5)}
.btn-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01.disabled,.btn-universal-01:disabled{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01.focus,.btn-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active,.btn-universal-01:not(:disabled):not(.disabled):active,.show>.btn-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active:focus,.btn-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#444;cursor:pointer}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#444;cursor:default}
.chat-message:after{content:"";position:absolute;right:-5px;top:7px;border-bottom:6px solid transparent;border-left:6px solid ##maincolor##;border-top:6px solid transparent}
.chat-message{position:relative;display:inline-block;background-color:##maincolor##;color:#fff;font-size:.875rem;padding:.375rem .5rem;border-radius:3px;white-space:normal;text-align:left;margin:0 .5rem 0 2.5rem;line-height:1.4}
.color-setting-dialog .rule-color-container .color-setting-add-color{color:##maincolor##;cursor:pointer}
.colorinput-input:focus~.colorinput-color{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(255,128,0,.25)}
.comment-footer-container .comment-collaborator-tip:hover,.comment-footer-container .comment-image-tip:hover{color:##maincolor##}
.comment-header .comment-header-tool .comment-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:##maincolor##;background-color:##maincolor##}
.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:##maincolor##;background-color:##maincolor##}
.custom-range::-moz-range-progress{height:2px;background:##maincolor##;border:0;margin-top:0}
.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-ms-fill-lower{background:##maincolor##;border-radius:0}
.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:2px;margin-left:2px;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-webkit-slider-runnable-track{background:##maincolor##;content:"";height:2px;pointer-events:none}
.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range:focus::-moz-range-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-ms-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-webkit-slider-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.custom-switch-input:focus~.custom-switch-indicator{box-shadow:0 0 0 2px rgba(255,128,0,.25);border-color:##maincolor##}
.delete-record-description-view .restore{color:##maincolor##;display:inline-block;overflow:hidden;text-align:right;text-overflow:ellipsis;white-space:nowrap;width:20%}
.department-dialog-content .department-dialog-group .group-item.tr-highlight:hover,.department-dialog-content .department-dialog-group .tr-highlight{background-color:##maincolor##;color:#fff}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container,.selected-departments.dtable-ui .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.download-file-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.download-file-dialog .download-files-item .downloading-file-cancel{color:##maincolor##;opacity:.8}
.download-files-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:##maincolor##}
.dtable-excel-preview-dialog .dtable-excel-preview-dialog-nav{background-color:##maincolor##;margin:0;padding:10px 10px 0}
.dtable-file-addition-container .dtable-file-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-file-previewer-header .files-operation-content{color:##maincolor##}
.dtable-image-addition-container .dtable-image-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-path-container .dtable-path-link{color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator.dtable-radio-indicator-disable{background-color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator{background-color:##maincolor##;border:initial!important}
.editor-column-popover-inner .submitSelect{box-shadow:0 0 0 2px ##maincolor##80}
.field-setting .field-setting-banner .show-all-button{color:##maincolor##;cursor:pointer;font-size:12px}
.field-settings .field-settings-header .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer}
.file-chooser-item .item-active{background:##maincolor##!important;border-radius:2px;box-shadow:inset 0 0 1px #999;color:#fff}
.file-management-toolbar .select-file-management-item{color:##maincolor##}
.file-upload-item .upload-operation .error-uploaded{color:##maincolor##;cursor:pointer}
.form-help:hover,.form-help[aria-describedby]{background:##maincolor##;color:#fff}
.formula-format-editor-popover .btn-re-detect{align-items:center;border-color:##maincolor##;display:flex;font-weight:400;height:30px;justify-content:center;margin:0 0 0 15px;padding-bottom:0;padding-top:0}
.formula-result-type-detector .btn-re-detect{align-items:center;color:##maincolor##;display:flex;font-weight:400;justify-content:center}
.gallery-app-settings .mobile-select-all{color:##maincolor##}
.grid-pane-divider .tooltip-pane-divider .freeze-columns-length{color:##maincolor##;font-weight:500;padding:0 4px}
.imagecheck-figure:before{content:"";position:absolute;top:.25rem;left:.25rem;display:block;width:1rem;height:1rem;pointer-events:none;user-select:none;background:##maincolor## url("data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'>&lt;path fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/>&lt;/svg>") no-repeat center center/50% 50%;color:#fff;z-index:1;border-radius:3px;opacity:0;transition:.3s opacity}
.imagecheck-input:focus~.imagecheck-figure{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(255,128,0,.25)}
.introduction-video .video-js .vjs-control-bar{background-color:##maincolor##cc}
.link-records-editor .create-link-records .new-record:hover{background:#fff;border-color:##maincolor##}
.link-records-editor .create-link-records .new-record{align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##;display:inline-flex;justify-content:center;padding:0 10px;width:100%}
.list-group-item.active{z-index:2;color:##maincolor##;background-color:#fffaf5;border-color:rgba(0,40,100,.12)}
.mobile-float-icon{background-color:##maincolor##;border:none;border-radius:50%;bottom:42px;box-shadow:0 3px 5px -1px #ffa25233,0 6px 10px 0 #ffa25224,0 1px 18px 0 #ffa2521f;color:#999;cursor:pointer;display:flex;font-size:16px;height:50px;position:fixed;right:10px;-webkit-user-select:none;user-select:none;width:50px}
.mobile_mobile-select-all__9qLb-{color:##maincolor##}
.mobile_mobile-select-all__esQ2M{color:##maincolor##}
.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:##maincolor##}
.nav-tabs .nav-submenu .nav-item.active{color:##maincolor##}
.option-editor-footer .item-text{color:##maincolor##;cursor:pointer}
.page-designer-add-elements-btn-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.page-designer-box-editor .page-designer-sub-block-element-wrapper[drag-over]{border-color:##maincolor##!important}
.page-designer-drag-closing-section-tips{background-color:##maincolor##;height:1px;left:0;position:absolute;width:100%;z-index:1}
.page-designer-drag-into-section-tips{background-color:initial!important;border:1px dashed ##maincolor##;height:100%;position:absolute;top:0;z-index:1}
.page-designer-editor .dragging-element-valid-position-tip{background-color:initial!important;border:1px dashed ##maincolor##;z-index:1}
.page-designer-editor .page-designer-element-container .drag-handler{background-color:##maincolor##;border-radius:3px}
.page-designer-editor .page-designer-section .page-designer-element-container.editing-element{border-color:##maincolor##}
.page-designer-editor .page-designer-section .page-designer-section-container.editing-section{border:2px solid ##maincolor##}
.page-designer-element-setting-type.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.page-item.active .page-link{z-index:3;color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.participants .add-participants i{background-color:#fff;border:2px solid #fff;border-radius:50%;color:##maincolor##;font-size:16px}
.progress-bar{display:flex;flex-direction:column;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:##maincolor##;transition:width .6s ease}
.rbc-now .rbc-date-context{background-color:##maincolor##;color:#fff}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:unset}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.rc-slider-handle:hover{border-color:##maincolor##}
.rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.rc-slider-handle{position:absolute;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;margin-top:-5px;cursor:grab;border-radius:50%;border:2px solid ##maincolor##;background-color:#fff;touch-action:pan-x}
.rc-slider-track{background-color:##maincolor##;left:0}
.rc-slider-track{left:0;background-color:##maincolor##}
.row-card-list .no-link-tip>.btn-outline-primary:hover{background-color:##maincolor##}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{border-bottom:2px solid ##maincolor##;color:#212529}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{color:#212529;border-bottom:2px solid ##maincolor##}
.sdoc-comment-drawer .add-comments-participants .sdocfont{border-radius:50%;color:##maincolor##;font-size:16px}
.sdoc-file-select-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sdoc-outline-item.active{color:##maincolor##}
.sdoc-tip-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sea-ai-assistant-chat-input-container .icon-wrapper:hover .item-icon{color:##maincolor##}
.sea-chart-settings .rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.sea-chart-settings .rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.sea-chart-settings .rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.sea-chart-settings .rc-slider-handle:hover{border-color:##maincolor##}
.sea-chart-settings .rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.sea-chart-settings .rc-slider-track{background-color:##maincolor##;border-radius:6px;height:4px;left:0;position:absolute}
.sea-chart-settings .sea-chart-settings-type .sea-chart-settings-type-item.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.sea-chart-types-dialog .sea-chart-chart-categories-nav .sea-chart-chart-cat-nav-item-container.sea-chart-icon-highlight .chart-icon{color:##maincolor##}
.sea-chart-types-dialog .sea-chart-type-item.selected{border-color:##maincolor##}
.search-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.seatable-app-form-settings .seatable-app-form-content .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.seatable-app-form-settings .seatable-app-form-content .seatable-app-form-drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.seatable-app-page .dtable-plugin-column-setting-item-title .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px;font-weight:450}
.seatable-form-app-settings-panel .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.seatable-share-form .form-content .submit-form.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.select-columns-dialog .select-columns{color:##maincolor##;cursor:pointer;font-size:13px;font-weight:500}
.select-page-icons .select-page-icon-active,.select-page-icons .select-page-icon-active:hover{background-color:##maincolor##}
.selectgroup-input:checked+.selectgroup-button{border-color:##maincolor##;z-index:1;color:##maincolor##;background:#fff2e6}
.selectgroup-input:focus+.selectgroup-button{border-color:##maincolor##;z-index:2;color:##maincolor##;box-shadow:0 0 0 2px rgba(255,128,0,.25)}
.share-link-dialog .share-link-info .share-link-content{color:##maincolor##;cursor:pointer;display:inline-block;width:100%}
.share-link-dialog .share-link-info .share-link-content{display:inline-block;width:100%;color:##maincolor##;cursor:pointer}
.single-record-page-setting-element-types-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.statistic-chart-addition-dialog .selected-statistic-type-item{background-color:##maincolor##;color:#fff}
.submit-map-editor{background-color:#fff;border:1px solid #0000;border-radius:3px;box-shadow:0 0 12px #0000004d;color:##maincolor##;cursor:pointer;display:inline-block;font-size:.875rem;height:38px;line-height:1.8461538462;margin-left:16px;padding:.375rem .75rem;text-align:center;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}
.table-calendar-link:before{content:"";width:4px;height:4px;position:absolute;left:.25rem;top:.25rem;border-radius:50px;background:##maincolor##}
.table-calendar-link:hover{color:#fff;text-decoration:none;background:##maincolor##;transition:.3s background}
.tables-tabs-content .tabs-nav-scroll-after{background:linear-gradient(90deg,##maincolor##33,##maincolor##99,##maincolor##);right:10px;top:0;width:20px}
.tables-tabs-content .tabs-nav-scroll-before{background:linear-gradient(270deg,##maincolor##33,##maincolor##99,##maincolor##);left:0;top:0;width:25px;z-index:5}
.tag-primary{background-color:##maincolor##;color:#fff}
.text-primary{color:##maincolor## !important}
.tree-view-trash-tab.active,.tree-view-trash-tab.active .dtable-font,.tree-view-trash-tab.active svg{background-color:##maincolor##;border-radius:4px;color:#fff}
.view-edit-popover-header .remove-icon-button{color:##maincolor##}
.workflow-task-dialog .workflow-task-nodes-logs .workflow-task-node-log-selector.selected{border-bottom:2px solid ##maincolor##;color:#212529}
.workflow-task-logs .workflow-task-log .workflow-task-log-icon{color:##maincolor##;margin-right:5px}
a.badge-primary:hover,a.badge-primary:focus{color:#fff;background-color:##maincolor##}
a.bg-primary:hover,a.bg-primary:focus,button.bg-primary:hover,button.bg-primary:focus{background-color:##maincolor## !important}
a{color:##maincolor##;text-decoration:none;background-color:transparent}`;
  } else if (version === "v4.3") {
    var css_input = `.account-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.account-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.account-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.activity-department-item .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.activity-table .activity-detail-item-container .operation-table{color:##maincolor##}
.activity-table .text-center a{color:##maincolor##;max-width:calc(100% - 67px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.add-account .add-account-btn,.edit-account .edit-account-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container,.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container:hover{border-color:##maincolor##}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-name{color:##maincolor##}
.add-share-permission .add-share-permission-btn,.edit-share-permission .edit-share-permission-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-user-select-all-container .select-all,.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.app-form-settings .app-form-settings-header-tab.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.app-form-settings .table-setting .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.app-group-container .load-more-apps .load-more-apps-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.app-icon-settings-popover-nav .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none;border-bottom:.125rem solid ##maincolor##}
.app-map-dialog-cn .dtable-app-column-setting-item-title .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer;font-weight:450}
.app-select-page-item-popover .popover .app-select-page-item-popover-image-container{border:2px solid ##maincolor##;border-radius:3px;overflow:hidden}
.app-settings-dialog .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none;border-bottom:.125rem solid ##maincolor##}
.app-settings-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;color:#fff;border:none}
.archive-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.archive-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.archive-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.attachments-management-widget .dirent-table-content .dirent-item-name{color:##maincolor##}
.attachments-management-widget .tree-view .tree-node-inner.tree-node-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.automatic-action-addition-toggle{color:##maincolor##;cursor:pointer}
.badge-primary[href]:hover,.badge-primary[href]:focus{color:#fff;text-decoration:none;background-color:##maincolor##}
.badge-primary{color:#fff;background-color:##maincolor##}
.base-status-dialog .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none}
.base-status-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.batch-popover .batch-popover-footer .replace-search-item{background:##maincolor##;border:1px solid #e4e4e4;color:#fff}
.bg-primary{background-color:##maincolor## !important}
.big-data-import-process .am-progress-bar{background-color:##maincolor##;border:none;border-radius:5px;height:10px!important}
.border-primary{border-color:##maincolor## !important}
.btn-link{font-weight:400;color:##maincolor##;background-color:transparent}
.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:##maincolor##;background-color:transparent}
.btn-outline-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active,.btn-outline-primary:not(:disabled):not(.disabled).active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary{color:##maincolor##;background-color:transparent;background-image:none;border-color:##maincolor##}
.btn-outline-universal-01.disabled,.btn-outline-universal-01:disabled{color:##maincolor##;background-color:initial}
.btn-outline-universal-01:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-universal-01:not(:disabled):not(.disabled).active,.btn-outline-universal-01:not(:disabled):not(.disabled):active,.show>.btn-outline-universal-01.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-universal-01{color:##maincolor##;background-color:initial;background-image:none;border-color:##maincolor##}
.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01.disabled,.btn-universal-01:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01:not(:disabled):not(.disabled).active,.btn-universal-01:not(:disabled):not(.disabled):active,.show>.btn-universal-01.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#212529;cursor:pointer}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#444;cursor:pointer}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#212529;cursor:default}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#444;cursor:default}
.chat-message:after{content:"";position:absolute;right:-5px;top:7px;border-bottom:6px solid transparent;border-left:6px solid ##maincolor##;border-top:6px solid transparent}
.chat-message{position:relative;display:inline-block;background-color:##maincolor##;color:#fff;font-size:.875rem;padding:.375rem .5rem;border-radius:3px;white-space:normal;text-align:left;margin:0 .5rem 0 2.5rem;line-height:1.4}
.color-setting-dialog .rule-color-container .color-setting-add-color{color:##maincolor##;cursor:pointer}
.colorinput-input:focus~.colorinput-color{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(255,128,0,.25)}
.comment-footer-container .comment-collaborator-tip:hover,.comment-footer-container .comment-image-tip:hover{color:##maincolor##}
.comment-header .comment-header-tool .comment-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.cur-view-container .heading a{color:##maincolor##}
.custom-checkbox .custom-control-input:checked~.custom-control-label::before{background-color:##maincolor##}
.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{background-color:##maincolor##}
.custom-control-input:checked~.custom-control-label::before{color:#fff;background-color:##maincolor##}
.custom-page-box-editor .custom-page-sub-block-element-wrapper[drag-over]{border-color:##maincolor##!important}
.custom-page-drag-closing-section-tips{position:absolute;left:0;width:100%;height:1px;background-color:##maincolor##;z-index:1}
.custom-page-drag-into-section-tips{position:absolute;top:0;border:1px dashed ##maincolor##;height:100%;background-color:initial!important;z-index:1}
.custom-page-element-setting-type.selected{color:##maincolor##;border-bottom:2px solid ##maincolor##}
.custom-radio .custom-control-input:checked~.custom-control-label::before{background-color:##maincolor##}
.custom-range::-moz-range-progress{height:2px;background:##maincolor##;border:0;margin-top:0}
.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-ms-fill-lower{background:##maincolor##;border-radius:0}
.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:2px;margin-left:2px;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-webkit-slider-runnable-track{background:##maincolor##;content:"";height:2px;pointer-events:none}
.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range:focus::-moz-range-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-ms-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-webkit-slider-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.custom-switch-input:focus~.custom-switch-indicator{box-shadow:0 0 0 2px rgba(255,128,0,.25);border-color:##maincolor##}
.delete-record .delete-record-restore{color:##maincolor##;cursor:pointer;text-align:center;width:10%}
.delete-record-description-view .restore{color:##maincolor##;display:inline-block;overflow:hidden;text-align:right;text-overflow:ellipsis;white-space:nowrap;width:20%}
.department-dialog-content .department-dialog-group .group-item.tr-highlight:hover,.department-dialog-content .department-dialog-group .tr-highlight{background-color:##maincolor##;color:#fff}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.department-single-select-formatter .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.departments-tree-panel .departments-v2-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:##maincolor##}
.dtable-edit-form .form-header-title .dtable-icon-form{color:##maincolor##;font-size:24px}
.dtable-excel-preview-dialog .dtable-excel-preview-dialog-nav{background-color:##maincolor##;margin:0;padding:10px 10px 0}
.dtable-external-links-content .external-link-item a{color:##maincolor##}
.dtable-file-addition-container .dtable-file-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-file-previewer-header .files-operation-content{color:##maincolor##}
.dtable-image-addition-container .dtable-image-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-radio .dtable-radio-selected-indicator.dtable-radio-indicator-disable{background-color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator{background-color:##maincolor##;border:unset!important}
.dtable-refresh{color:##maincolor##!important;cursor:pointer}
.dtable-scripts-module .dtable-scripts-export:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.dtable-scripts-module .dtable-scripts-export{background-color:#fff;color:##maincolor##;width:135px}
.editor-column-popover-inner .submitSelect{box-shadow:0 0 0 2px ##maincolor##80}
.field-setting .field-setting-banner .show-all-button{color:##maincolor##;cursor:pointer;font-size:12px}
.field-settings .field-settings-header .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer}
.file-chooser-content-container .file-chooser-left .select-file-chooser-nav-item{background-color:##maincolor##!important;color:#fff}
.file-chooser-item .item-active{background:##maincolor##!important;border-radius:2px;box-shadow:inset 0 0 1px #999;color:#fff}
.file-management-toolbar .select-file-management-item{color:##maincolor##}
.file-upload-item .upload-operation .error-uploaded{color:##maincolor##;cursor:pointer}
.folder-tree .folder-item.folder-item-selected{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.form-help:hover,.form-help[aria-describedby]{background:##maincolor##;color:#fff}
.form-items-container .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.form-items-container .drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.form-remark-background-setting .no-active-option .select-group-item:hover{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer}
.form-remark-background-setting .select-group-container .select-group-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.formula-format-editor-popover .btn-re-detect{align-items:center;border-color:##maincolor##;display:flex;font-weight:400;height:30px;justify-content:center;margin:0 0 0 15px;padding-bottom:0;padding-top:0}
.formula-format-editor-popover .btn-secondary:not(:disabled):not(.disabled):active{background-color:initial;border-color:##maincolor##;color:##maincolor##}
.formula-result-type-detector .btn-re-detect{align-items:center;color:##maincolor##;display:flex;font-weight:400;justify-content:center}
.gallery-app-settings .mobile-select-all{color:##maincolor##}
.grid-pane-divider .tooltip-pane-divider .freeze-columns-length{color:##maincolor##;font-weight:500;padding:0 4px}
.group-manage-trash-dialog .trash-dtables .trash-table-restore{color:##maincolor##;cursor:pointer}
.image-view i{animation:rotate 1.5s ease infinite;color:##maincolor##;font-size:30px;height:100%;line-height:150px;text-align:center;width:100%}
.imagecheck-figure:before{content:"";position:absolute;top:.25rem;left:.25rem;display:block;width:1rem;height:1rem;pointer-events:none;user-select:none;background:##maincolor## url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E") no-repeat center center/50% 50%;color:#fff;z-index:1;border-radius:3px;opacity:0;transition:.3s opacity}
.imagecheck-input:focus~.imagecheck-figure{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(255,128,0,.25)}
.info-bar-info div a{color:##maincolor##;text-decoration:underline}
.info-bar-info span:first-child{color:##maincolor##}
.introduction-video .video-js .vjs-control-bar{background-color:##maincolor##cc}
.introduction-video-mobile .introduction-video-btn{background-color:##maincolor##;border-radius:26px;margin-top:5rem}
.link-records-editor .create-link-records .new-record:hover{background:#fff;border-color:##maincolor##}
.link-records-editor .create-link-records .new-record:hover{border-color:##maincolor##;background:#fff}
.link-records-editor .create-link-records .new-record{align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##;display:inline-flex;justify-content:center;padding:0 10px;width:100%}
.link-records-editor .create-link-records .new-record{width:100%;padding:0 10px;display:inline-flex;justify-content:center;align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##}
.list-group-item.active{z-index:2;color:##maincolor##;background-color:#fffaf5;border-color:rgba(0,40,100,.12)}
.login-panel .login-panel-register-type:hover {border-color: ##maincolor##;}
.mobile-float-icon{background-color:##maincolor##;border:none;border-radius:50%;bottom:42px;box-shadow:0 3px 5px -1px #ffa25233,0 6px 10px 0 #ffa25224,0 1px 18px 0 #ffa2521f;color:#999;cursor:pointer;display:flex;font-size:16px;height:50px;position:fixed;right:10px;-webkit-user-select:none;user-select:none;width:50px}
.mobile-main-panel .selected-tab-item{color:##maincolor##;font-size:22px}
.mobile-share-table .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile-share-view .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile_mobile-select-all__esQ2M{color:##maincolor##}
.nav .nav-item .nav-link.active {color: ##maincolor##; border-bottom: 0.125rem solid ##maincolor##;}
.nav-pills .nav-item .nav-link.active {background-color: ##maincolor##;color: #fff;}
.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:##maincolor##}
.nav-tabs .nav-submenu .nav-item.active{color:##maincolor##}
.operation-table{color:##maincolor##;flex:1 1;max-width:100px}
.option-editor-footer .item-text{color:##maincolor##;cursor:pointer}
.order-item .order-price{color:##maincolor##;font-size:26px;font-weight:500}
.org-admin .main-panel .nav .nav-item .nav-link.active,.sys-admin .main-panel .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.org-info-content .am-progress-bar{background-color:##maincolor##;border-radius:5px;height:6px!important}
.outline-h2:hover{color:##maincolor##}
.outline-h3:hover{color:##maincolor##}
.page-item.active .page-link{z-index:1;color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.participants .add-participants i{background-color:#fff;border:2px solid #fff;border-radius:50%;color:##maincolor##;font-size:16px}
.participants .add-participants i{background-color:#fff;font-size:16px;color:##maincolor##;border:2px solid #fff;border-radius:50%}
.path-toolbar .toolbar-item a:hover{color:##maincolor##;text-decoration:none}
.plan-description-item .plan-description{color:##maincolor##;font-size:20px;font-weight:500}
.plan-description-item.plan-selected{background-color:#fff5eb;border-color:##maincolor##;border-width:2px}
.price-version-container-header .price-version-plan-name{border-bottom:1px solid ##maincolor##;font-size:1.5rem;padding:1rem 0}
.progress-bar{display:flex;flex-direction:column;justify-content:center;color:#fff;text-align:center;white-space:nowrap;background-color:##maincolor##;transition:width .6s ease}
.rbc-btn-group .rbc-tool-btn.today-btn-disabled,.rbc-btn-group .rbc-tool-btn:hover{background-color:##maincolor##;border:1px solid ##maincolor##;color:#fff}
.rbc-btn-group .rbc-tool-icon:hover{background-color:##maincolor##;color:#fff}
.rbc-btn-group .view-type-list .rbc-view-type.rbc-active{background:##maincolor##;color:#fff}
.rbc-btn-group .view-type-list .rbc-view-type.rbc-active{color:#fff;background:##maincolor##}
.rbc-current-time-indicator-label{border-left:0!important;bottom:-10px;color:##maincolor##;font-size:14px;font-weight:400;padding:0 5px;position:absolute}
.rbc-current-time-indicator-label{position:absolute;bottom:-10px;padding:0 5px;font-size:14px;font-weight:400;color:##maincolor##;border-left:0!important}
.rbc-current-time-indicator{background-color:##maincolor##;border-color:##maincolor##;height:1px;pointer-events:none;position:absolute;right:0;z-index:3}
.rbc-current-time-indicator{position:absolute;z-index:3;right:0;height:1px;background-color:##maincolor##;border-color:##maincolor##;pointer-events:none}
.rbc-now .rbc-date-context{background-color:##maincolor##;color:#fff}
.rbc-year-view .day-events{background-color:##maincolor##;border-radius:50%;height:4px;left:16px;position:absolute;top:22px;width:4px}
.rbc-year-view .day-events{position:absolute;height:4px;width:4px;border-radius:50%;background-color:##maincolor##;top:22px;left:16px}
.rbc-year-view .rbc-current{background-color:##maincolor##;border-radius:2px;color:#fff}
.rbc-year-view .rbc-current{border-radius:2px;background-color:##maincolor##;color:#fff}
.rbc-year-view .rbc-year-month-header{color:##maincolor##;padding-left:10px}
.rbc-year-view .rbc-year-month-header{padding-left:10px;color:##maincolor##}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:unset}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.rc-slider-handle:hover{border-color:##maincolor##}
.rc-slider-handle{position:absolute;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;margin-top:-5px;cursor:grab;border-radius:50%;border:2px solid ##maincolor##;background-color:#fff;touch-action:pan-x}
.rc-slider-track{left:0;background-color:##maincolor##}
.restore-base-button{color:##maincolor##;min-width:35px;padding-left:5px;text-align:right}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{border-bottom:2px solid ##maincolor##;color:#212529}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{color:#212529;border-bottom:2px solid ##maincolor##}
.search-result-container .search-result-item:hover{background-color:#eee;border-left:2px solid ##maincolor##}
.search-result-list .item-content .item-name{color:##maincolor##!important}
.search-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.seatable-app-custom-edit-page .app-custom-page-element-container .drag-handler{background-color:##maincolor##;border-radius:3px}
.seatable-app-custom-edit-page .custom-page-section .app-custom-page-element-container.editing-element{border-color:##maincolor##}
.seatable-app-custom-edit-page .custom-page-section .custom-page-section-container.editing-section{border:2px solid ##maincolor##}
.seatable-app-custom-edit-page .dragging-element-valid-position-tip{border:1px dashed ##maincolor##;background-color:initial!important;z-index:1}
.seatable-app-form-settings .seatable-app-form-content .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.seatable-app-form-settings .seatable-app-form-content .seatable-app-form-drop-placeholder{width:100%;height:100px;border-radius:3px;opacity:.75;border:2px dashed ##maincolor##}
.seatable-bg-orange {background-color: ##maincolor## !important;}
.seatable-form-app-settings-panel .add-all{font-size:14px;color:##maincolor##;cursor:pointer}
.seatable-radio .seatable-radio-selected-indicator.seatable-radio-disable{background-color:##maincolor##;border:initial!important;opacity:.7}
.seatable-radio .seatable-radio-selected-indicator{background-color:##maincolor##;border:initial!important}
.select-page-icons .select-page-icon-active,.select-page-icons .select-page-icon-active:hover{background-color:##maincolor##}
.select-user-modal .modal-select-user-header .select-user-close-btn{color:##maincolor##;font-size:14px;font-weight:400;position:absolute;right:15px}
.selectgroup-input:checked+.selectgroup-button{border-color:##maincolor##;z-index:1;color:##maincolor##;background:#fff2e6}
.selectgroup-input:focus+.selectgroup-button{border-color:##maincolor##;z-index:2;color:##maincolor##;box-shadow:0 0 0 2px rgba(255,128,0,.25)}
.share-add-btn-container .share-add-btn{background:#fff;background-image:none;border-color:##maincolor##;color:##maincolor##;margin-top:10px;outline:none;width:90%}
.share-dialog .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.share-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.share-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.share-link-dialog .share-link-info .share-link-content{color:##maincolor##;cursor:pointer;display:inline-block;width:100%}
.share-link-dialog .share-link-info .share-link-content{display:inline-block;width:100%;color:##maincolor##;cursor:pointer}
.share-permissions-manage .share-permissions-manage-header button{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.share-table-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#333}
.share-view-management-container .share-view-manage{color:##maincolor##;cursor:pointer;margin-left:8px}
.share-view-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#333}
.side-nav-footer .join-us-icon{color:##maincolor##;font-size:20px;margin-right:10px}
.side-panel .nav-link.active{color:##maincolor##}
.statistic-chart-addition-dialog .selected-statistic-type-item{background-color:##maincolor##;color:#fff}
.statistic-chart-selector_icon-highlight__-ZfRF{color:##maincolor##}
.statistic-chart-selector_statistic-type-item-selected__bQdDk,.statistic-chart-selector_statistic-type-item-selected__bQdDk:hover{border-color:##maincolor##}
.statistic-chart-settings .rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.statistic-chart-settings .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.statistic-chart-settings .rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.statistic-chart-settings .rc-slider-handle:hover{border-color:##maincolor##}
.statistic-chart-settings .rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.statistic-chart-settings .rc-slider-track{background-color:##maincolor##;border-radius:6px;height:4px;left:0;position:absolute}
.statistic-types-dialog .chart-categories-nav .chart-icon.icon-highlight{color:##maincolor##}
.statistic-types-dialog .statistic-type-item.selected{border-color:##maincolor##}
.submit-map-editor{background-color:#fff;border:1px solid #0000;border-radius:3px;box-shadow:0 0 12px #0000004d;color:##maincolor##;cursor:pointer;display:inline-block;font-size:.875rem;height:38px;line-height:1.8461538462;margin-left:16px;padding:.375rem .75rem;text-align:center;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}
.subscription-container .text-orange{color:##maincolor##!important}
.subscription-submit{background-color:##maincolor##;border-radius:5px;color:#fff;font-size:16px;height:44px;margin-bottom:10px;width:100%}
.table-calendar-link:before{content:"";width:4px;height:4px;position:absolute;left:.25rem;top:.25rem;border-radius:50px;background:##maincolor##}
.table-calendar-link:hover{color:#fff;text-decoration:none;background:##maincolor##;transition:.3s background}
.table-setting.form-setting-all-required{color:##maincolor##;cursor:pointer;font-size:14px}
.tables-tabs-content .tabs-nav-scroll-after{background:linear-gradient(90deg,##maincolor##33,##maincolor##99,##maincolor##);right:10px;top:0;width:20px}
.tables-tabs-content .tabs-nav-scroll-before{background:linear-gradient(270deg,##maincolor##33,##maincolor##99,##maincolor##);left:0;top:0;width:25px;z-index:5}
.tag-primary{background-color:##maincolor##;color:#fff}
.template-categories .template-category-item.active{color:##maincolor##;text-decoration:underline}
.template-categories .template-category-item:hover{color:##maincolor##}
.template-list-container .template-container:hover{background:#fffbf8;border-color:##maincolor##;cursor:pointer}
.template-list-dialog .modal-header .modal-header-template{color:##maincolor##;font-size:24px;line-height:1;margin-right:10px}
.text-primary{color:##maincolor## !important}
.timeline-settings .record-end-type-item.selected{box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##;background-color:rgba(229,161,82,.1)}
.trash-table .trash-table-base-detail .trash-table-restore-mobile{color:##maincolor##;cursor:pointer}
.trash-table .trash-table-base-detail .trash-table-restore:hover{color:##maincolor##;text-decoration:underline}
.trash-table .trash-table-base-detail .trash-table-restore{color:##maincolor##;cursor:pointer}
.tree-view-trash-tab.active,.tree-view-trash-tab.active .dtable-font,.tree-view-trash-tab.active svg{background-color:##maincolor##;border-radius:4px;color:#fff}
.universal-app-select-group .no-active-option .select-group-item:hover{cursor:pointer;background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##}
.universal-app-select-group .select-group-container .select-group-item.active{background-color:#fff2e4;color:##maincolor##;box-shadow:0 0 0 1px ##maincolor##}
.user-setting-nav .nav-item .nav-link:hover{color:##maincolor##}
.user-setting-nav .nav-item.active .nav-link{border-left-color:##maincolor##;color:##maincolor##}
.view-edit-popover-header .remove-icon-button{color:##maincolor##}
.workflow-app-container .participants-type-container .selected-participants-type-item{background-color:#e5a1521a;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.workflow-app-container .workflow-form-main-mobile.workflow-app-main .form-background-theme{background-color:##maincolor##;flex-shrink:0;height:20px;width:100%}
.workflow-app-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.workflow-folder-tree .workflow-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.workflow-form-main .app-content .form-background-theme{background-color:##maincolor##;border-top-left-radius:6px;border-top-right-radius:6px;height:20px;margin-left:-65px;width:calc(100% + 130px)}
.workflow-group-container .load-more-workflows .load-more-workflows-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.workflow-list-view .list-view-sidebar li{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .share-item-view-sidebar .sidebar-item-active,.workflow-list-view .specific-list-view-sidebar .sidebar-item-active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .view-header .dtable-icon-workflow{color:##maincolor##}
.workflow-task-dialog .workflow-task-nodes-logs .workflow-task-node-log-selector.selected{border-bottom:2px solid ##maincolor##;color:#212529}
.workflow-task-list-modal .workflow-task-list-modal-header-left .dtable-icon-workflow{color:##maincolor##;font-size:20px;font-weight:500}
.workflow-task-logs .workflow-task-log .workflow-task-log-icon{color:##maincolor##;margin-right:5px}
.workflow-task-pending-dialog .workflow-task-flow-header .flow-chart,.workflow-task-pending-dialog .workflow-task-flow-header .task-logs{border-bottom:2px solid ##maincolor##;color:#212529}
:root{--blue: #467fcf;--indigo: #6574cd;--purple: #a55eea;--pink: #f66d9b;--red: #cd201f;--orange: #fd9644;--yellow: #f1c40f;--green: #5eba00;--teal: #2bcbba;--cyan: #17a2b8;--white: #fff;--gray: #868e96;--gray-dark: #343a40;--azure: #45aaf2;--lime: #7bd235;--primary: ##maincolor##;--secondary: #868e96;--success: #5eba00;--info: #45aaf2;--warning: #f1c40f;--danger: #cd201f;--light: #f8f9fa;--dark: #343a40;--breakpoint-xs: 0;--breakpoint-sm: 576px;--breakpoint-md: 768px;--breakpoint-lg: 992px;--breakpoint-xl: 1280px;--font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-family-monospace: Monaco, Consolas, "Liberation Mono", "Courier New", monospace}
a.bg-primary:hover,a.bg-primary:focus,button.bg-primary:hover,button.bg-primary:focus{background-color:##maincolor## !important}
a.text-primary:hover,a.text-primary:focus{color:##maincolor## !important}
a:hover{color:##maincolor##}
a{color:##maincolor##;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}
a{text-decoration-skip:ink;color:##maincolor##}
`;
  } else {
    var css_input = "SeaTable Version unknown.";
  }

  // Change the content of the code element
  codeElement.textContent = css_input.replaceAll("##maincolor##", color);
}

/*
#header{background-color:##maincolor##;border-bottom:1px solid ##maincolor##;display:flex;font-size:16px;height:50px;justify-content:space-between;padding:0 1rem;text-align:center}
#header{background-color:##maincolor##;border-bottom:1px solid ##maincolor##;display:flex;font-size:16px;height:50px;justify-content:space-between;padding:0 1rem;text-align:center}

wie erzeuge ich liste:
1. Auslesen der css Datei mit folgendem Befehl:
docker exec -it seatable-server find /opt/seatable/seatable-server-latest/dtable-web/media ! -name 'fontawesome*.css' ! -name 'bootstrap*.css' -name '*.css' -exec cat {} \; > ./seamate-4.css

2. reinwerfen in datamate seafmate index2.php
Die neue Liste ist dann reduziert.

3. Bereinigen von doppelten Einträgen
- https://dedupelist.com/ und [x] Sort results

5. "#header" und ".tables-tabs-container" entfernen, sowie &gt; durch > ersetzen.

*/
