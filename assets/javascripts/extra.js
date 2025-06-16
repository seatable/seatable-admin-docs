function returnAvailableIcons(searchQuery) {
  var query = document.getElementById("iconSearch").value;

  // Define your array of icons here
  const icons = [
    "dtable-icon-recycle-bin1",
    "dtable-icon-department-single-selection",
    "dtable-icon-decoration",
    "dtable-icon-dynamic-materials",
    "dtable-icon-first-page",
    "dtable-icon-thumbnail",
    "dtable-icon-next-page",
    "dtable-icon-previous-page",
    "dtable-icon-last-page",
    "dtable-icon-using-templates",
    "dtable-icon-ai-assistant",
    "dtable-icon-down1",
    "dtable-icon-up1",
    "dtable-icon-refresh",
    "dtable-icon-table-of-",
    "dtable-icon-remove-from-toolbar1",
    "dtable-icon-add-to-toolbar1",
    "dtable-icon-add-to-toolbar",
    "dtable-icon-remove-from-toolbar",
    "dtable-icon-folders1",
    "dtable-icon-info-circle",
    "dtable-icon-handwritten-signature-sync",
    "dtable-icon-handwritten-signature",
    "dtable-icon-collapse-all",
    "dtable-icon-expand-all",
    "dtable-icon-comment1",
    "dtable-icon-border-style",
    "dtable-icon-automation-rules1",
    "dtable-icon-notification-rules",
    "dtable-icon-app-purchase",
    "dtable-icon-app-statistics",
    "dtable-icon-app-address-book",
    "dtable-icon-app-product-library",
    "dtable-icon-app-individual-bill",
    "dtable-icon-app-email",
    "dtable-icon-app-distribution",
    "dtable-icon-app-history1",
    "dtable-icon-app-contract",
    "dtable-icon-app-post-sale",
    "dtable-icon-app-logistics",
    "dtable-icon-app-invoice",
    "dtable-icon-app-achievement-distribution",
    "dtable-icon-underline",
    "dtable-icon-chart",
    "dtable-icon-text",
    "dtable-icon-calendar1",
    "dtable-icon-data-deduplication",
    "dtable-icon-advanced-statistics",
    "dtable-icon-gallery",
    "dtable-icon-kanban",
    "dtable-icon-page-design",
    "dtable-icon-timeline",
    "dtable-icon-map1",
    "dtable-icon-upload1",
    "dtable-icon-qr-code",
    "dtable-icon-monitor1",
    "dtable-icon-more",
    "dtable-icon-italic",
    "dtable-icon-font-color1",
    "dtable-icon-clear-format",
    "dtable-icon-bold",
    "dtable-icon-display1",
    "dtable-icon-list-ol1",
    "dtable-icon-list-ul1",
    "dtable-icon-activities",
    "dtable-icon-import-from-another-table1",
    "dtable-icon-monitor",
    "dtable-icon-custom-color1",
    "dtable-icon-switch2",
    "dtable-icon-justify-align",
    "dtable-icon-font-color",
    "dtable-icon-increase-indent",
    "dtable-icon-decrease-indent",
    "dtable-icon-list-ol-capital-english-letters",
    "dtable-icon-list-ol-capital-roman-numerals",
    "dtable-icon-list-ul",
    "dtable-icon-list-ul-black-square",
    "dtable-icon-list-ul-hollow-circle",
    "dtable-icon-list-ol-small-roman-numerals",
    "dtable-icon-switch1",
    "dtable-icon-list-ol-small-english-letters",
    "dtable-icon-custom-color",
    "dtable-icon-import-from-another-table",
    "dtable-icon-list-ol-small-greek",
    "dtable-icon-list-ol",
    "dtable-icon-align-right",
    "dtable-icon-horizontal-center",
    "dtable-icon-align-left",
    "dtable-icon-bottom-alignment",
    "dtable-icon-horizontal-distribution",
    "dtable-icon-top-alignment",
    "dtable-icon-vertical-center",
    "dtable-icon-vertical-distribution",
    "dtable-icon-novice-guide",
    "dtable-icon-wide",
    "dtable-icon-narrow1",
    "dtable-icon-choose-column",
    "dtable-icon-app-share",
    "dtable-icon-app-user-management",
    "dtable-icon-paused",
    "dtable-icon-app-preview",
    "dtable-icon-app-authority-management",
    "dtable-icon-app-settings",
    "dtable-icon-rule",
    "dtable-icon-workflow1",
    "dtable-icon-app-page",
    "dtable-icon-app-home",
    "dtable-icon-app-personnel",
    "dtable-icon-app-star-mark",
    "dtable-icon-app-history",
    "dtable-icon-app-edit",
    "dtable-icon-app-folder",
    "dtable-icon-app-calendar",
    "dtable-icon-app-map",
    "dtable-icon-app-position",
    "dtable-icon-app-gallery",
    "dtable-icon-automation-rules",
    "dtable-icon-dingtalk",
    "dtable-icon-delete",
    "dtable-icon-checklist-sync",
    "dtable-icon-button-sync",
    "dtable-icon-email-sync",
    "dtable-icon-link-formulas-sync",
    "dtable-icon-location-sync",
    "dtable-icon-creation-time-sync",
    "dtable-icon-calendar-alt-solid-sync",
    "dtable-icon-multiple-selection-sync",
    "dtable-icon-collaborator-sync",
    "dtable-icon-picture-sync",
    "dtable-icon-renewal-person-sync",
    "dtable-icon-duration-sync",
    "dtable-icon-single-election-sync",
    "dtable-icon-autonumber-sync",
    "dtable-icon-link-other-record-sync",
    "dtable-icon-formula-sync",
    "dtable-icon-single-line-text-sync",
    "dtable-icon-rate-sync",
    "dtable-icon-file-alt-solid-sync",
    "dtable-icon-long-text-sync",
    "dtable-icon-url-sync",
    "dtable-icon-number-sync",
    "dtable-icon-periodic-sync",
    "dtable-icon-table-encryption",
    "dtable-icon-funnel-chart",
    "dtable-icon-convert",
    "dtable-icon-include-archived-records",
    "dtable-icon-exclude-archived-records",
    "dtable-icon-use-values",
    "dtable-icon-restore",
    "dtable-icon-partially-selected",
    "dtable-icon-workflow",
    "dtable-icon-rectangular-tree-diagram",
    "dtable-icon-scan-code",
    "dtable-icon-a-qr-code",
    "dtable-icon-histogram",
    "dtable-icon-bar-chart",
    "dtable-icon-line-chart",
    "dtable-icon-area-chart",
    "dtable-icon-pie-chart",
    "dtable-icon-scatter-chart",
    "dtable-icon-combination-chart",
    "dtable-icon-map",
    "dtable-icon-heat-map",
    "dtable-icon-facet-chart",
    "dtable-icon-card",
    "dtable-icon-gauge",
    "dtable-icon-adjust-column",
    "dtable-icon-private-archive-view",
    "dtable-icon-private-database",
    "dtable-icon-up-move",
    "dtable-icon-down-move",
    "dtable-icon-flag",
    "dtable-icon-praise",
    "dtable-icon-like",
    "dtable-icon-mysql-database",
    "dtable-icon-more-menus",
    "dtable-icon-pdf",
    "dtable-icon-export-to-new-table",
    "dtable-icon-pin",
    "dtable-icon-night-mode",
    "dtable-icon-day-mode",
    "dtable-icon-archiving-view",
    "dtable-icon-recognition-image",
    "dtable-icon-archive-view",
    "dtable-icon-extend",
    "dtable-icon-delete-row",
    "dtable-icon-delete-column",
    "dtable-icon-insert-row-above",
    "dtable-icon-insert-row-below",
    "dtable-icon-insert-row-left",
    "dtable-icon-insert-row-right",
    "dtable-icon-add_members",
    "dtable-icon-linkage",
    "dtable-icon-history",
    "dtable-icon-find_fill",
    "dtable-icon-data-processing",
    "dtable-icon-page-designer",
    "dtable-icon-rules",
    "dtable-icon-database",
    "dtable-icon-rate",
    "dtable-icon-modify-row",
    "dtable-icon-enlarge1",
    "dtable-icon-shrink",
    "dtable-icon-default-scale",
    "dtable-icon-current-location",
    "dtable-icon-edit",
    "dtable-icon-link-formulas",
    "dtable-icon-folders",
    "dtable-icon-row-height-quadruple",
    "dtable-icon-row-height-triple",
    "dtable-icon-row-height-double",
    "dtable-icon-row-height-default",
    "dtable-icon-data-collection-table",
    "dtable-icon-repeat-value-highlight",
    "dtable-icon-enterprise-wechat1",
    "dtable-icon-button",
    "dtable-icon-send-backward",
    "dtable-icon-bring-forward",
    "dtable-icon-bring-to-front",
    "dtable-icon-send-to-back",
    "dtable-icon-transfer-deposit",
    "dtable-icon-revoke",
    "dtable-icon-redo",
    "dtable-icon-tip",
    "dtable-icon-currency",
    "dtable-icon-narrow",
    "dtable-icon-enlarge",
    "dtable-icon-page-size",
    "dtable-icon-duration",
    "dtable-icon-system-message",
    "dtable-icon-recycle-bin",
    "dtable-icon-abuse-report",
    "dtable-icon-email",
    "dtable-icon-share-with-me",
    "dtable-icon-department",
    "dtable-icon-api",
    "dtable-icon-help-center",
    "dtable-icon-ask-community",
    "dtable-icon-keyboard-shortcuts",
    "dtable-icon-member-free",
    "dtable-icon-down",
    "dtable-icon-up",
    "dtable-icon-list-view",
    "dtable-icon-script",
    "dtable-icon-implement",
    "dtable-icon-autonumber",
    "dtable-icon-color",
    "dtable-icon-wechat",
    "dtable-icon-condition-set",
    "dtable-icon-full-screen",
    "dtable-icon-video",
    "dtable-icon-retry",
    "dtable-icon-print",
    "dtable-icon-batch-replacement",
    "dtable-icon-permissions",
    "dtable-icon-sync",
    "dtable-icon-member",
    "dtable-icon-organization-name",
    "dtable-icon-star",
    "dtable-icon-todo",
    "dtable-icon-rotate",
    "dtable-icon-comment",
    "dtable-icon-camera",
    "dtable-icon-check-circle",
    "dtable-icon-exclamation-circle",
    "dtable-icon-exclamation-triangle",
    "dtable-icon-eye",
    "dtable-icon-eye-slash",
    "dtable-icon-random-generation",
    "dtable-icon-hi",
    "dtable-icon-leave",
    "dtable-icon-history-mirror-image",
    "dtable-icon-location",
    "dtable-icon-insert-left",
    "dtable-icon-insert-right",
    "dtable-icon-ascending-order",
    "dtable-icon-descending-order",
    "dtable-icon-creat-empty-table",
    "dtable-icon-import",
    "dtable-icon-picture-linear",
    "dtable-icon-creation-time",
    "dtable-icon-upload",
    "dtable-icon-update",
    "dtable-icon-assembly",
    "dtable-icon-description",
    "dtable-icon-enterprise-wechat",
    "dtable-icon-statistic",
    "dtable-icon-common-dataset",
    "dtable-icon-link-common-dataset",
    "dtable-icon-notice",
    "dtable-icon-all-read",
    "dtable-icon-modification-record",
    "dtable-icon-copy-link",
    "dtable-icon-retract-com",
    "dtable-icon-mark",
    "dtable-icon-open-com",
    "dtable-icon-export",
    "dtable-icon-copy",
    "dtable-icon-display",
    "dtable-icon-retract",
    "dtable-icon-label",
    "dtable-icon-personal",
    "dtable-icon-organization1",
    "dtable-icon-left",
    "dtable-icon-right",
    "dtable-icon-link-other-record",
    "dtable-icon-url",
    "dtable-icon-calendar",
    "dtable-icon-use-help",
    "dtable-icon-relation",
    "dtable-icon-formula",
    "dtable-icon-token",
    "dtable-icon-x-",
    "dtable-icon-bell",
    "dtable-icon-confirm",
    "dtable-icon-cancel",
    "dtable-icon-menu",
    "dtable-icon-x",
    "dtable-icon-settings",
    "dtable-icon-admin-op-log",
    "dtable-icon-groups",
    "dtable-icon-info",
    "dtable-icon-mine",
    "dtable-icon-libraries",
    "dtable-icon-organization",
    "dtable-icon-discussion",
    "dtable-icon-add-line",
    "dtable-icon-table",
    "dtable-icon-invite",
    "dtable-icon-broken-line",
    "dtable-icon-pie",
    "dtable-icon-modify-column-type",
    "dtable-icon-journal",
    "dtable-icon-freeze",
    "dtable-icon-cancel-freeze",
    "dtable-icon-permission-setting",
    "dtable-icon-share",
    "dtable-icon-set-up",
    "dtable-icon-form",
    "dtable-icon-group",
    "dtable-icon-statistics",
    "dtable-icon-apps",
    "dtable-icon-templates",
    "dtable-icon-files",
    "dtable-icon-upward",
    "dtable-icon-unlock",
    "dtable-icon-lock",
    "dtable-icon-creator",
    "dtable-icon-collaborator",
    "dtable-icon-hide",
    "dtable-icon-switch",
    "dtable-icon-add-table",
    "dtable-icon-add",
    "dtable-icon-add-square",
    "dtable-icon-more-vertical",
    "dtable-icon-more-level",
    "dtable-icon-card-view",
    "dtable-icon-search",
    "dtable-icon-delete-table",
    "dtable-icon-folder",
    "dtable-icon-file",
    "dtable-icon-filter",
    "dtable-icon-dtable-logo",
    "dtable-icon-attachments",
    "dtable-icon-long-text",
    "dtable-icon-multiple-selection",
    "dtable-icon-check-mark",
    "dtable-icon-return",
    "dtable-icon-main-view",
    "dtable-icon-sort",
    "dtable-icon-single-election",
    "dtable-icon-fork-number",
    "dtable-icon-add-files",
    "dtable-icon-drag",
    "dtable-icon-open",
    "dtable-icon-download",
    "dtable-icon-right-slide",
    "dtable-icon-left-slide",
    "dtable-icon-picture",
    "dtable-icon-single-line-text",
    "dtable-icon-check-square-solid",
    "dtable-icon-rename",
    "dtable-icon-drop-down",
    "dtable-icon-rich-text",
    "dtable-icon-number",
    "dtable-icon-file-alt-solid",
    "dtable-icon-calendar-alt-solid",
  ];

  // Filter icons based on the search query
  const filteredIcons = icons.filter((icon) => {
    return icon.includes(query.toLowerCase());
  });

  var output = document.getElementById("iconResults");
  var listHtml = filteredIcons.map((icon) => `<li>${icon}</li>`).join("");
  output.innerHTML = `<ul>${listHtml}</ul>`;
}

function hexToRgba(hex) {
  hex = hex.replace(/^#/, "");
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `${r},${g},${b}`;
}

function update_custom_color(version) {
  var color = document.getElementById("cc_" + version).value;
  var rgba_color = hexToRgba(color);

  console.log(
    "Let me update the color in the css code to " +
      color +
      ", rgba(" +
      rgba_color +
      ") for version " +
      version
  );
  var divElement = document.getElementById("cc_output_" + version);
  var codeElement = divElement.querySelector("code");

  if (version === "v5.3") {
    var css_input = `#lang-context-selector li:hover {  background-color: ##maincolor##;}
#quota-bar .usage {  display: inline-block;  height: 100%;  vertical-align: top;  background: ##maincolor##;}
.a-simulate {  color: ##maincolor## !important;  text-decoration: none;  font-weight: normal;  cursor: pointer;}
.access-control-qr-code-wrapper .qrcode-copy-btn:active,.access-control-qr-code-wrapper .qrcode-copy-btn:hover{background-color:##maincolor##!important;color:#fff}
.access-control-qr-code-wrapper .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.account-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.account-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.account-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.activity-department-item .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.add-account .add-account-btn,.edit-account .edit-account-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container,.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container:hover{border-color:##maincolor##}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-name{color:##maincolor##}
.add-page-dialog .steps-header .step-nav.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.add-share-permission .add-share-permission-btn,.edit-share-permission .edit-share-permission-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-user-select-all-container .select-all,.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.add-workflow-task-dialog .add-workflow-task-body .submit-workflow.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.app-folder-tree .app-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.app-form-settings .app-form-settings-header-tab.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.app-form-settings .table-setting .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.app-group-container .load-more-apps .load-more-apps-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.app-icon-settings-popover-nav .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):active{background-color:##maincolor##}
.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):focus,.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):focus-visible{background-color:##maincolor##;border:1px solid ##maincolor##;box-shadow:none;outline:none}
.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):active{background-color:#e6e6e6;border:1px solid ##maincolor##;color:##maincolor##}
.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):focus,.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):focus-visible{background-color:#fff;border:1px solid ##maincolor##;box-shadow:none;color:##maincolor##;outline:none}
.app-init_app-init-btns__nGbPX button:first-child:hover{border:1px solid ##maincolor##;color:##maincolor##}
.app-init_app-init-btns__nGbPX button:first-child{color:##maincolor##}
.app-init_app-init-btns__nGbPX button{border:1px solid ##maincolor##;border-radius:3px;flex:0 0 auto;font-size:13px;font-weight:400}
.app-map-dialog-cn .dtable-app-column-setting-item-title .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer;font-weight:450}
.app-select-page-item-popover .popover .app-select-page-item-popover-image-container{border:2px solid ##maincolor##;border-radius:3px;overflow:hidden}
.app-settings-access-control .app-qr-code-share-btn.btn.btn-secondary:active,.app-settings-access-control .app-qr-code-share-btn:hover{background-color:##maincolor##;box-shadow:none;color:#fff}
.app-settings-access-control .app-qr-code-share-btn{border-color:##maincolor##;color:##maincolor##;margin-left:.5rem;padding:6px}
.app-settings-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-settings-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;color:#fff}
.archive-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.archive-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.archive-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.attachments-management-widget .dirent-table-content .dirent-item-name{color:##maincolor##}
.attachments-management-widget .path-container .path-link{color:##maincolor##}
.attachments-management-widget .tree-node-inner.tree-node-hight-light .tree-node-right-icon .dtable-dirent-dropdown{background-color:##maincolor##}
.attachments-management-widget .tree-view .tree-node-inner.tree-node-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.automatic-action-addition-toggle{color:##maincolor##;cursor:pointer}
.badge-primary{color:#fff;background-color:##maincolor##}
.base-status-dialog .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none}
.base-status-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.batch-popover .batch-popover-footer .replace-search-item{background:##maincolor##;border:1px solid #e4e4e4;color:#fff}
.bg-primary{background-color:##maincolor## !important}
.big-data-import-process .am-progress-bar{background-color:##maincolor##;border:none;border-radius:5px;height:10px!important}
.big-screen-menu .menu-item.active{background:#ffefe0;color:##maincolor##}
.border-primary{border-color:##maincolor## !important}
.btn-link{font-weight:400;color:##maincolor##;text-decoration:none}
.btn-outline-primary,.btn-primary {  color: #fff;  background-color: ##maincolor##;  border-color: ##maincolor##;}
.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:##maincolor##;background-color:transparent}
.btn-outline-primary:focus,.btn-outline-primary.focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active,.btn-outline-primary:not(:disabled):not(.disabled).active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,.btn-outline-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-outline-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-universal-01.disabled,.btn-outline-universal-01:disabled{background-color:initial;color:##maincolor##}
.btn-outline-universal-01.focus,.btn-outline-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active,.btn-outline-universal-01:not(:disabled):not(.disabled):active,.show>.btn-outline-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active:focus,.btn-outline-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01{background-color:initial;background-image:none;border-color:##maincolor##;color:##maincolor##}
.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:focus,.btn-primary.focus{color:#fff;background-color:##maincolor##;border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active:focus,.btn-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01.disabled,.btn-universal-01:disabled{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01.focus,.btn-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active,.btn-universal-01:not(:disabled):not(.disabled):active,.show>.btn-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active:focus,.btn-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn:focus,.btn.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.calendar-modal-portal .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#212529;cursor:pointer}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#444;cursor:pointer}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#212529;cursor:default}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#444;cursor:default}
.chat-message:after{content:"";position:absolute;right:-5px;top:7px;border-bottom:6px solid transparent;border-left:6px solid ##maincolor##;border-top:6px solid transparent}
.chat-message{position:relative;display:inline-block;background-color:##maincolor##;color:#fff;font-size:.875rem;padding:.375rem .5rem;border-radius:3px;white-space:normal;text-align:left;margin:0 .5rem 0 2.5rem;line-height:1.4}
.color-setting-dialog .rule-color-container .color-setting-add-color{color:##maincolor##;cursor:pointer}
.colorinput-input:focus~.colorinput-color{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.comment-footer-container .comment-collaborator-tip:hover,.comment-footer-container .comment-image-tip:hover{color:##maincolor##}
.comment-header .comment-header-tool .comment-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.copy-dtable-dialog .custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.cur-view-container .heading a{color:##maincolor##}
.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:##maincolor##;background-color:##maincolor##}
.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:##maincolor##;background-color:##maincolor##}
.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-range::-moz-range-progress{height:2px;background:##maincolor##;border:0;margin-top:0}
.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-ms-fill-lower{background:##maincolor##;border-radius:0}
.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:2px;margin-left:2px;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-webkit-slider-runnable-track{background:##maincolor##;content:"";height:2px;pointer-events:none}
.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range:focus::-moz-range-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-ms-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-webkit-slider-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-select:focus{border-color:#1991eb;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.custom-switch .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.custom-switch-input:focus~.custom-switch-indicator{box-shadow:0 0 0 2px rgba(##mainrgba##,.25);border-color:##maincolor##}
.delete-record-description-view .restore{color:##maincolor##;display:inline-block;overflow:hidden;text-align:right;text-overflow:ellipsis;white-space:nowrap;width:20%}
.department-dialog-content .department-dialog-group .group-item.tr-highlight:hover,.department-dialog-content .department-dialog-group .tr-highlight{background-color:##maincolor##;color:#fff}
.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.department-single-select-formatter .department-avatar-container {  background: ##maincolor##;  border-radius: 50%;  height: 18px;  padding: 2px 2px 3px;  width: 18px}
.department-single-select-formatter .department-avatar-container, .selected-departments .department-avatar-container, .selected-option-show .department-avatar-container {  background: ##maincolor##;  border-radius: 50%;  height: 18px;  padding: 2px 2px 3px;  width: 18px}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container,.selected-departments.dtable-ui .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.departments-tree-panel .departments-v2-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.digital-sign-view-panel-operations .mobile-btn-clear{color:##maincolor##}
.download-file-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.download-file-dialog .download-files-item .downloading-file-cancel{color:##maincolor##;opacity:.8}
.download-files-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:##maincolor##}
.dropdown-item:focus{color:#fff;background-color:##maincolor##}
.dropdown-item:hover{color:#fff;background-color:##maincolor##}
.dtable-app-qr-code-wrapper .qrcode-copy-btn:active,.dtable-app-qr-code-wrapper .qrcode-copy-btn:hover{background-color:##maincolor##!important;color:#fff}
.dtable-app-qr-code-wrapper .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.dtable-edit-form .form-header-title .dtable-icon-form{color:##maincolor##;font-size:24px}
.dtable-excel-preview-dialog .dtable-excel-preview-dialog-nav{background-color:##maincolor##;margin:0;padding:10px 10px 0}
.dtable-external-links-content .external-link-item a{color:##maincolor##}
.dtable-file-addition-container .dtable-file-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-file-previewer-header .files-operation-content{color:##maincolor##}
.dtable-image-addition-container .dtable-image-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-path-container .dtable-path-link{color:##maincolor##}
.dtable-plugin-setting-item .select-group .select-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.dtable-plugin-setting-item.order-setting .widget-zIndex-content .widget-zIndex-item:hover:not(.disabled){background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer;z-index:0}
.dtable-radio .dtable-radio-selected-indicator.dtable-radio-indicator-disable{background-color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator{background-color:##maincolor##;border:initial!important}
.dtable-refresh{color:##maincolor##!important;cursor:pointer}
.dtable-scripts-module .dtable-scripts-export:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.dtable-scripts-module .dtable-scripts-export{background-color:#fff;color:##maincolor##;width:130px}
.dtable-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.editor-column-popover-inner .submitSelect{box-shadow:0 0 0 2px ##maincolor##80}
.field-setting .field-setting-banner .show-all-button{color:##maincolor##;cursor:pointer;font-size:12px}
.field-settings .field-settings-header .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer}
.file-chooser-content-container .file-chooser-left .select-file-chooser-nav-item{background-color:##maincolor##!important;color:#fff}
.file-chooser-item .item-active{background:##maincolor##!important;border-radius:2px;box-shadow:inset 0 0 1px #999;color:#fff}
.file-management-toolbar .select-file-management-item{color:##maincolor##}
.file-upload-item .upload-operation .error-uploaded{color:##maincolor##;cursor:pointer}
.folder-tree .folder-item.folder-item-selected{background-color:##maincolor##!important;color:#fff}
.form-help:hover,.form-help[aria-describedby]{background:##maincolor##;color:#fff}
.form-items-container .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.form-items-container .drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.form-qr-code-wrapper .qrcode-copy-btn:active,.form-qr-code-wrapper .qrcode-copy-btn:hover{background-color:##maincolor##!important;color:#fff}
.form-qr-code-wrapper .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.form-remark-background-setting .no-active-option .select-group-item:hover{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer}
.form-remark-background-setting .select-group-container .select-group-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.formula-format-editor-popover .btn-re-detect{align-items:center;border-color:##maincolor##;display:flex;font-weight:400;height:30px;justify-content:center;margin:0 0 0 15px;padding-bottom:0;padding-top:0}
.formula-format-editor-popover .btn-secondary:not(:disabled):not(.disabled):active{background-color:initial;border-color:##maincolor##;color:##maincolor##}
.formula-result-type-detector .btn-re-detect{align-items:center;color:##maincolor##;display:flex;font-weight:400;justify-content:center}
.gallery-app-settings .mobile-select-all{color:##maincolor##}
.grid-pane-divider .tooltip-pane-divider .freeze-columns-length{color:##maincolor##;font-weight:500;padding:0 4px}
.group-manage-trash-dialog .trash-dtables .trash-table-restore{color:##maincolor##;cursor:pointer}
.header-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.image-view i{animation:rotate 1.5s ease infinite;color:##maincolor##;font-size:30px;height:100%;line-height:150px;text-align:center;width:100%}
.imagecheck-figure:before{content:"";position:absolute;top:.25rem;left:.25rem;display:block;width:1rem;height:1rem;pointer-events:none;user-select:none;background:##maincolor## url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'><path fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/></svg>") no-repeat center center/50% 50%;color:#fff;z-index:1;border-radius:3px;opacity:0;transition:.3s opacity}
.imagecheck-input:focus~.imagecheck-figure{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.info-bar-info span:first-child{color:##maincolor##}
.introduction-video .video-js .vjs-control-bar{background-color:##maincolor##cc}
.introduction-video-mobile .introduction-video-btn{background-color:##maincolor##;border-radius:26px;margin-top:5rem}
.link-records-editor .create-link-records .new-record:hover{background:#fff;border-color:##maincolor##}
.link-records-editor .create-link-records .new-record{align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##;display:inline-flex;justify-content:center;padding:0 10px;width:100%}
.list-group-item.active{z-index:2;color:##maincolor##;background-color:#fffaf5;border-color:rgba(0,40,100,.12)}
.list-group-transparent .list-group-item.active{background:rgba(##mainrgba##,.06);font-weight:600}
.login-panel .login-panel-register-type:hover {  border-color: ##maincolor##;}
.mobile-float-icon{background-color:##maincolor##;border:none;border-radius:50%;bottom:42px;box-shadow:0 3px 5px -1px #ffa25233,0 6px 10px 0 #ffa25224,0 1px 18px 0 #ffa2521f;color:#999;cursor:pointer;display:flex;font-size:16px;height:50px;position:fixed;right:10px;-webkit-user-select:none;user-select:none;width:50px}
.mobile-main-panel .selected-tab-item{color:##maincolor##;font-size:22px}
.mobile-notification-modal .mobile-notification-tool .notification-type-tabs .tab-item.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##}
.mobile-share-table .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile-share-view .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile_dtable-map-plugin-header-btn-highlight__dYdDa{color:##maincolor##}
.mobile_mobile-select-all__9qLb-{color:##maincolor##}
.mobile_mobile-select-all__esQ2M{color:##maincolor##}
.nav .nav-item .nav-link.active {  color: ##maincolor##;  text-decoration: none;  border-bottom: 0.125rem solid ##maincolor##;}
.nav-pills .nav-item .nav-link.active {  background-color: ##maincolor##;  color: #fff;  border: none;}
.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:##maincolor##}
.nav-tabs .nav-submenu .nav-item.active{color:##maincolor##}
.new-narrow-panel .hd {  color: #fff;  font-size: 16px;  padding: 5px 20px;  background: ##maincolor##;  border-bottom: 1px solid #d5d5d5;}
.new-narrow-panel .hd{color:#fff;font-size:16px;padding:5px 20px;background:##maincolor##;border-bottom:1px solid #d5d5d5}
.no-active-option .select-group-item:hover{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer}
.notification-container .notification-body .nav .nav-item .nav-link.active{color:##maincolor##!important}
.op-target {  color: ##maincolor##;  word-wrap: break-word;}
.operation-table{color:##maincolor##;flex:1 1;max-width:100px}
.operations-log-dialog .operation-tags-container .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.option-editor-footer .item-text{color:##maincolor##;cursor:pointer}
.option-group .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.option.option-active {  background-color: ##maincolor##;  color: #fff;  cursor: pointer}
.option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.order-item .order-price{color:##maincolor##;font-size:26px;font-weight:500}
.org-admin .main-panel .nav .nav-item .nav-link.active,.sys-admin .main-panel .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.org-info-content .am-progress-bar{background-color:##maincolor##;border-radius:5px;height:6px!important}
.outline-h2:hover{color:##maincolor##}
.outline-h3:hover{color:##maincolor##}
.page-designer-add-elements-btn-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.page-designer-box-editor .page-designer-sub-block-element-wrapper[drag-over]{border-color:##maincolor##!important}
.page-designer-drag-beside-element-tips{background-color:##maincolor##;height:calc(100% + 12px);position:absolute;top:-6px;width:2px;z-index:1}
.page-designer-drag-closing-section-tips{background-color:##maincolor##;height:1px;left:0;position:absolute;width:100%;z-index:1}
.page-designer-drag-into-section-tips{background-color:initial!important;border:1px dashed ##maincolor##;height:100%;position:absolute;top:0;z-index:1}
.page-designer-editor .dragging-element-valid-position-tip{background-color:initial!important;border:1px dashed ##maincolor##;z-index:1}
.page-designer-editor .page-designer-element-container .drag-handler{background-color:##maincolor##;border-radius:3px}
.page-designer-editor .page-designer-element-container .right-size-regulator-handler{background:#0000;border-bottom:5px solid ##maincolor##;border-radius:0 0 8px 0;border-right:5px solid ##maincolor##;bottom:-4px;content:"";cursor:se-resize;height:12px;right:-4px;width:12px}
.page-designer-editor .page-designer-section .page-designer-element-container.editing-element{border-color:##maincolor##}
.page-designer-editor .page-designer-section .page-designer-section-container.editing-section{border:2px solid ##maincolor##}
.page-designer-element-setting-type.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.page-designer-horizontal-mark-line{background-color:##maincolor##;height:2px;position:fixed;z-index:9999}
.page-item.active .page-link{z-index:3;color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.page-link:focus{z-index:3;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.participants .add-participants i{background-color:#fff;border:2px solid #fff;border-radius:50%;color:##maincolor##;font-size:16px}
.password-reset-panel .password-reset-panel-bottom-container a,.login-panel .login-panel-bottom-container a {  color: ##maincolor##;  white-space: nowrap;}
.path-link {  color: ##maincolor## !important;  text-decoration: none;}
.path-toolbar .toolbar-item a:hover{color:##maincolor##;text-decoration:none}
.plan-description-item .plan-description{color:##maincolor##;font-size:20px;font-weight:500}
.plan-description-item.plan-selected{background-color:#fff5eb;border-color:##maincolor##;border-width:2px}
.price-version-container-header .price-version-plan-name{border-bottom:1px solid ##maincolor##;font-size:1.5rem;padding:1rem 0}
.progress-bar{display:flex;flex-direction:column;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:##maincolor##;transition:width .6s ease}
.rbc-btn-group .rbc-tool-btn.today-btn-disabled,.rbc-btn-group .rbc-tool-btn:hover{background-color:##maincolor##;border:1px solid ##maincolor##;color:#fff}
.rbc-btn-group .rbc-tool-icon:hover{background-color:##maincolor##;color:#fff}
.rbc-btn-group .view-type-list .rbc-view-type.rbc-active{background:##maincolor##;color:#fff}
.rbc-calendar .seatable-plugin-calendar-insert-row{align-items:center;background-color:##maincolor##;border:none;border-radius:50%;bottom:10px;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);color:#fff;cursor:pointer;display:flex;font-size:20px;height:50px;justify-content:center;position:absolute;right:5px;-webkit-user-select:none;user-select:none;width:50px;z-index:5}
.rbc-current-time-indicator-label{border-left:0!important;bottom:-10px;color:##maincolor##;font-size:14px;font-weight:400;padding:0 5px;position:absolute}
.rbc-current-time-indicator{background-color:##maincolor##;border-color:##maincolor##;height:1px;pointer-events:none;position:absolute;right:0;z-index:3}
.rbc-now .rbc-date-context{background-color:##maincolor##;color:#fff}
.rbc-year-view .day-events{background-color:##maincolor##;border-radius:50%;height:4px;left:16px;position:absolute;top:22px;width:4px}
.rbc-year-view .rbc-current{background-color:##maincolor##;border-radius:2px;color:#fff}
.rbc-year-view .rbc-year-month-header{color:##maincolor##;padding-left:10px}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:unset}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.rc-slider-handle:hover{border-color:##maincolor##}
.rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.rc-slider-handle{position:absolute;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;margin-top:-5px;cursor:grab;border-radius:50%;border:2px solid ##maincolor##;background-color:#fff;touch-action:pan-x}
.rc-slider-track{background-color:##maincolor##;left:0}
.rc-slider-track{left:0;background-color:##maincolor##}
.react-contextmenu-item.react-contextmenu-item--active,.react-contextmenu-item.react-contextmenu-item--selected,.react-contextmenu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.restore-base-button{color:##maincolor##;min-width:35px;padding-left:5px;text-align:right}
.row-color-duplicate-value-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{border-bottom:2px solid ##maincolor##;color:#212529}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{color:#212529;border-bottom:2px solid ##maincolor##}
.sdoc-comment-drawer .add-comments-participants .sdocfont {  border-radius: 50%;  color: ##maincolor##;  font-size: 16px}
.sdoc-comment-list-container .comment-ui-container .comment-operation .sdoc-confirm {  color: ##maincolor##;  font-weight: 800}
.sdoc-file-select-dialog .highlight-bg-color {  background-color: ##maincolor##;  border-color: ##maincolor##}
.sdoc-file-select-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sdoc-operator-folder .sdoc-dropdown-menu .sdoc-dropdown-menu-item .sdoc-full-width-mode-wrapper .custom-switch .custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.sdoc-operator-folder .sdoc-dropdown-menu .sdoc-dropdown-menu-item .sdoc-full-width-mode-wrapper .custom-switch .custom-switch-input:focus~.custom-switch-indicator{border-color:##maincolor##;box-shadow:0 0 0 2px ##maincolor##40}
.sdoc-outline-item.active {  color: ##maincolor##}
.sdoc-outline-item.active{color:##maincolor##}
.sdoc-popover-menu__item:hover {  background-color: ##maincolor##;  color: #fff}
.sdoc-popover-menu__item:hover{background-color:##maincolor##;color:#fff}
.sdoc-tip-dialog .highlight-bg-color {  background-color: ##maincolor##;  border-color: ##maincolor##}
.sdoc-tip-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sea-ai-assistant-auto-add-members-dialog .ai-assistant-settings-container .sea-ai-assistant-task-table-cell-content{align-items:center;color:##maincolor##;cursor:pointer;display:flex;justify-content:flex-start}
.sea-ai-assistant-chat-file-input-container .sea-ai-assistant-chat-file-upload-icon{background-color:##maincolor##!important;border-radius:8px;height:32px;width:32px}
.sea-ai-assistant-chat-input-container:has(.message-input:focus-visible){border-color:##maincolor##}
.sea-ai-assistant-instructions-wrapper .instructions-content .instruction:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-message-content .sea-ai-assistant-use-tip-order-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-settings-dialog .ai-assistant-settings-sidebar .ai-assistant-settings-sidebar-item.active-item{background-color:##maincolor##!important;color:#fff}
.sea-ai-assistant-settings-dialog .settings-container-header-right{align-items:center;color:##maincolor##;cursor:pointer;display:flex;-webkit-user-select:none;user-select:none}
.sea-ai-outline-btn:not(.disabled):hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.sea-ai-outline-btn{background-color:#fff;border:1px solid ##maincolor##;border-radius:3px;color:##maincolor##;font-size:13px;font-weight:500;line-height:1;max-width:100%;min-width:24px;padding:6px 12px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}
.sea-chart-settings .rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.sea-chart-settings .rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.sea-chart-settings .rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.sea-chart-settings .rc-slider-handle:hover{border-color:##maincolor##}
.sea-chart-settings .rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.sea-chart-settings .rc-slider-track{background-color:##maincolor##;border-radius:6px;height:4px;left:0;position:absolute}
.sea-chart-settings .sea-chart-settings-type .sea-chart-settings-type-item.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.sea-chart-types-dialog .sea-chart-chart-categories-nav .sea-chart-chart-cat-nav-item-container.sea-chart-icon-highlight .chart-icon{color:##maincolor##}
.sea-chart-types-dialog .sea-chart-type-item.selected{border-color:##maincolor##}
.search-result-container .search-result-item:hover{background-color:#eee;border-left:2px solid ##maincolor##}
.search-result-list .item-content .item-name{color:##maincolor##!important}
.search-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.seatable-app-form-settings .seatable-app-form-content .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.seatable-app-form-settings .seatable-app-form-content .seatable-app-form-drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.seatable-app-page .dtable-plugin-column-setting-item-title .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px;font-weight:450}
.seatable-app-table.context-dropdown-menu .context-menu-item:focus{background-color:##maincolor##;color:#fff}
.seatable-app-table.context-dropdown-menu .context-menu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.seatable-bg-orange {  background-color: ##maincolor## !important;}
.seatable-border-color-orange {  border: ##maincolor## !important;}
.seatable-form-app-settings-panel .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.seatable-icon-orange {  color: ##maincolor## !important;  fill: ##maincolor## !important;}
.seatable-share-form .form-content .submit-form.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.select-button-action-popover .select-button-action-list .select-button-action-item.active{background:##maincolor##;border-radius:4px;color:#fff}
.select-columns-dialog .column-option:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.select-columns-dialog .select-columns{color:##maincolor##;cursor:pointer;font-size:13px;font-weight:500}
.select-group-container .select-group-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.select-page-icons .select-page-icon-active,.select-page-icons .select-page-icon-active:hover{background-color:##maincolor##}
.select-user-modal .modal-select-user-header .select-user-close-btn{color:##maincolor##;font-size:14px;font-weight:400;position:absolute;right:15px}
.selectgroup-input:checked+.selectgroup-button{border-color:##maincolor##;z-index:1;color:##maincolor##;background:#fff2e6}
.selectgroup-input:focus+.selectgroup-button{border-color:##maincolor##;z-index:2;color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.setting-btn.active{background-color:##maincolor##;color:#fff}
.share-add-btn-container .share-add-btn{background:#fff;background-image:none;border-color:##maincolor##;color:##maincolor##;margin-top:10px;outline:none;width:90%}
.share-dialog .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.share-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.share-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.share-dialog-with-qr-code .dtable-qr-code-share-btn.btn.btn-secondary:active,.share-dialog-with-qr-code .dtable-qr-code-share-btn:hover{background-color:##maincolor##;box-shadow:none;color:#fff}
.share-dialog-with-qr-code .dtable-qr-code-share-btn{border-color:##maincolor##;color:##maincolor##;float:right;margin-left:.5rem;padding:5px}
.share-dialog-with-qr-code .share-qrcode .qrcode-copy-btn:active{background-color:##maincolor##;color:#fff}
.share-dialog-with-qr-code .share-qrcode .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.share-link-dialog .share-link-info .share-link-content{color:##maincolor##;cursor:pointer;display:inline-block;width:100%}
.share-link-dialog .share-link-info .share-link-content{display:inline-block;width:100%;color:##maincolor##;cursor:pointer}
.share-permissions-manage .share-permissions-manage-header button{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.share-table-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.share-view-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.side-nav-footer .join-us-icon{color:##maincolor##;font-size:20px;margin-right:10px}
.side-panel .nav-link.active{color:##maincolor##}
.single-record-page-record-qrcode-container .qrcode-copy-btn:active{background-color:##maincolor##!important;color:#fff}
.single-record-page-record-qrcode-container .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.single-record-page-setting-element-types-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.snapshot-item .snapshot-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-chart-addition-dialog .selected-statistic-type-item{background-color:##maincolor##;color:#fff}
.statistic-chart-preview .dtable-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:var(--font-hover-color)}
.submit-map-editor{background-color:#fff;border:1px solid #0000;border-radius:3px;box-shadow:0 0 12px #0000004d;color:##maincolor##;cursor:pointer;display:inline-block;font-size:.875rem;height:38px;line-height:1.8461538462;margin-left:16px;padding:.375rem .75rem;text-align:center;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}
.subscription-container .text-orange{color:##maincolor##!important}
.subscription-submit{background-color:##maincolor##;border-radius:5px;color:#fff;font-size:16px;height:44px;margin-bottom:10px;width:100%}
.switch-refresh-active{background-color:##maincolor##}
.table-calendar-link:before{content:"";width:4px;height:4px;position:absolute;left:.25rem;top:.25rem;border-radius:50px;background:##maincolor##}
.table-calendar-link:hover{color:#fff;text-decoration:none;background:##maincolor##;transition:.3s background}
.table-item-more-operation .advanced-menu.show>.btn-secondary.dropdown-toggle{background-color:##maincolor##;color:#fff}
.table-setting.form-setting-all-required{color:##maincolor##;cursor:pointer;font-size:14px}
.tables-tabs-content .tabs-nav-scroll-after{background:linear-gradient(90deg,##maincolor##33,##maincolor##99,##maincolor##);right:10px;top:0;width:20px}
.tables-tabs-content .tabs-nav-scroll-before{background:linear-gradient(270deg,##maincolor##33,##maincolor##99,##maincolor##);left:0;top:0;width:25px;z-index:5}
.tag-primary{background-color:##maincolor##;color:#fff}
.template-categories .template-category-item.active{color:##maincolor##;text-decoration:underline}
.template-categories .template-category-item:hover{color:##maincolor##}
.template-list-container .template-container:hover{background:#fffbf8;border-color:##maincolor##;cursor:pointer}
.template-list-dialog .modal-header .modal-header-template{color:##maincolor##;font-size:24px;line-height:1;margin-right:10px}
.text-editor-container .text-editor-dropdown-item:hover{background-color:##maincolor##;color:#fff}
.text-primary{color:##maincolor## !important}
.tool-popover .tool-item:hover,.tool-popover .tool-item:hover dd,.tool-popover .tool-item:hover dt,.tool-popover .tool-item:hover span{background-color:##maincolor##;color:#fff}
.trash-table .trash-table-base-detail .trash-table-restore-mobile{color:##maincolor##;cursor:pointer}
.tree-view-trash-tab.active,.tree-view-trash-tab.active .dtable-font,.tree-view-trash-tab.active svg{background-color:##maincolor##;border-radius:4px;color:#fff}
.user-input-chat .sea-ai-assistant-message-content{background-color:##maincolor##;border-radius:6px 0 6px 6px;color:#fafafa}
.user-setting-nav .nav-item .nav-link:hover{color:##maincolor##}
.user-setting-nav .nav-item.active .nav-link{border-left-color:##maincolor##;color:##maincolor##}
.view-edit-popover-header .remove-icon-button{color:##maincolor##}
.workflow-app-container .participants-type-container .selected-participants-type-item{background-color:#e5a1521a;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.workflow-app-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.workflow-folder-tree .workflow-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.workflow-group-container .load-more-workflows .load-more-workflows-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.workflow-list-view .list-view-sidebar li{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .share-item-view-sidebar .sidebar-item-active,.workflow-list-view .specific-list-view-sidebar .sidebar-item-active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .view-header .dtable-icon-workflow{color:##maincolor##}
.workflow-node-dropdown .dropdown-item:hover,.workflow-node-dropdown .selected-dropdown-item{background-color:##maincolor##;color:#fff}
.workflow-task-dialog .workflow-task-nodes-logs .workflow-task-node-log-selector.selected{border-bottom:2px solid ##maincolor##;color:#212529}
.workflow-task-list-modal .workflow-task-list-modal-header-left .dtable-icon-workflow{color:##maincolor##;font-size:20px;font-weight:500}
.workflow-task-list-toolbar-container .task-date-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-logs .workflow-task-log .workflow-task-log-icon{color:##maincolor##;margin-right:5px}
.workflow-task-nodes-popover .workflow-task-nodes .workflow-task-node-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-pending-dialog .workflow-task-flow-header .flow-chart,.workflow-task-pending-dialog .workflow-task-flow-header .task-logs{border-bottom:2px solid ##maincolor##;color:#212529}
.workspace .dropdown-item:not(.disabled):focus .dtable-font,.workspace .dropdown-item:not(.disabled):hover .dtable-font{background-color:##maincolor##!important;color:#fff!important}
.seatable-text-orange {  color: ##maincolor## !important;}
a {  color: ##maincolor##;}
a.badge-primary:focus,a.badge-primary.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
a.badge-primary:hover,a.badge-primary:focus{color:#fff;background-color:##maincolor##}
a.bg-primary:hover,a.bg-primary:focus,button.bg-primary:hover,button.bg-primary:focus{background-color:##maincolor## !important}
a:focus,a:hover {  color: ##maincolor##;}
a:hover{color:##maincolor##}
a{color:##maincolor##;text-decoration:none;background-color:transparent}`;
  } else if (version === "v5.2") {
    var css_input = `#lang-context-selector li:hover {  background-color: ##maincolor##;}
#quota-bar .usage {  display: inline-block;  height: 100%;  vertical-align: top;  background: ##maincolor##;}
.a-simulate {  color: ##maincolor## !important;  text-decoration: none;  font-weight: normal;  cursor: pointer;}
.access-control-qr-code-wrapper .qrcode-copy-btn:active,.access-control-qr-code-wrapper .qrcode-copy-btn:hover{background-color:##maincolor##!important;color:#fff}
.access-control-qr-code-wrapper .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.account-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.account-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.account-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.activity-department-item .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.add-account .add-account-btn,.edit-account .edit-account-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container,.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container:hover{border-color:##maincolor##}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-name{color:##maincolor##}
.add-page-dialog .steps-header .step-nav.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.add-share-permission .add-share-permission-btn,.edit-share-permission .edit-share-permission-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-user-select-all-container .select-all,.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.add-workflow-task-dialog .add-workflow-task-body .submit-workflow.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.app-folder-tree .app-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.app-form-settings .app-form-settings-header-tab.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.app-form-settings .table-setting .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.app-group-container .load-more-apps .load-more-apps-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.app-icon-settings-popover-nav .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):active{background-color:##maincolor##}
.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):focus,.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):focus-visible{background-color:##maincolor##;border:1px solid ##maincolor##;box-shadow:none;outline:none}
.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):active{background-color:#e6e6e6;border:1px solid ##maincolor##;color:##maincolor##}
.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):focus,.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):focus-visible{background-color:#fff;border:1px solid ##maincolor##;box-shadow:none;color:##maincolor##;outline:none}
.app-init_app-init-btns__nGbPX button:first-child:hover{border:1px solid ##maincolor##;color:##maincolor##}
.app-init_app-init-btns__nGbPX button:first-child{color:##maincolor##}
.app-init_app-init-btns__nGbPX button{border:1px solid ##maincolor##;border-radius:3px;flex:0 0 auto;font-size:13px;font-weight:400}
.app-map-dialog-cn .dtable-app-column-setting-item-title .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer;font-weight:450}
.app-select-page-item-popover .popover .app-select-page-item-popover-image-container{border:2px solid ##maincolor##;border-radius:3px;overflow:hidden}
.app-settings-access-control .app-qr-code-share-btn.btn.btn-secondary:active,.app-settings-access-control .app-qr-code-share-btn:hover{background-color:##maincolor##;box-shadow:none;color:#fff}
.app-settings-access-control .app-qr-code-share-btn{border-color:##maincolor##;color:##maincolor##;margin-left:.5rem;padding:6px}
.app-settings-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-settings-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;color:#fff}
.archive-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.archive-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.archive-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.attachments-management-widget .dirent-table-content .dirent-item-name{color:##maincolor##}
.attachments-management-widget .path-container .path-link{color:##maincolor##}
.attachments-management-widget .tree-node-inner.tree-node-hight-light .tree-node-right-icon .dtable-dirent-dropdown{background-color:##maincolor##}
.attachments-management-widget .tree-view .tree-node-inner.tree-node-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.automatic-action-addition-toggle{color:##maincolor##;cursor:pointer}
.badge-primary{color:#fff;background-color:##maincolor##}
.base-status-dialog .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none}
.base-status-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.batch-popover .batch-popover-footer .replace-search-item{background:##maincolor##;border:1px solid #e4e4e4;color:#fff}
.bg-primary{background-color:##maincolor## !important}
.big-data-import-process .am-progress-bar{background-color:##maincolor##;border:none;border-radius:5px;height:10px!important}
.big-screen-menu .menu-item.active{background:#ffefe0;color:##maincolor##}
.border-primary{border-color:##maincolor## !important}
.btn-link{font-weight:400;color:##maincolor##;text-decoration:none}
.btn-outline-primary,.btn-primary {  color: #fff;  background-color: ##maincolor##;  border-color: ##maincolor##;}
.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:##maincolor##;background-color:transparent}
.btn-outline-primary:focus,.btn-outline-primary.focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active,.btn-outline-primary:not(:disabled):not(.disabled).active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,.btn-outline-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-outline-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-universal-01.disabled,.btn-outline-universal-01:disabled{background-color:initial;color:##maincolor##}
.btn-outline-universal-01.focus,.btn-outline-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active,.btn-outline-universal-01:not(:disabled):not(.disabled):active,.show>.btn-outline-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active:focus,.btn-outline-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01{background-color:initial;background-image:none;border-color:##maincolor##;color:##maincolor##}
.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:focus,.btn-primary.focus{color:#fff;background-color:##maincolor##;border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active:focus,.btn-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01.disabled,.btn-universal-01:disabled{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01.focus,.btn-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active,.btn-universal-01:not(:disabled):not(.disabled):active,.show>.btn-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active:focus,.btn-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn:focus,.btn.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.calendar-modal-portal .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#212529;cursor:pointer}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#444;cursor:pointer}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#212529;cursor:default}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#444;cursor:default}
.chat-message:after{content:"";position:absolute;right:-5px;top:7px;border-bottom:6px solid transparent;border-left:6px solid ##maincolor##;border-top:6px solid transparent}
.chat-message{position:relative;display:inline-block;background-color:##maincolor##;color:#fff;font-size:.875rem;padding:.375rem .5rem;border-radius:3px;white-space:normal;text-align:left;margin:0 .5rem 0 2.5rem;line-height:1.4}
.color-setting-dialog .rule-color-container .color-setting-add-color{color:##maincolor##;cursor:pointer}
.colorinput-input:focus~.colorinput-color{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.comment-footer-container .comment-collaborator-tip:hover,.comment-footer-container .comment-image-tip:hover{color:##maincolor##}
.comment-header .comment-header-tool .comment-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.copy-dtable-dialog .custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.cur-view-container .heading a{color:##maincolor##}
.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:##maincolor##;background-color:##maincolor##}
.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:##maincolor##;background-color:##maincolor##}
.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-range::-moz-range-progress{height:2px;background:##maincolor##;border:0;margin-top:0}
.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-ms-fill-lower{background:##maincolor##;border-radius:0}
.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:2px;margin-left:2px;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-webkit-slider-runnable-track{background:##maincolor##;content:"";height:2px;pointer-events:none}
.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range:focus::-moz-range-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-ms-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-webkit-slider-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-select:focus{border-color:#1991eb;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.custom-switch .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.custom-switch-input:focus~.custom-switch-indicator{box-shadow:0 0 0 2px rgba(##mainrgba##,.25);border-color:##maincolor##}
.delete-record-description-view .restore{color:##maincolor##;display:inline-block;overflow:hidden;text-align:right;text-overflow:ellipsis;white-space:nowrap;width:20%}
.department-dialog-content .department-dialog-group .group-item.tr-highlight:hover,.department-dialog-content .department-dialog-group .tr-highlight{background-color:##maincolor##;color:#fff}
.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.department-single-select-formatter .department-avatar-container {  background: ##maincolor##;  border-radius: 50%;  height: 18px;  padding: 2px 2px 3px;  width: 18px}
.department-single-select-formatter .department-avatar-container, .selected-departments .department-avatar-container, .selected-option-show .department-avatar-container {  background: ##maincolor##;  border-radius: 50%;  height: 18px;  padding: 2px 2px 3px;  width: 18px}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container,.selected-departments.dtable-ui .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.departments-tree-panel .departments-v2-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.digital-sign-view-panel-operations .mobile-btn-clear{color:##maincolor##}
.download-file-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.download-file-dialog .download-files-item .downloading-file-cancel{color:##maincolor##;opacity:.8}
.download-files-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:##maincolor##}
.dropdown-item:focus{color:#fff;background-color:##maincolor##}
.dropdown-item:hover{color:#fff;background-color:##maincolor##}
.dtable-app-qr-code-wrapper .qrcode-copy-btn:active,.dtable-app-qr-code-wrapper .qrcode-copy-btn:hover{background-color:##maincolor##!important;color:#fff}
.dtable-app-qr-code-wrapper .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.dtable-edit-form .form-header-title .dtable-icon-form{color:##maincolor##;font-size:24px}
.dtable-excel-preview-dialog .dtable-excel-preview-dialog-nav{background-color:##maincolor##;margin:0;padding:10px 10px 0}
.dtable-external-links-content .external-link-item a{color:##maincolor##}
.dtable-file-addition-container .dtable-file-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-file-previewer-header .files-operation-content{color:##maincolor##}
.dtable-image-addition-container .dtable-image-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-path-container .dtable-path-link{color:##maincolor##}
.dtable-plugin-setting-item .select-group .select-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.dtable-plugin-setting-item.order-setting .widget-zIndex-content .widget-zIndex-item:hover:not(.disabled){background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer;z-index:0}
.dtable-radio .dtable-radio-selected-indicator.dtable-radio-indicator-disable{background-color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator{background-color:##maincolor##;border:initial!important}
.dtable-refresh{color:##maincolor##!important;cursor:pointer}
.dtable-scripts-module .dtable-scripts-export:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.dtable-scripts-module .dtable-scripts-export{background-color:#fff;color:##maincolor##;width:130px}
.dtable-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.editor-column-popover-inner .submitSelect{box-shadow:0 0 0 2px ##maincolor##80}
.field-setting .field-setting-banner .show-all-button{color:##maincolor##;cursor:pointer;font-size:12px}
.field-settings .field-settings-header .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer}
.file-chooser-content-container .file-chooser-left .select-file-chooser-nav-item{background-color:##maincolor##!important;color:#fff}
.file-chooser-item .item-active{background:##maincolor##!important;border-radius:2px;box-shadow:inset 0 0 1px #999;color:#fff}
.file-management-toolbar .select-file-management-item{color:##maincolor##}
.file-upload-item .upload-operation .error-uploaded{color:##maincolor##;cursor:pointer}
.folder-tree .folder-item.folder-item-selected{background-color:##maincolor##!important;color:#fff}
.form-help:hover,.form-help[aria-describedby]{background:##maincolor##;color:#fff}
.form-items-container .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.form-items-container .drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.form-qr-code-wrapper .qrcode-copy-btn:active,.form-qr-code-wrapper .qrcode-copy-btn:hover{background-color:##maincolor##!important;color:#fff}
.form-qr-code-wrapper .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.form-remark-background-setting .no-active-option .select-group-item:hover{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer}
.form-remark-background-setting .select-group-container .select-group-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.formula-format-editor-popover .btn-re-detect{align-items:center;border-color:##maincolor##;display:flex;font-weight:400;height:30px;justify-content:center;margin:0 0 0 15px;padding-bottom:0;padding-top:0}
.formula-format-editor-popover .btn-secondary:not(:disabled):not(.disabled):active{background-color:initial;border-color:##maincolor##;color:##maincolor##}
.formula-result-type-detector .btn-re-detect{align-items:center;color:##maincolor##;display:flex;font-weight:400;justify-content:center}
.gallery-app-settings .mobile-select-all{color:##maincolor##}
.grid-pane-divider .tooltip-pane-divider .freeze-columns-length{color:##maincolor##;font-weight:500;padding:0 4px}
.group-manage-trash-dialog .trash-dtables .trash-table-restore{color:##maincolor##;cursor:pointer}
.header-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.image-view i{animation:rotate 1.5s ease infinite;color:##maincolor##;font-size:30px;height:100%;line-height:150px;text-align:center;width:100%}
.imagecheck-figure:before{content:"";position:absolute;top:.25rem;left:.25rem;display:block;width:1rem;height:1rem;pointer-events:none;user-select:none;background:##maincolor## url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'><path fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/></svg>") no-repeat center center/50% 50%;color:#fff;z-index:1;border-radius:3px;opacity:0;transition:.3s opacity}
.imagecheck-input:focus~.imagecheck-figure{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.info-bar-info span:first-child{color:##maincolor##}
.introduction-video .video-js .vjs-control-bar{background-color:##maincolor##cc}
.introduction-video-mobile .introduction-video-btn{background-color:##maincolor##;border-radius:26px;margin-top:5rem}
.link-records-editor .create-link-records .new-record:hover{background:#fff;border-color:##maincolor##}
.link-records-editor .create-link-records .new-record{align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##;display:inline-flex;justify-content:center;padding:0 10px;width:100%}
.list-group-item.active{z-index:2;color:##maincolor##;background-color:#fffaf5;border-color:rgba(0,40,100,.12)}
.list-group-transparent .list-group-item.active{background:rgba(##mainrgba##,.06);font-weight:600}
.login-panel .login-panel-register-type:hover {  border-color: ##maincolor##;}
.mobile-float-icon{background-color:##maincolor##;border:none;border-radius:50%;bottom:42px;box-shadow:0 3px 5px -1px #ffa25233,0 6px 10px 0 #ffa25224,0 1px 18px 0 #ffa2521f;color:#999;cursor:pointer;display:flex;font-size:16px;height:50px;position:fixed;right:10px;-webkit-user-select:none;user-select:none;width:50px}
.mobile-main-panel .selected-tab-item{color:##maincolor##;font-size:22px}
.mobile-notification-modal .mobile-notification-tool .notification-type-tabs .tab-item.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##}
.mobile-share-table .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile-share-view .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile_dtable-map-plugin-header-btn-highlight__dYdDa{color:##maincolor##}
.mobile_mobile-select-all__9qLb-{color:##maincolor##}
.mobile_mobile-select-all__esQ2M{color:##maincolor##}
.nav .nav-item .nav-link.active {  color: ##maincolor##;  text-decoration: none;  border-bottom: 0.125rem solid ##maincolor##;}
.nav-pills .nav-item .nav-link.active {  background-color: ##maincolor##;  color: #fff;  border: none;}
.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:##maincolor##}
.nav-tabs .nav-submenu .nav-item.active{color:##maincolor##}
.new-narrow-panel .hd {  color: #fff;  font-size: 16px;  padding: 5px 20px;  background: ##maincolor##;  border-bottom: 1px solid #d5d5d5;}
.new-narrow-panel .hd{color:#fff;font-size:16px;padding:5px 20px;background:##maincolor##;border-bottom:1px solid #d5d5d5}
.no-active-option .select-group-item:hover{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer}
.notification-container .notification-body .nav .nav-item .nav-link.active{color:##maincolor##!important}
.op-target {  color: ##maincolor##;  word-wrap: break-word;}
.operation-table{color:##maincolor##;flex:1 1;max-width:100px}
.operations-log-dialog .operation-tags-container .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.option-editor-footer .item-text{color:##maincolor##;cursor:pointer}
.option-group .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.option.option-active {  background-color: ##maincolor##;  color: #fff;  cursor: pointer}
.option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.order-item .order-price{color:##maincolor##;font-size:26px;font-weight:500}
.org-admin .main-panel .nav .nav-item .nav-link.active,.sys-admin .main-panel .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.org-info-content .am-progress-bar{background-color:##maincolor##;border-radius:5px;height:6px!important}
.outline-h2:hover{color:##maincolor##}
.outline-h3:hover{color:##maincolor##}
.page-designer-add-elements-btn-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.page-designer-box-editor .page-designer-sub-block-element-wrapper[drag-over]{border-color:##maincolor##!important}
.page-designer-drag-beside-element-tips{background-color:##maincolor##;height:calc(100% + 12px);position:absolute;top:-6px;width:2px;z-index:1}
.page-designer-drag-closing-section-tips{background-color:##maincolor##;height:1px;left:0;position:absolute;width:100%;z-index:1}
.page-designer-drag-into-section-tips{background-color:initial!important;border:1px dashed ##maincolor##;height:100%;position:absolute;top:0;z-index:1}
.page-designer-editor .dragging-element-valid-position-tip{background-color:initial!important;border:1px dashed ##maincolor##;z-index:1}
.page-designer-editor .page-designer-element-container .drag-handler{background-color:##maincolor##;border-radius:3px}
.page-designer-editor .page-designer-element-container .right-size-regulator-handler{background:#0000;border-bottom:5px solid ##maincolor##;border-radius:0 0 8px 0;border-right:5px solid ##maincolor##;bottom:-4px;content:"";cursor:se-resize;height:12px;right:-4px;width:12px}
.page-designer-editor .page-designer-section .page-designer-element-container.editing-element{border-color:##maincolor##}
.page-designer-editor .page-designer-section .page-designer-section-container.editing-section{border:2px solid ##maincolor##}
.page-designer-element-setting-type.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.page-designer-horizontal-mark-line{background-color:##maincolor##;height:2px;position:fixed;z-index:9999}
.page-item.active .page-link{z-index:3;color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.page-link:focus{z-index:3;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.participants .add-participants i{background-color:#fff;border:2px solid #fff;border-radius:50%;color:##maincolor##;font-size:16px}
.password-reset-panel .password-reset-panel-bottom-container a,.login-panel .login-panel-bottom-container a {  color: ##maincolor##;  white-space: nowrap;}
.path-link {  color: ##maincolor## !important;  text-decoration: none;}
.path-toolbar .toolbar-item a:hover{color:##maincolor##;text-decoration:none}
.plan-description-item .plan-description{color:##maincolor##;font-size:20px;font-weight:500}
.plan-description-item.plan-selected{background-color:#fff5eb;border-color:##maincolor##;border-width:2px}
.price-version-container-header .price-version-plan-name{border-bottom:1px solid ##maincolor##;font-size:1.5rem;padding:1rem 0}
.progress-bar{display:flex;flex-direction:column;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:##maincolor##;transition:width .6s ease}
.rbc-btn-group .rbc-tool-btn.today-btn-disabled,.rbc-btn-group .rbc-tool-btn:hover{background-color:##maincolor##;border:1px solid ##maincolor##;color:#fff}
.rbc-btn-group .rbc-tool-icon:hover{background-color:##maincolor##;color:#fff}
.rbc-btn-group .view-type-list .rbc-view-type.rbc-active{background:##maincolor##;color:#fff}
.rbc-calendar .seatable-plugin-calendar-insert-row{align-items:center;background-color:##maincolor##;border:none;border-radius:50%;bottom:10px;box-shadow:0 1px 2px 0 rgba(0,0,0,.05);color:#fff;cursor:pointer;display:flex;font-size:20px;height:50px;justify-content:center;position:absolute;right:5px;-webkit-user-select:none;user-select:none;width:50px;z-index:5}
.rbc-current-time-indicator-label{border-left:0!important;bottom:-10px;color:##maincolor##;font-size:14px;font-weight:400;padding:0 5px;position:absolute}
.rbc-current-time-indicator{background-color:##maincolor##;border-color:##maincolor##;height:1px;pointer-events:none;position:absolute;right:0;z-index:3}
.rbc-now .rbc-date-context{background-color:##maincolor##;color:#fff}
.rbc-year-view .day-events{background-color:##maincolor##;border-radius:50%;height:4px;left:16px;position:absolute;top:22px;width:4px}
.rbc-year-view .rbc-current{background-color:##maincolor##;border-radius:2px;color:#fff}
.rbc-year-view .rbc-year-month-header{color:##maincolor##;padding-left:10px}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:unset}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.rc-slider-handle:hover{border-color:##maincolor##}
.rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.rc-slider-handle{position:absolute;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;margin-top:-5px;cursor:grab;border-radius:50%;border:2px solid ##maincolor##;background-color:#fff;touch-action:pan-x}
.rc-slider-track{background-color:##maincolor##;left:0}
.rc-slider-track{left:0;background-color:##maincolor##}
.react-contextmenu-item.react-contextmenu-item--active,.react-contextmenu-item.react-contextmenu-item--selected,.react-contextmenu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.restore-base-button{color:##maincolor##;min-width:35px;padding-left:5px;text-align:right}
.row-color-duplicate-value-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{border-bottom:2px solid ##maincolor##;color:#212529}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{color:#212529;border-bottom:2px solid ##maincolor##}
.sdoc-comment-drawer .add-comments-participants .sdocfont {  border-radius: 50%;  color: ##maincolor##;  font-size: 16px}
.sdoc-comment-list-container .comment-ui-container .comment-operation .sdoc-confirm {  color: ##maincolor##;  font-weight: 800}
.sdoc-file-select-dialog .highlight-bg-color {  background-color: ##maincolor##;  border-color: ##maincolor##}
.sdoc-file-select-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sdoc-operator-folder .sdoc-dropdown-menu .sdoc-dropdown-menu-item .sdoc-full-width-mode-wrapper .custom-switch .custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.sdoc-operator-folder .sdoc-dropdown-menu .sdoc-dropdown-menu-item .sdoc-full-width-mode-wrapper .custom-switch .custom-switch-input:focus~.custom-switch-indicator{border-color:##maincolor##;box-shadow:0 0 0 2px ##maincolor##40}
.sdoc-outline-item.active {  color: ##maincolor##}
.sdoc-outline-item.active{color:##maincolor##}
.sdoc-popover-menu__item:hover {  background-color: ##maincolor##;  color: #fff}
.sdoc-popover-menu__item:hover{background-color:##maincolor##;color:#fff}
.sdoc-tip-dialog .highlight-bg-color {  background-color: ##maincolor##;  border-color: ##maincolor##}
.sdoc-tip-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sea-ai-assistant-auto-add-members-dialog .ai-assistant-settings-container .sea-ai-assistant-task-table-cell-content{align-items:center;color:##maincolor##;cursor:pointer;display:flex;justify-content:flex-start}
.sea-ai-assistant-chat-file-input-container .sea-ai-assistant-chat-file-upload-icon{background-color:##maincolor##!important;border-radius:8px;height:32px;width:32px}
.sea-ai-assistant-chat-input-container:has(.message-input:focus-visible){border-color:##maincolor##}
.sea-ai-assistant-instructions-wrapper .instructions-content .instruction:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-message-content .sea-ai-assistant-use-tip-order-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-settings-dialog .ai-assistant-settings-sidebar .ai-assistant-settings-sidebar-item.active-item{background-color:##maincolor##!important;color:#fff}
.sea-ai-assistant-settings-dialog .settings-container-header-right{align-items:center;color:##maincolor##;cursor:pointer;display:flex;-webkit-user-select:none;user-select:none}
.sea-ai-outline-btn:not(.disabled):hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.sea-ai-outline-btn{background-color:#fff;border:1px solid ##maincolor##;border-radius:3px;color:##maincolor##;font-size:13px;font-weight:500;line-height:1;max-width:100%;min-width:24px;padding:6px 12px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}
.sea-chart-settings .rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.sea-chart-settings .rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.sea-chart-settings .rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.sea-chart-settings .rc-slider-handle:hover{border-color:##maincolor##}
.sea-chart-settings .rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.sea-chart-settings .rc-slider-track{background-color:##maincolor##;border-radius:6px;height:4px;left:0;position:absolute}
.sea-chart-settings .sea-chart-settings-type .sea-chart-settings-type-item.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.sea-chart-types-dialog .sea-chart-chart-categories-nav .sea-chart-chart-cat-nav-item-container.sea-chart-icon-highlight .chart-icon{color:##maincolor##}
.sea-chart-types-dialog .sea-chart-type-item.selected{border-color:##maincolor##}
.search-result-container .search-result-item:hover{background-color:#eee;border-left:2px solid ##maincolor##}
.search-result-list .item-content .item-name{color:##maincolor##!important}
.search-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.seatable-app-form-settings .seatable-app-form-content .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.seatable-app-form-settings .seatable-app-form-content .seatable-app-form-drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.seatable-app-page .dtable-plugin-column-setting-item-title .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px;font-weight:450}
.seatable-app-table.context-dropdown-menu .context-menu-item:focus{background-color:##maincolor##;color:#fff}
.seatable-app-table.context-dropdown-menu .context-menu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.seatable-bg-orange {  background-color: ##maincolor## !important;}
.seatable-border-color-orange {  border: ##maincolor## !important;}
.seatable-form-app-settings-panel .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.seatable-icon-orange {  color: ##maincolor## !important;  fill: ##maincolor## !important;}
.seatable-share-form .form-content .submit-form.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.select-button-action-popover .select-button-action-list .select-button-action-item.active{background:##maincolor##;border-radius:4px;color:#fff}
.select-columns-dialog .column-option:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.select-columns-dialog .select-columns{color:##maincolor##;cursor:pointer;font-size:13px;font-weight:500}
.select-group-container .select-group-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.select-page-icons .select-page-icon-active,.select-page-icons .select-page-icon-active:hover{background-color:##maincolor##}
.select-user-modal .modal-select-user-header .select-user-close-btn{color:##maincolor##;font-size:14px;font-weight:400;position:absolute;right:15px}
.selectgroup-input:checked+.selectgroup-button{border-color:##maincolor##;z-index:1;color:##maincolor##;background:#fff2e6}
.selectgroup-input:focus+.selectgroup-button{border-color:##maincolor##;z-index:2;color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.setting-btn.active{background-color:##maincolor##;color:#fff}
.share-add-btn-container .share-add-btn{background:#fff;background-image:none;border-color:##maincolor##;color:##maincolor##;margin-top:10px;outline:none;width:90%}
.share-dialog .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.share-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.share-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.share-dialog-with-qr-code .dtable-qr-code-share-btn.btn.btn-secondary:active,.share-dialog-with-qr-code .dtable-qr-code-share-btn:hover{background-color:##maincolor##;box-shadow:none;color:#fff}
.share-dialog-with-qr-code .dtable-qr-code-share-btn{border-color:##maincolor##;color:##maincolor##;float:right;margin-left:.5rem;padding:5px}
.share-dialog-with-qr-code .share-qrcode .qrcode-copy-btn:active{background-color:##maincolor##;color:#fff}
.share-dialog-with-qr-code .share-qrcode .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.share-link-dialog .share-link-info .share-link-content{color:##maincolor##;cursor:pointer;display:inline-block;width:100%}
.share-link-dialog .share-link-info .share-link-content{display:inline-block;width:100%;color:##maincolor##;cursor:pointer}
.share-permissions-manage .share-permissions-manage-header button{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.share-table-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.share-view-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.side-nav-footer .join-us-icon{color:##maincolor##;font-size:20px;margin-right:10px}
.side-panel .nav-link.active{color:##maincolor##}
.single-record-page-record-qrcode-container .qrcode-copy-btn:active{background-color:##maincolor##!important;color:#fff}
.single-record-page-record-qrcode-container .qrcode-copy-btn{background-color:#fff;border-color:##maincolor##;color:##maincolor##}
.single-record-page-setting-element-types-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.snapshot-item .snapshot-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-chart-addition-dialog .selected-statistic-type-item{background-color:##maincolor##;color:#fff}
.statistic-chart-preview .dtable-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:var(--font-hover-color)}
.submit-map-editor{background-color:#fff;border:1px solid #0000;border-radius:3px;box-shadow:0 0 12px #0000004d;color:##maincolor##;cursor:pointer;display:inline-block;font-size:.875rem;height:38px;line-height:1.8461538462;margin-left:16px;padding:.375rem .75rem;text-align:center;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}
.subscription-container .text-orange{color:##maincolor##!important}
.subscription-submit{background-color:##maincolor##;border-radius:5px;color:#fff;font-size:16px;height:44px;margin-bottom:10px;width:100%}
.switch-refresh-active{background-color:##maincolor##}
.table-calendar-link:before{content:"";width:4px;height:4px;position:absolute;left:.25rem;top:.25rem;border-radius:50px;background:##maincolor##}
.table-calendar-link:hover{color:#fff;text-decoration:none;background:##maincolor##;transition:.3s background}
.table-item-more-operation .advanced-menu.show>.btn-secondary.dropdown-toggle{background-color:##maincolor##;color:#fff}
.table-setting.form-setting-all-required{color:##maincolor##;cursor:pointer;font-size:14px}
.tables-tabs-content .tabs-nav-scroll-after{background:linear-gradient(90deg,##maincolor##33,##maincolor##99,##maincolor##);right:10px;top:0;width:20px}
.tables-tabs-content .tabs-nav-scroll-before{background:linear-gradient(270deg,##maincolor##33,##maincolor##99,##maincolor##);left:0;top:0;width:25px;z-index:5}
.tag-primary{background-color:##maincolor##;color:#fff}
.template-categories .template-category-item.active{color:##maincolor##;text-decoration:underline}
.template-categories .template-category-item:hover{color:##maincolor##}
.template-list-container .template-container:hover{background:#fffbf8;border-color:##maincolor##;cursor:pointer}
.template-list-dialog .modal-header .modal-header-template{color:##maincolor##;font-size:24px;line-height:1;margin-right:10px}
.text-editor-container .text-editor-dropdown-item:hover{background-color:##maincolor##;color:#fff}
.text-primary{color:##maincolor## !important}
.tool-popover .tool-item:hover,.tool-popover .tool-item:hover dd,.tool-popover .tool-item:hover dt,.tool-popover .tool-item:hover span{background-color:##maincolor##;color:#fff}
.trash-table .trash-table-base-detail .trash-table-restore-mobile{color:##maincolor##;cursor:pointer}
.tree-view-trash-tab.active,.tree-view-trash-tab.active .dtable-font,.tree-view-trash-tab.active svg{background-color:##maincolor##;border-radius:4px;color:#fff}
.user-input-chat .sea-ai-assistant-message-content{background-color:##maincolor##;border-radius:6px 0 6px 6px;color:#fafafa}
.user-setting-nav .nav-item .nav-link:hover{color:##maincolor##}
.user-setting-nav .nav-item.active .nav-link{border-left-color:##maincolor##;color:##maincolor##}
.view-edit-popover-header .remove-icon-button{color:##maincolor##}
.workflow-app-container .participants-type-container .selected-participants-type-item{background-color:#e5a1521a;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.workflow-app-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.workflow-folder-tree .workflow-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.workflow-group-container .load-more-workflows .load-more-workflows-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.workflow-list-view .list-view-sidebar li{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .share-item-view-sidebar .sidebar-item-active,.workflow-list-view .specific-list-view-sidebar .sidebar-item-active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .view-header .dtable-icon-workflow{color:##maincolor##}
.workflow-node-dropdown .dropdown-item:hover,.workflow-node-dropdown .selected-dropdown-item{background-color:##maincolor##;color:#fff}
.workflow-task-dialog .workflow-task-nodes-logs .workflow-task-node-log-selector.selected{border-bottom:2px solid ##maincolor##;color:#212529}
.workflow-task-list-modal .workflow-task-list-modal-header-left .dtable-icon-workflow{color:##maincolor##;font-size:20px;font-weight:500}
.workflow-task-list-toolbar-container .task-date-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-logs .workflow-task-log .workflow-task-log-icon{color:##maincolor##;margin-right:5px}
.workflow-task-nodes-popover .workflow-task-nodes .workflow-task-node-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-pending-dialog .workflow-task-flow-header .flow-chart,.workflow-task-pending-dialog .workflow-task-flow-header .task-logs{border-bottom:2px solid ##maincolor##;color:#212529}
.workspace .dropdown-item:not(.disabled):focus .dtable-font,.workspace .dropdown-item:not(.disabled):hover .dtable-font{background-color:##maincolor##!important;color:#fff!important}
.seatable-text-orange {  color: ##maincolor## !important;}
a {  color: ##maincolor##;}
a.badge-primary:focus,a.badge-primary.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
a.badge-primary:hover,a.badge-primary:focus{color:#fff;background-color:##maincolor##}
a.bg-primary:hover,a.bg-primary:focus,button.bg-primary:hover,button.bg-primary:focus{background-color:##maincolor## !important}
a:focus,a:hover {  color: ##maincolor##;}
a:hover{color:##maincolor##}
a{color:##maincolor##;text-decoration:none;background-color:transparent}`;
  } else if (version === "v5.1") {
    var css_input = `#lang-context-selector li:hover {  background-color: ##maincolor##;}
#quota-bar .usage {  display: inline-block;  height: 100%;  vertical-align: top;  background: ##maincolor##;}
.a-simulate {  color: ##maincolor## !important;  text-decoration: none;  font-weight: normal;  cursor: pointer;}
.account-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.account-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.account-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.activity-department-item .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.add-account .add-account-btn,.edit-account .edit-account-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container,.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container:hover{border-color:##maincolor##}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-name{color:##maincolor##}
.add-page-dialog .steps-header .step-nav.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.add-share-permission .add-share-permission-btn,.edit-share-permission .edit-share-permission-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-user-select-all-container .select-all,.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.add-workflow-task-dialog .add-workflow-task-body .submit-workflow.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.app-folder-tree .app-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.app-form-settings .app-form-settings-header-tab.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.app-form-settings .table-setting .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.app-group-container .load-more-apps .load-more-apps-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.app-icon-settings-popover-nav .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):active{background-color:##maincolor##}
.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):focus,.app-init_app-init-btns__nGbPX .btn-primary:not(:disabled):not(.disabled):focus-visible{background-color:##maincolor##;border:1px solid ##maincolor##;box-shadow:none;outline:none}
.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):active{background-color:#e6e6e6;border:1px solid ##maincolor##;color:##maincolor##}
.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):focus,.app-init_app-init-btns__nGbPX .btn-secondary:not(:disabled):not(.disabled):focus-visible{background-color:#fff;border:1px solid ##maincolor##;box-shadow:none;color:##maincolor##;outline:none}
.app-init_app-init-btns__nGbPX button:first-child:hover{border:1px solid ##maincolor##;color:##maincolor##}
.app-init_app-init-btns__nGbPX button:first-child{color:##maincolor##}
.app-init_app-init-btns__nGbPX button{border:1px solid ##maincolor##;border-radius:3px;flex:0 0 130px;font-size:13px;font-weight:400}
.app-map-dialog-cn .dtable-app-column-setting-item-title .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer;font-weight:450}
.app-select-page-item-popover .popover .app-select-page-item-popover-image-container{border:2px solid ##maincolor##;border-radius:3px;overflow:hidden}
.app-settings-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-settings-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;color:#fff}
.archive-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.archive-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.archive-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.attachments-management-widget .dirent-table-content .dirent-item-name{color:##maincolor##}
.attachments-management-widget .path-container .path-link{color:##maincolor##}
.attachments-management-widget .tree-node-inner.tree-node-hight-light .tree-node-right-icon .dtable-dirent-dropdown{background-color:##maincolor##}
.attachments-management-widget .tree-view .tree-node-inner.tree-node-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.automatic-action-addition-toggle{color:##maincolor##;cursor:pointer}
.badge-primary{color:#fff;background-color:##maincolor##}
.base-status-dialog .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none}
.base-status-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.batch-popover .batch-popover-footer .replace-search-item{background:##maincolor##;border:1px solid #e4e4e4;color:#fff}
.bg-primary{background-color:##maincolor## !important}
.big-data-import-process .am-progress-bar{background-color:##maincolor##;border:none;border-radius:5px;height:10px!important}
.big-screen-menu .menu-item.active{background:#ffefe0;color:##maincolor##}
.border-primary{border-color:##maincolor## !important}
.btn-link{font-weight:400;color:##maincolor##;text-decoration:none}
.btn-outline-primary,.btn-primary {  color: #fff;  background-color: ##maincolor##;  border-color: ##maincolor##;}
.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:##maincolor##;background-color:transparent}
.btn-outline-primary:focus,.btn-outline-primary.focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active,.btn-outline-primary:not(:disabled):not(.disabled).active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,.btn-outline-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-outline-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-universal-01.disabled,.btn-outline-universal-01:disabled{background-color:initial;color:##maincolor##}
.btn-outline-universal-01.focus,.btn-outline-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active,.btn-outline-universal-01:not(:disabled):not(.disabled):active,.show>.btn-outline-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active:focus,.btn-outline-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01{background-color:initial;background-image:none;border-color:##maincolor##;color:##maincolor##}
.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:focus,.btn-primary.focus{color:#fff;background-color:##maincolor##;border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active:focus,.btn-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01.disabled,.btn-universal-01:disabled{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01.focus,.btn-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active,.btn-universal-01:not(:disabled):not(.disabled):active,.show>.btn-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active:focus,.btn-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn:focus,.btn.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.calendar-modal-portal .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#212529;cursor:pointer}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#444;cursor:pointer}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#212529;cursor:default}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#444;cursor:default}
.chat-message:after{content:"";position:absolute;right:-5px;top:7px;border-bottom:6px solid transparent;border-left:6px solid ##maincolor##;border-top:6px solid transparent}
.chat-message{position:relative;display:inline-block;background-color:##maincolor##;color:#fff;font-size:.875rem;padding:.375rem .5rem;border-radius:3px;white-space:normal;text-align:left;margin:0 .5rem 0 2.5rem;line-height:1.4}
.color-setting-dialog .rule-color-container .color-setting-add-color{color:##maincolor##;cursor:pointer}
.colorinput-input:focus~.colorinput-color{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.comment-footer-container .comment-collaborator-tip:hover,.comment-footer-container .comment-image-tip:hover{color:##maincolor##}
.comment-header .comment-header-tool .comment-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.copy-dtable-dialog .custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.cur-view-container .heading a{color:##maincolor##}
.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:##maincolor##;background-color:##maincolor##}
.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:##maincolor##;background-color:##maincolor##}
.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-range::-moz-range-progress{height:2px;background:##maincolor##;border:0;margin-top:0}
.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-ms-fill-lower{background:##maincolor##;border-radius:0}
.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:2px;margin-left:2px;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-webkit-slider-runnable-track{background:##maincolor##;content:"";height:2px;pointer-events:none}
.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range:focus::-moz-range-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-ms-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-webkit-slider-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-select:focus{border-color:#1991eb;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.custom-switch .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.custom-switch-input:focus~.custom-switch-indicator{box-shadow:0 0 0 2px rgba(##mainrgba##,.25);border-color:##maincolor##}
.delete-record-description-view .restore{color:##maincolor##;display:inline-block;overflow:hidden;text-align:right;text-overflow:ellipsis;white-space:nowrap;width:20%}
.department-dialog-content .department-dialog-group .group-item.tr-highlight:hover,.department-dialog-content .department-dialog-group .tr-highlight{background-color:##maincolor##;color:#fff}
.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.department-single-select-formatter .department-avatar-container {  background: ##maincolor##;  border-radius: 50%;  height: 18px;  padding: 2px 2px 3px;  width: 18px}
.department-single-select-formatter .department-avatar-container, .selected-departments .department-avatar-container, .selected-option-show .department-avatar-container {  background: ##maincolor##;  border-radius: 50%;  height: 18px;  padding: 2px 2px 3px;  width: 18px}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container,.selected-departments.dtable-ui .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.departments-tree-panel .departments-v2-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.digital-sign-view-panel-operations .mobile-btn-clear{color:##maincolor##}
.download-file-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.download-file-dialog .download-files-item .downloading-file-cancel{color:##maincolor##;opacity:.8}
.download-files-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:##maincolor##}
.dropdown-item:focus{color:#fff;background-color:##maincolor##}
.dropdown-item:hover{color:#fff;background-color:##maincolor##}
.dtable-edit-form .form-header-title .dtable-icon-form{color:##maincolor##;font-size:24px}
.dtable-excel-preview-dialog .dtable-excel-preview-dialog-nav{background-color:##maincolor##;margin:0;padding:10px 10px 0}
.dtable-external-links-content .external-link-item a{color:##maincolor##}
.dtable-file-addition-container .dtable-file-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-file-previewer-header .files-operation-content{color:##maincolor##}
.dtable-image-addition-container .dtable-image-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-path-container .dtable-path-link{color:##maincolor##}
.dtable-plugin-setting-item .select-group .select-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.dtable-plugin-setting-item.order-setting .widget-zIndex-content .widget-zIndex-item:hover:not(.disabled){background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer;z-index:0}
.dtable-radio .dtable-radio-selected-indicator.dtable-radio-indicator-disable{background-color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator{background-color:##maincolor##;border:initial!important}
.dtable-refresh{color:##maincolor##!important;cursor:pointer}
.dtable-scripts-module .dtable-scripts-export:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.dtable-scripts-module .dtable-scripts-export{background-color:#fff;color:##maincolor##;width:130px}
.dtable-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.editor-column-popover-inner .submitSelect{box-shadow:0 0 0 2px ##maincolor##80}
.field-setting .field-setting-banner .show-all-button{color:##maincolor##;cursor:pointer;font-size:12px}
.field-settings .field-settings-header .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer}
.file-chooser-content-container .file-chooser-left .select-file-chooser-nav-item{background-color:##maincolor##!important;color:#fff}
.file-chooser-item .item-active{background:##maincolor##!important;border-radius:2px;box-shadow:inset 0 0 1px #999;color:#fff}
.file-management-toolbar .select-file-management-item{color:##maincolor##}
.file-upload-item .upload-operation .error-uploaded{color:##maincolor##;cursor:pointer}
.folder-tree .folder-item.folder-item-selected{background-color:##maincolor##!important;color:#fff}
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
.header-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.image-view i{animation:rotate 1.5s ease infinite;color:##maincolor##;font-size:30px;height:100%;line-height:150px;text-align:center;width:100%}
.imagecheck-figure:before{content:"";position:absolute;top:.25rem;left:.25rem;display:block;width:1rem;height:1rem;pointer-events:none;user-select:none;background:##maincolor## url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'><path fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/></svg>") no-repeat center center/50% 50%;color:#fff;z-index:1;border-radius:3px;opacity:0;transition:.3s opacity}
.imagecheck-input:focus~.imagecheck-figure{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.info-bar-info span:first-child{color:##maincolor##}
.introduction-video .video-js .vjs-control-bar{background-color:##maincolor##cc}
.introduction-video-mobile .introduction-video-btn{background-color:##maincolor##;border-radius:26px;margin-top:5rem}
.link-records-editor .create-link-records .new-record:hover{background:#fff;border-color:##maincolor##}
.link-records-editor .create-link-records .new-record{align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##;display:inline-flex;justify-content:center;padding:0 10px;width:100%}
.list-group-item.active{z-index:2;color:##maincolor##;background-color:#fffaf5;border-color:rgba(0,40,100,.12)}
.list-group-transparent .list-group-item.active{background:rgba(##mainrgba##,.06);font-weight:600}
.login-panel .login-panel-register-type:hover {  border-color: ##maincolor##;}
.mobile-float-icon{background-color:##maincolor##;border:none;border-radius:50%;bottom:42px;box-shadow:0 3px 5px -1px #ffa25233,0 6px 10px 0 #ffa25224,0 1px 18px 0 #ffa2521f;color:#999;cursor:pointer;display:flex;font-size:16px;height:50px;position:fixed;right:10px;-webkit-user-select:none;user-select:none;width:50px}
.mobile-main-panel .selected-tab-item{color:##maincolor##;font-size:22px}
.mobile-notification-modal .mobile-notification-tool .notification-type-tabs .tab-item.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##}
.mobile-share-table .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile-share-view .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile_dtable-map-plugin-header-btn-highlight__dYdDa{color:##maincolor##}
.mobile_mobile-select-all__9qLb-{color:##maincolor##}
.mobile_mobile-select-all__esQ2M{color:##maincolor##}
.nav .nav-item .nav-link.active {  color: ##maincolor##;  text-decoration: none;  border-bottom: 0.125rem solid ##maincolor##;}
.nav-pills .nav-item .nav-link.active {  background-color: ##maincolor##;  color: #fff;  border: none;}
.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:##maincolor##}
.nav-tabs .nav-submenu .nav-item.active{color:##maincolor##}
.no-active-option .select-group-item:hover{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;cursor:pointer}
.notification-container .notification-body .nav .nav-item .nav-link.active{color:##maincolor##!important}
.op-target {  color: ##maincolor##;  word-wrap: break-word;}
.operation-table{color:##maincolor##;flex:1 1;max-width:100px}
.operations-log-dialog .operation-tags-container .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.option-editor-footer .item-text{color:##maincolor##;cursor:pointer}
.option-group .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.option.option-active {  background-color: ##maincolor##;  color: #fff;  cursor: pointer}
.option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.order-item .order-price{color:##maincolor##;font-size:26px;font-weight:500}
.org-admin .main-panel .nav .nav-item .nav-link.active,.sys-admin .main-panel .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.org-info-content .am-progress-bar{background-color:##maincolor##;border-radius:5px;height:6px!important}
.outline-h2:hover{color:##maincolor##}
.outline-h3:hover{color:##maincolor##}
.page-designer-add-elements-btn-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.page-designer-box-editor .page-designer-sub-block-element-wrapper[drag-over]{border-color:##maincolor##!important}
.page-designer-drag-beside-element-tips{background-color:##maincolor##;height:calc(100% + 12px);position:absolute;top:-6px;width:2px;z-index:1}
.page-designer-drag-closing-section-tips{background-color:##maincolor##;height:1px;left:0;position:absolute;width:100%;z-index:1}
.page-designer-drag-into-section-tips{background-color:initial!important;border:1px dashed ##maincolor##;height:100%;position:absolute;top:0;z-index:1}
.page-designer-editor .dragging-element-valid-position-tip{background-color:initial!important;border:1px dashed ##maincolor##;z-index:1}
.page-designer-editor .page-designer-element-container .drag-handler{background-color:##maincolor##;border-radius:3px}
.page-designer-editor .page-designer-element-container .right-size-regulator-handler{background:#0000;border-bottom:5px solid ##maincolor##;border-radius:0 0 8px 0;border-right:5px solid ##maincolor##;bottom:-4px;content:"";cursor:se-resize;height:12px;right:-4px;width:12px}
.page-designer-editor .page-designer-section .page-designer-element-container.editing-element{border-color:##maincolor##}
.page-designer-editor .page-designer-section .page-designer-section-container.editing-section{border:2px solid ##maincolor##}
.page-designer-element-setting-type.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.page-designer-horizontal-mark-line{background-color:##maincolor##;height:2px;position:fixed;z-index:9999}
.page-item.active .page-link{z-index:3;color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.page-link:focus{z-index:3;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.participants .add-participants i{background-color:#fff;border:2px solid #fff;border-radius:50%;color:##maincolor##;font-size:16px}
.password-reset-panel .password-reset-panel-bottom-container a,.login-panel .login-panel-bottom-container a {  color: ##maincolor##;  white-space: nowrap;}
.path-link {  color: ##maincolor## !important;  text-decoration: none;}
.path-toolbar .toolbar-item a:hover{color:##maincolor##;text-decoration:none}
.plan-description-item .plan-description{color:##maincolor##;font-size:20px;font-weight:500}
.plan-description-item.plan-selected{background-color:#fff5eb;border-color:##maincolor##;border-width:2px}
.price-version-container-header .price-version-plan-name{border-bottom:1px solid ##maincolor##;font-size:1.5rem;padding:1rem 0}
.progress-bar{display:flex;flex-direction:column;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:##maincolor##;transition:width .6s ease}
.rbc-btn-group .rbc-tool-btn.today-btn-disabled,.rbc-btn-group .rbc-tool-btn:hover{background-color:##maincolor##;border:1px solid ##maincolor##;color:#fff}
.rbc-btn-group .rbc-tool-icon:hover{background-color:##maincolor##;color:#fff}
.rbc-btn-group .view-type-list .rbc-view-type.rbc-active{background:##maincolor##;color:#fff}
.rbc-current-time-indicator-label{border-left:0!important;bottom:-10px;color:##maincolor##;font-size:14px;font-weight:400;padding:0 5px;position:absolute}
.rbc-current-time-indicator{background-color:##maincolor##;border-color:##maincolor##;height:1px;pointer-events:none;position:absolute;right:0;z-index:3}
.rbc-now .rbc-date-context{background-color:##maincolor##;color:#fff}
.rbc-year-view .day-events{background-color:##maincolor##;border-radius:50%;height:4px;left:16px;position:absolute;top:22px;width:4px}
.rbc-year-view .rbc-current{background-color:##maincolor##;border-radius:2px;color:#fff}
.rbc-year-view .rbc-year-month-header{color:##maincolor##;padding-left:10px}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:unset}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.rc-slider-handle:hover{border-color:##maincolor##}
.rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.rc-slider-handle{position:absolute;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;margin-top:-5px;cursor:grab;border-radius:50%;border:2px solid ##maincolor##;background-color:#fff;touch-action:pan-x}
.rc-slider-track{background-color:##maincolor##;left:0}
.rc-slider-track{left:0;background-color:##maincolor##}
.react-contextmenu-item.react-contextmenu-item--active,.react-contextmenu-item.react-contextmenu-item--selected,.react-contextmenu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.restore-base-button{color:##maincolor##;min-width:35px;padding-left:5px;text-align:right}
.row-color-duplicate-value-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{border-bottom:2px solid ##maincolor##;color:#212529}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{color:#212529;border-bottom:2px solid ##maincolor##}
.sdoc-comment-drawer .add-comments-participants .sdocfont {  border-radius: 50%;  color: ##maincolor##;  font-size: 16px}
.sdoc-comment-drawer .add-comments-participants .sdocfont{border-radius:50%;color:##maincolor##;font-size:16px}
.sdoc-comment-list-container .comment-ui-container .comment-operation .sdoc-confirm {  color: ##maincolor##;  font-weight: 800}
.sdoc-comment-list-container .comment-ui-container .comment-operation .sdoc-confirm{color:##maincolor##;font-weight:800}
.sdoc-file-select-dialog .highlight-bg-color {  background-color: ##maincolor##;  border-color: ##maincolor##}
.sdoc-file-select-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sdoc-outline-item.active {  color: ##maincolor##}
.sdoc-outline-item.active{color:##maincolor##}
.sdoc-popover-menu__item:hover {  background-color: ##maincolor##;  color: #fff}
.sdoc-popover-menu__item:hover{background-color:##maincolor##;color:#fff}
.sdoc-tip-dialog .highlight-bg-color {  background-color: ##maincolor##;  border-color: ##maincolor##}
.sdoc-tip-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sea-ai-assistant-auto-add-members-dialog .ai-assistant-settings-container .sea-ai-assistant-task-table-cell-content{align-items:center;color:##maincolor##;cursor:pointer;display:flex;justify-content:flex-start}
.sea-ai-assistant-chat-file-input-container .sea-ai-assistant-chat-file-upload-icon{align-items:center;background-color:##maincolor##;border-radius:8px;display:flex;height:32px;justify-content:center;width:32px}
.sea-ai-assistant-chat-input-container .icon-wrapper:hover .item-icon{color:##maincolor##}
.sea-ai-assistant-chat-input-container .item-icon{color:##maincolor##;height:16px;width:16px}
.sea-ai-assistant-chats .ai-assistant-chat-history-operation-btn:not(.disabled):hover{background-color:##maincolor##;color:#fff}
.sea-ai-assistant-chats .ai-assistant-chat-history-operation-btn{background-color:#fff;border:1px solid ##maincolor##;border-radius:3px;color:##maincolor##;font-size:13px;font-weight:600;line-height:1;max-width:100%;min-width:24px;padding:6px 12px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}
.sea-ai-assistant-instructions-wrapper .instructions-content .instruction:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-message-content .sea-ai-assistant-use-tip-order-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-op-popover .assistant-op-item:hover{background-color:##maincolor##;color:#fff;font-size:.875rem}
.sea-ai-assistant-settings-dialog .ai-assistant-settings-container-header-right{align-items:center;color:##maincolor##;cursor:pointer;display:flex;-webkit-user-select:none;user-select:none}
.sea-ai-assistant-settings-dialog .ai-assistant-settings-sidebar .ai-assistant-settings-sidebar-item.active-item{background-color:##maincolor##!important;color:#fff}
.sea-chart-settings .rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.sea-chart-settings .rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.sea-chart-settings .rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.sea-chart-settings .rc-slider-handle:hover{border-color:##maincolor##}
.sea-chart-settings .rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.sea-chart-settings .rc-slider-track{background-color:##maincolor##;border-radius:6px;height:4px;left:0;position:absolute}
.sea-chart-settings .sea-chart-settings-type .sea-chart-settings-type-item.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.sea-chart-types-dialog .sea-chart-chart-categories-nav .sea-chart-chart-cat-nav-item-container.sea-chart-icon-highlight .chart-icon{color:##maincolor##}
.sea-chart-types-dialog .sea-chart-type-item.selected{border-color:##maincolor##}
.search-result-container .search-result-item:hover{background-color:#eee;border-left:2px solid ##maincolor##}
.search-result-list .item-content .item-name{color:##maincolor##!important}
.search-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.seatable-app-form-settings .seatable-app-form-content .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.seatable-app-form-settings .seatable-app-form-content .seatable-app-form-drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.seatable-app-page .dtable-plugin-column-setting-item-title .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px;font-weight:450}
.seatable-app-table.context-dropdown-menu .context-menu-item:focus{background-color:##maincolor##;color:#fff}
.seatable-app-table.context-dropdown-menu .context-menu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.seatable-bg-orange {  background-color: ##maincolor## !important;}
.seatable-form-app-settings-panel .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.seatable-share-form .form-content .submit-form.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.select-button-action-popover .select-button-action-list .select-button-action-item.active{background:##maincolor##;border-radius:4px;color:#fff}
.select-columns-dialog .column-option:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.select-columns-dialog .select-columns{color:##maincolor##;cursor:pointer;font-size:13px;font-weight:500}
.select-group-container .select-group-item.active{background-color:#fff2e4;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.select-page-icons .select-page-icon-active,.select-page-icons .select-page-icon-active:hover{background-color:##maincolor##}
.select-user-modal .modal-select-user-header .select-user-close-btn{color:##maincolor##;font-size:14px;font-weight:400;position:absolute;right:15px}
.selectgroup-input:checked+.selectgroup-button{border-color:##maincolor##;z-index:1;color:##maincolor##;background:#fff2e6}
.selectgroup-input:focus+.selectgroup-button{border-color:##maincolor##;z-index:2;color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.setting-btn.active{background-color:##maincolor##;color:#fff}
.share-add-btn-container .share-add-btn{background:#fff;background-image:none;border-color:##maincolor##;color:##maincolor##;margin-top:10px;outline:none;width:90%}
.share-dialog .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.share-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.share-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.share-link-dialog .share-link-info .share-link-content{color:##maincolor##;cursor:pointer;display:inline-block;width:100%}
.share-link-dialog .share-link-info .share-link-content{display:inline-block;width:100%;color:##maincolor##;cursor:pointer}
.share-permissions-manage .share-permissions-manage-header button{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.share-table-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.share-view-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.side-nav-footer .join-us-icon{color:##maincolor##;font-size:20px;margin-right:10px}
.side-panel .nav-link.active{color:##maincolor##}
.single-record-page-setting-element-types-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.snapshot-item .snapshot-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-chart-addition-dialog .selected-statistic-type-item{background-color:##maincolor##;color:#fff}
.statistic-chart-preview .dtable-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:var(--font-hover-color)}
.submit-map-editor{background-color:#fff;border:1px solid #0000;border-radius:3px;box-shadow:0 0 12px #0000004d;color:##maincolor##;cursor:pointer;display:inline-block;font-size:.875rem;height:38px;line-height:1.8461538462;margin-left:16px;padding:.375rem .75rem;text-align:center;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}
.subscription-container .text-orange{color:##maincolor##!important}
.subscription-submit{background-color:##maincolor##;border-radius:5px;color:#fff;font-size:16px;height:44px;margin-bottom:10px;width:100%}
.switch-refresh-active{background-color:##maincolor##}
.table-calendar-link:before{content:"";width:4px;height:4px;position:absolute;left:.25rem;top:.25rem;border-radius:50px;background:##maincolor##}
.table-calendar-link:hover{color:#fff;text-decoration:none;background:##maincolor##;transition:.3s background}
.table-item-more-operation .advanced-menu.show>.btn-secondary.dropdown-toggle{background-color:##maincolor##;color:#fff}
.table-setting.form-setting-all-required{color:##maincolor##;cursor:pointer;font-size:14px}
.tables-tabs-content .tabs-nav-scroll-after{background:linear-gradient(90deg,##maincolor##33,##maincolor##99,##maincolor##);right:10px;top:0;width:20px}
.tables-tabs-content .tabs-nav-scroll-before{background:linear-gradient(270deg,##maincolor##33,##maincolor##99,##maincolor##);left:0;top:0;width:25px;z-index:5}
.tag-primary{background-color:##maincolor##;color:#fff}
.template-categories .template-category-item.active{color:##maincolor##;text-decoration:underline}
.template-categories .template-category-item:hover{color:##maincolor##}
.template-list-container .template-container:hover{background:#fffbf8;border-color:##maincolor##;cursor:pointer}
.template-list-dialog .modal-header .modal-header-template{color:##maincolor##;font-size:24px;line-height:1;margin-right:10px}
.text-editor-container .text-editor-dropdown-item:hover{background-color:##maincolor##;color:#fff}
.text-primary{color:##maincolor## !important}
.tool-popover .tool-item:hover,.tool-popover .tool-item:hover dd,.tool-popover .tool-item:hover dt,.tool-popover .tool-item:hover span{background-color:##maincolor##;color:#fff}
.trash-table .trash-table-base-detail .trash-table-restore-mobile{color:##maincolor##;cursor:pointer}
.tree-view-trash-tab.active,.tree-view-trash-tab.active .dtable-font,.tree-view-trash-tab.active svg{background-color:##maincolor##;border-radius:4px;color:#fff}
.user-input-chat .sea-ai-assistant-message-content{background-color:##maincolor##;border-radius:6px 0 6px 6px;color:#fafafa}
.user-setting-nav .nav-item .nav-link:hover{color:##maincolor##}
.user-setting-nav .nav-item.active .nav-link{border-left-color:##maincolor##;color:##maincolor##}
.view-edit-popover-header .remove-icon-button{color:##maincolor##}
.workflow-app-container .participants-type-container .selected-participants-type-item{background-color:#e5a1521a;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.workflow-app-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.workflow-folder-tree .workflow-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.workflow-group-container .load-more-workflows .load-more-workflows-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.workflow-list-view .list-view-sidebar li{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .share-item-view-sidebar .sidebar-item-active,.workflow-list-view .specific-list-view-sidebar .sidebar-item-active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .view-header .dtable-icon-workflow{color:##maincolor##}
.workflow-node-dropdown .dropdown-item:hover,.workflow-node-dropdown .selected-dropdown-item{background-color:##maincolor##;color:#fff}
.workflow-task-dialog .workflow-task-nodes-logs .workflow-task-node-log-selector.selected{border-bottom:2px solid ##maincolor##;color:#212529}
.workflow-task-list-modal .workflow-task-list-modal-header-left .dtable-icon-workflow{color:##maincolor##;font-size:20px;font-weight:500}
.workflow-task-list-toolbar-container .task-date-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-logs .workflow-task-log .workflow-task-log-icon{color:##maincolor##;margin-right:5px}
.workflow-task-nodes-popover .workflow-task-nodes .workflow-task-node-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-pending-dialog .workflow-task-flow-header .flow-chart,.workflow-task-pending-dialog .workflow-task-flow-header .task-logs{border-bottom:2px solid ##maincolor##;color:#212529}
.workspace .dropdown-item:not(.disabled):focus .dtable-font,.workspace .dropdown-item:not(.disabled):hover .dtable-font{background-color:##maincolor##!important;color:#fff!important}
.seatable-text-orange {  color: ##maincolor## !important;}
a {  color: ##maincolor##;}
a.badge-primary:focus,a.badge-primary.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
a.badge-primary:hover,a.badge-primary:focus{color:#fff;background-color:##maincolor##}
a.bg-primary:hover,a.bg-primary:focus,button.bg-primary:hover,button.bg-primary:focus{background-color:##maincolor## !important}
a:focus,a:hover {  color: ##maincolor##;}
a:hover{color:##maincolor##}
a{color:##maincolor##;text-decoration:none;background-color:transparent}`;
  } else if (version === "v5.0") {
    var css_input = `#lang-context-selector li:hover {  background-color: ##maincolor##;}
#quota-bar .usage {  display: inline-block;  height: 100%;  vertical-align: top;  background: ##maincolor##;}
.a-simulate {  color: ##maincolor## !important;  text-decoration: none;  font-weight: normal;  cursor: pointer;}
.account-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.account-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.account-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.activity-department-item .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.add-account .add-account-btn,.edit-account .edit-account-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container,.add-page-dialog .app-select-page-item.selected .app-select-page-item-image-container:hover{border-color:##maincolor##}
.add-page-dialog .app-select-page-item.selected .app-select-page-item-name{color:##maincolor##}
.add-share-permission .add-share-permission-btn,.edit-share-permission .edit-share-permission-btn{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.add-user-select-all-container .select-all,.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.add-workflow-task-dialog .add-workflow-task-body .submit-workflow.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.app-folder-tree .app-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.app-form-settings .app-form-settings-header-tab.active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.app-form-settings .table-setting .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.app-group-container .load-more-apps .load-more-apps-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.app-icon-settings-popover-nav .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-map-dialog-cn .dtable-app-column-setting-item-title .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer;font-weight:450}
.app-select-page-item-popover .popover .app-select-page-item-popover-image-container{border:2px solid ##maincolor##;border-radius:3px;overflow:hidden}
.app-settings-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.app-settings-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.archive-dialog .nav .nav-item .nav-link.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##;text-decoration:none}
.archive-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.archive-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.attachments-management-widget .dirent-table-content .dirent-item-name{color:##maincolor##}
.attachments-management-widget .path-container .path-link{color:##maincolor##}
.attachments-management-widget .tree-view .tree-node-inner.tree-node-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.automatic-action-addition-toggle{color:##maincolor##;cursor:pointer}
.badge-primary{color:#fff;background-color:##maincolor##}
.base-status-dialog .nav .nav-item .nav-link.active{color:##maincolor##;text-decoration:none}
.base-status-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.batch-popover .batch-popover-footer .replace-search-item{background:##maincolor##;border:1px solid #e4e4e4;color:#fff}
.bg-primary{background-color:##maincolor## !important}
.big-data-import-process .am-progress-bar{background-color:##maincolor##;border:none;border-radius:5px;height:10px!important}
.border-primary{border-color:##maincolor## !important}
.btn-link{font-weight:400;color:##maincolor##;text-decoration:none}
.btn-outline-primary,.btn-primary {  color: #fff;  background-color: ##maincolor##;  border-color: ##maincolor##;}
.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:##maincolor##;background-color:transparent}
.btn-outline-primary:focus,.btn-outline-primary.focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active,.btn-outline-primary:not(:disabled):not(.disabled).active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-outline-primary:not(:disabled):not(.disabled):active:focus,.btn-outline-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-outline-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-outline-universal-01.disabled,.btn-outline-universal-01:disabled{background-color:initial;color:##maincolor##}
.btn-outline-universal-01.focus,.btn-outline-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active,.btn-outline-universal-01:not(:disabled):not(.disabled):active,.show>.btn-outline-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-outline-universal-01:not(:disabled):not(.disabled).active:focus,.btn-outline-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-outline-universal-01{background-color:initial;background-image:none;border-color:##maincolor##;color:##maincolor##}
.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:focus,.btn-primary.focus{color:#fff;background-color:##maincolor##;border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary:hover{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active,.btn-primary:not(:disabled):not(.disabled).active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-primary:not(:disabled):not(.disabled):active:focus,.btn-primary:not(:disabled):not(.disabled).active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
.btn-primary{color:#fff;background-color:##maincolor##;border-color:##maincolor##}
.btn-universal-01.disabled,.btn-universal-01:disabled{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01.focus,.btn-universal-01:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active,.btn-universal-01:not(:disabled):not(.disabled):active,.show>.btn-universal-01.dropdown-toggle{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn-universal-01:not(:disabled):not(.disabled).active:focus,.btn-universal-01:not(:disabled):not(.disabled):active:focus,.show>.btn-universal-01.dropdown-toggle:focus{box-shadow:0 0 0 2px ##maincolor##80}
.btn-universal-01{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.btn:focus,.btn.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.calendar-modal-portal .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#212529;cursor:pointer}
.calendar-plugin-container .view-item .view-item-content:hover{border-color:##maincolor##;color:#444;cursor:pointer}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#212529;cursor:default}
.calendar-plugin-container .view-item.active .view-item-content{border-color:##maincolor##;color:#444;cursor:default}
.chat-message:after{content:"";position:absolute;right:-5px;top:7px;border-bottom:6px solid transparent;border-left:6px solid ##maincolor##;border-top:6px solid transparent}
.chat-message{position:relative;display:inline-block;background-color:##maincolor##;color:#fff;font-size:.875rem;padding:.375rem .5rem;border-radius:3px;white-space:normal;text-align:left;margin:0 .5rem 0 2.5rem;line-height:1.4}
.color-setting-dialog .rule-color-container .color-setting-add-color{color:##maincolor##;cursor:pointer}
.colorinput-input:focus~.colorinput-color{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.comment-footer-container .comment-collaborator-tip:hover,.comment-footer-container .comment-image-tip:hover{color:##maincolor##}
.comment-header .comment-header-tool .comment-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.copy-dtable-dialog .custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.cur-view-container .heading a{color:##maincolor##}
.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:##maincolor##;background-color:##maincolor##}
.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:##maincolor##;background-color:##maincolor##}
.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-range::-moz-range-progress{height:2px;background:##maincolor##;border:0;margin-top:0}
.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-ms-fill-lower{background:##maincolor##;border-radius:0}
.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:2px;margin-left:2px;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range::-webkit-slider-runnable-track{background:##maincolor##;content:"";height:2px;pointer-events:none}
.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-0.25rem;background-color:##maincolor##;border:0;border-radius:1rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}
.custom-range:focus::-moz-range-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-ms-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-range:focus::-webkit-slider-thumb{border-color:##maincolor##;background-color:##maincolor##}
.custom-select:focus{border-color:#1991eb;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.custom-switch .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(##mainrgba##,.5)}
.custom-switch-input:checked~.custom-switch-indicator{background:##maincolor##}
.custom-switch-input:focus~.custom-switch-indicator{box-shadow:0 0 0 2px rgba(##mainrgba##,.25);border-color:##maincolor##}
.delete-record-description-view .restore{color:##maincolor##;display:inline-block;overflow:hidden;text-align:right;text-overflow:ellipsis;white-space:nowrap;width:20%}
.department-dialog-content .department-dialog-group .group-item.tr-highlight:hover,.department-dialog-content .department-dialog-group .tr-highlight{background-color:##maincolor##;color:#fff}
.department-dialog-member-head .select-all{color:##maincolor##;cursor:pointer;font-size:.8125rem}
.department-single-select-formatter .department-avatar-container,.selected-departments .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container,.selected-departments.dtable-ui .department-avatar-container,.selected-option-show .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{background:##maincolor##;border-radius:50%;height:18px;padding:2px 2px 3px;width:18px}
.department-single-select-formatter .department-avatar-container{width:18px;height:18px;background:##maincolor##;border-radius:50%;padding:2px 2px 3px}
.departments-tree-panel .departments-v2-hight-light{background-color:##maincolor##!important;border-radius:4px;color:#fff}
.digital-sign-view-panel-operations .mobile-btn-clear{color:##maincolor##}
.download-file-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.download-file-dialog .download-files-item .downloading-file-cancel{color:##maincolor##;opacity:.8}
.download-files-dialog .download-files-header .select-columns{color:##maincolor##;cursor:pointer}
.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:##maincolor##}
.dropdown-item:focus{color:#fff;background-color:##maincolor##}
.dropdown-item:hover{color:#fff;background-color:##maincolor##}
.dtable-edit-form .form-header-title .dtable-icon-form{color:##maincolor##;font-size:24px}
.dtable-excel-preview-dialog .dtable-excel-preview-dialog-nav{background-color:##maincolor##;margin:0;padding:10px 10px 0}
.dtable-external-links-content .external-link-item a{color:##maincolor##}
.dtable-file-addition-container .dtable-file-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-file-previewer-header .files-operation-content{color:##maincolor##}
.dtable-image-addition-container .dtable-image-addition-left .selected-dtable-addition-item{background-color:##maincolor##;color:#fff}
.dtable-path-container .dtable-path-link{color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator.dtable-radio-indicator-disable{background-color:##maincolor##}
.dtable-radio .dtable-radio-selected-indicator{background-color:##maincolor##;border:initial!important}
.dtable-refresh{color:##maincolor##!important;cursor:pointer}
.dtable-scripts-module .dtable-scripts-export:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.dtable-scripts-module .dtable-scripts-export{background-color:#fff;color:##maincolor##;width:130px}
.dtable-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.editor-column-popover-inner .submitSelect{box-shadow:0 0 0 2px ##maincolor##80}
.field-setting .field-setting-banner .show-all-button{color:##maincolor##;cursor:pointer;font-size:12px}
.field-settings .field-settings-header .setting-choose-all{color:##maincolor##;font-size:12px;cursor:pointer}
.file-chooser-content-container .file-chooser-left .select-file-chooser-nav-item{background-color:##maincolor##!important;color:#fff}
.file-chooser-item .item-active{background:##maincolor##!important;border-radius:2px;box-shadow:inset 0 0 1px #999;color:#fff}
.file-management-toolbar .select-file-management-item{color:##maincolor##}
.file-upload-item .upload-operation .error-uploaded{color:##maincolor##;cursor:pointer}
.folder-tree .folder-item.folder-item-selected{background-color:##maincolor##!important;color:#fff}
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
.header-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.image-view i{animation:rotate 1.5s ease infinite;color:##maincolor##;font-size:30px;height:100%;line-height:150px;text-align:center;width:100%}
.imagecheck-figure:before{content:"";position:absolute;top:.25rem;left:.25rem;display:block;width:1rem;height:1rem;pointer-events:none;user-select:none;background:##maincolor## url("data:image/svg+xml,&lt;svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'>&lt;path fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/>&lt;/svg>") no-repeat center center/50% 50%;color:#fff;z-index:1;border-radius:3px;opacity:0;transition:.3s opacity}
.imagecheck-input:focus~.imagecheck-figure{border-color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.info-bar-info span:first-child{color:##maincolor##}
.introduction-video .video-js .vjs-control-bar{background-color:##maincolor##cc}
.introduction-video-mobile .introduction-video-btn{background-color:##maincolor##;border-radius:26px;margin-top:5rem}
.link-records-editor .create-link-records .new-record:hover{background:#fff;border-color:##maincolor##}
.link-records-editor .create-link-records .new-record{align-items:center;border:1px dashed #ccc;border-radius:4px;color:##maincolor##;display:inline-flex;justify-content:center;padding:0 10px;width:100%}
.list-group-item.active{z-index:2;color:##maincolor##;background-color:#fffaf5;border-color:rgba(0,40,100,.12)}
.list-group-transparent .list-group-item.active{background:rgba(##mainrgba##,.06);font-weight:600}
.login-panel .login-panel-register-type:hover {  border-color: ##maincolor##;}
.mobile-float-icon{background-color:##maincolor##;border:none;border-radius:50%;bottom:42px;box-shadow:0 3px 5px -1px #ffa25233,0 6px 10px 0 #ffa25224,0 1px 18px 0 #ffa2521f;color:#999;cursor:pointer;display:flex;font-size:16px;height:50px;position:fixed;right:10px;-webkit-user-select:none;user-select:none;width:50px}
.mobile-main-panel .selected-tab-item{color:##maincolor##;font-size:22px}
.mobile-notification-modal .mobile-notification-tool .notification-type-tabs .tab-item.active{border-bottom:.125rem solid ##maincolor##;color:##maincolor##}
.mobile-share-table .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile-share-view .mobile-share-title-name{color:##maincolor##;margin-left:5px}
.mobile_dtable-map-plugin-header-btn-highlight__dYdDa{color:##maincolor##}
.mobile_mobile-select-all__9qLb-{color:##maincolor##}
.mobile_mobile-select-all__esQ2M{color:##maincolor##}
.nav .nav-item .nav-link.active {  color: ##maincolor##;  text-decoration: none;  border-bottom: 0.125rem solid ##maincolor##;}
.nav-pills .nav-item .nav-link.active {  background-color: ##maincolor##;  color: #fff;  border: none;}
.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:##maincolor##}
.nav-tabs .nav-submenu .nav-item.active{color:##maincolor##}
.notification-container .notification-body .nav .nav-item .nav-link.active{color:##maincolor##!important}
.operation-table{color:##maincolor##;flex:1 1;max-width:100px}
.option-editor-footer .item-text{color:##maincolor##;cursor:pointer}
.option-group .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.order-item .order-price{color:##maincolor##;font-size:26px;font-weight:500}
.org-admin .main-panel .nav .nav-item .nav-link.active,.sys-admin .main-panel .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.org-info-content .am-progress-bar{background-color:##maincolor##;border-radius:5px;height:6px!important}
.outline-h2:hover{color:##maincolor##}
.outline-h3:hover{color:##maincolor##}
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
.page-link:focus{z-index:3;outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.participants .add-participants i{background-color:#fff;border:2px solid #fff;border-radius:50%;color:##maincolor##;font-size:16px}
.path-link {  color: ##maincolor## !important;  text-decoration: none;}
.path-toolbar .toolbar-item a:hover{color:##maincolor##;text-decoration:none}
.plan-description-item .plan-description{color:##maincolor##;font-size:20px;font-weight:500}
.plan-description-item.plan-selected{background-color:#fff5eb;border-color:##maincolor##;border-width:2px}
.price-version-container-header .price-version-plan-name{border-bottom:1px solid ##maincolor##;font-size:1.5rem;padding:1rem 0}
.progress-bar{display:flex;flex-direction:column;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:##maincolor##;transition:width .6s ease}
.rbc-btn-group .rbc-tool-btn.today-btn-disabled,.rbc-btn-group .rbc-tool-btn:hover{background-color:##maincolor##;border:1px solid ##maincolor##;color:#fff}
.rbc-btn-group .rbc-tool-icon:hover{background-color:##maincolor##;color:#fff}
.rbc-btn-group .view-type-list .rbc-view-type.rbc-active{background:##maincolor##;color:#fff}
.rbc-current-time-indicator-label{border-left:0!important;bottom:-10px;color:##maincolor##;font-size:14px;font-weight:400;padding:0 5px;position:absolute}
.rbc-current-time-indicator{background-color:##maincolor##;border-color:##maincolor##;height:1px;pointer-events:none;position:absolute;right:0;z-index:3}
.rbc-now .rbc-date-context{background-color:##maincolor##;color:#fff}
.rbc-year-view .day-events{background-color:##maincolor##;border-radius:50%;height:4px;left:16px;position:absolute;top:22px;width:4px}
.rbc-year-view .rbc-current{background-color:##maincolor##;border-radius:2px;color:#fff}
.rbc-year-view .rbc-year-month-header{color:##maincolor##;padding-left:10px}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:unset}
.rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.rc-slider-handle:hover{border-color:##maincolor##}
.rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.rc-slider-handle{position:absolute;width:14px;height:14px;cursor:pointer;cursor:-webkit-grab;margin-top:-5px;cursor:grab;border-radius:50%;border:2px solid ##maincolor##;background-color:#fff;touch-action:pan-x}
.rc-slider-track{background-color:##maincolor##;left:0}
.rc-slider-track{left:0;background-color:##maincolor##}
.react-contextmenu-item.react-contextmenu-item--active,.react-contextmenu-item.react-contextmenu-item--selected,.react-contextmenu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.restore-base-button{color:##maincolor##;min-width:35px;padding-left:5px;text-align:right}
.row-card-list .no-link-tip>.btn-outline-primary:hover{background-color:##maincolor##}
.row-card-list .no-link-tip>.btn-outline-primary{background-color:##maincolor##}
.row-color-duplicate-value-select .option.option-active{background-color:##maincolor##;color:#fff;cursor:pointer}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{border-bottom:2px solid ##maincolor##;color:#212529}
.row-expand-comments .row-comment-header .row-comment,.row-expand-comments .row-comment-header .row-operation{color:#212529;border-bottom:2px solid ##maincolor##}
.sdoc-comment-drawer .add-comments-participants .sdocfont{border-radius:50%;color:##maincolor##;font-size:16px}
.sdoc-comment-list-container .comment-ui-container .comment-operation .sdoc-confirm{color:##maincolor##;font-weight:800}
.sdoc-file-select-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sdoc-outline-item.active{color:##maincolor##}
.sdoc-popover-menu__item:hover{background-color:##maincolor##;color:#fff}
.sdoc-tip-dialog .highlight-bg-color{background-color:##maincolor##;border-color:##maincolor##}
.sea-ai-assistant-auto-add-members-dialog .ai-assistant-settings-container .sea-ai-assistant-task-table-cell-content{align-items:center;color:##maincolor##;cursor:pointer;display:flex;justify-content:flex-start}
.sea-ai-assistant-chat-file-input-container .sea-ai-assistant-chat-file-upload-icon{align-items:center;background-color:##maincolor##;border-radius:8px;display:flex;height:32px;justify-content:center;width:32px}
.sea-ai-assistant-chat-input-container .icon-wrapper:hover .item-icon{color:##maincolor##}
.sea-ai-assistant-chat-input-container .item-icon{color:##maincolor##;height:16px;width:16px}
.sea-ai-assistant-chats .ai-assistant-chat-history-operation-btn:not(.disabled):hover{background-color:##maincolor##;color:#fff}
.sea-ai-assistant-chats .ai-assistant-chat-history-operation-btn{background-color:#fff;border:1px solid ##maincolor##;border-radius:3px;color:##maincolor##;font-size:13px;font-weight:600;line-height:1;max-width:100%;min-width:24px;padding:6px 12px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}
.sea-ai-assistant-instructions-wrapper .instructions-content .instruction:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-message-content .sea-ai-assistant-use-tip-order-item:hover{background-color:##maincolor##;color:#fff;cursor:pointer;transition:all .1s}
.sea-ai-assistant-op-popover .assistant-op-item:hover{background-color:##maincolor##;color:#fff;font-size:.875rem}
.sea-ai-assistant-settings-dialog .ai-assistant-settings-container-header-right{align-items:center;color:##maincolor##;cursor:pointer;display:flex;-webkit-user-select:none;user-select:none}
.sea-ai-assistant-settings-dialog .ai-assistant-settings-sidebar .ai-assistant-settings-sidebar-item.active-item{background-color:##maincolor##!important;color:#fff}
.sea-chart-settings .rc-slider-handle-click-focused:focus{border-color:##maincolor##;box-shadow:none}
.sea-chart-settings .rc-slider-handle-dragging{border-color:##maincolor##;box-shadow:0 0 0 5px ##maincolor##}
.sea-chart-settings .rc-slider-handle:active{border-color:##maincolor##;box-shadow:0 0 5px ##maincolor##;cursor:grabbing}
.sea-chart-settings .rc-slider-handle:hover{border-color:##maincolor##}
.sea-chart-settings .rc-slider-handle{background-color:#fff;border:2px solid ##maincolor##;border-radius:50%;cursor:pointer;cursor:-webkit-grab;cursor:grab;height:14px;margin-top:-5px;position:absolute;touch-action:pan-x;width:14px}
.sea-chart-settings .rc-slider-track{background-color:##maincolor##;border-radius:6px;height:4px;left:0;position:absolute}
.sea-chart-settings .sea-chart-settings-type .sea-chart-settings-type-item.selected{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.sea-chart-types-dialog .sea-chart-chart-categories-nav .sea-chart-chart-cat-nav-item-container.sea-chart-icon-highlight .chart-icon{color:##maincolor##}
.sea-chart-types-dialog .sea-chart-type-item.selected{border-color:##maincolor##}
.search-result-container .search-result-item:hover{background-color:#eee;border-left:2px solid ##maincolor##}
.search-result-list .item-content .item-name{color:##maincolor##!important}
.search-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.seatable-app-form-settings .seatable-app-form-content .dragging-add-field{border:1px dashed ##maincolor##;color:##maincolor##}
.seatable-app-form-settings .seatable-app-form-content .seatable-app-form-drop-placeholder{border:2px dashed ##maincolor##;border-radius:3px;height:100px;opacity:.75;width:100%}
.seatable-app-page .dtable-plugin-column-setting-item-title .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px;font-weight:450}
.seatable-app-table.context-dropdown-menu .context-menu-item:focus{background-color:##maincolor##;color:#fff}
.seatable-app-table.context-dropdown-menu .context-menu-item:hover{background-color:##maincolor##;border-color:##maincolor##;color:#fff;text-decoration:none}
.seatable-bg-orange {  background-color: ##maincolor## !important;}
.seatable-form-app-settings-panel .add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.seatable-share-form .form-content .submit-form.focus{background-color:##maincolor##;border-color:##maincolor##;color:#fff}
.select-button-action-popover .select-button-action-list .select-button-action-item.active{background:##maincolor##;border-radius:4px;color:#fff}
.select-columns-dialog .column-option:hover{background-color:##maincolor##;color:#fff;cursor:pointer}
.select-columns-dialog .select-columns{color:##maincolor##;cursor:pointer;font-size:13px;font-weight:500}
.select-page-icons .select-page-icon-active,.select-page-icons .select-page-icon-active:hover{background-color:##maincolor##}
.select-user-modal .modal-select-user-header .select-user-close-btn{color:##maincolor##;font-size:14px;font-weight:400;position:absolute;right:15px}
.selectgroup-input:checked+.selectgroup-button{border-color:##maincolor##;z-index:1;color:##maincolor##;background:#fff2e6}
.selectgroup-input:focus+.selectgroup-button{border-color:##maincolor##;z-index:2;color:##maincolor##;box-shadow:0 0 0 2px rgba(##mainrgba##,.25)}
.share-add-btn-container .share-add-btn{background:#fff;background-image:none;border-color:##maincolor##;color:##maincolor##;margin-top:10px;outline:none;width:90%}
.share-dialog .nav .nav-item .nav-link.active{border-bottom:2px solid ##maincolor##;color:##maincolor##;text-decoration:none}
.share-dialog .nav-pills .nav-item .nav-link.active{background-color:##maincolor##;border:none;color:#fff}
.share-dialog .op-target{word-wrap:break-word;color:##maincolor##}
.share-link-dialog .share-link-info .share-link-content{color:##maincolor##;cursor:pointer;display:inline-block;width:100%}
.share-link-dialog .share-link-info .share-link-content{display:inline-block;width:100%;color:##maincolor##;cursor:pointer}
.share-permissions-manage .share-permissions-manage-header button{border-color:##maincolor##;color:##maincolor##;font-weight:400;margin:0;padding-bottom:0;padding-top:0}
.share-table-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.share-view-side .share-nav-item-active{border-bottom:2px solid ##maincolor##;color:#212529}
.side-nav-footer .join-us-icon{color:##maincolor##;font-size:20px;margin-right:10px}
.side-panel .nav-link.active{color:##maincolor##}
.single-record-page-setting-element-types-add-all{color:##maincolor##;cursor:pointer;font-size:14px}
.snapshot-item .snapshot-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-chart-addition-dialog .selected-statistic-type-item{background-color:##maincolor##;color:#fff}
.statistic-chart-preview .dtable-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.statistic-dropdown-menu .dropdown-item:hover{background-color:##maincolor##;color:var(--font-hover-color)}
.submit-map-editor{background-color:#fff;border:1px solid #0000;border-radius:3px;box-shadow:0 0 12px #0000004d;color:##maincolor##;cursor:pointer;display:inline-block;font-size:.875rem;height:38px;line-height:1.8461538462;margin-left:16px;padding:.375rem .75rem;text-align:center;-webkit-user-select:none;user-select:none;vertical-align:middle;white-space:nowrap}
.subscription-container .text-orange{color:##maincolor##!important}
.subscription-submit{background-color:##maincolor##;border-radius:5px;color:#fff;font-size:16px;height:44px;margin-bottom:10px;width:100%}
.table-calendar-link:before{content:"";width:4px;height:4px;position:absolute;left:.25rem;top:.25rem;border-radius:50px;background:##maincolor##}
.table-calendar-link:hover{color:#fff;text-decoration:none;background:##maincolor##;transition:.3s background}
.table-item-more-operation .advanced-menu.show>.btn-secondary.dropdown-toggle{background-color:##maincolor##;color:#fff}
.table-setting.form-setting-all-required{color:##maincolor##;cursor:pointer;font-size:14px}
.tables-tabs-content .tabs-nav-scroll-after{background:linear-gradient(90deg,##maincolor##33,##maincolor##99,##maincolor##);right:10px;top:0;width:20px}
.tables-tabs-content .tabs-nav-scroll-before{background:linear-gradient(270deg,##maincolor##33,##maincolor##99,##maincolor##);left:0;top:0;width:25px;z-index:5}
.tag-primary{background-color:##maincolor##;color:#fff}
.template-categories .template-category-item.active{color:##maincolor##;text-decoration:underline}
.template-categories .template-category-item:hover{color:##maincolor##}
.template-list-container .template-container:hover{background:#fffbf8;border-color:##maincolor##;cursor:pointer}
.template-list-dialog .modal-header .modal-header-template{color:##maincolor##;font-size:24px;line-height:1;margin-right:10px}
.text-editor-container .text-editor-dropdown-item:hover{background-color:##maincolor##;color:#fff}
.text-primary{color:##maincolor## !important}
.tool-popover .tool-item:hover,.tool-popover .tool-item:hover dd,.tool-popover .tool-item:hover dt,.tool-popover .tool-item:hover span{background-color:##maincolor##;color:#fff}
.trash-table .trash-table-base-detail .trash-table-restore-mobile{color:##maincolor##;cursor:pointer}
.tree-view-trash-tab.active,.tree-view-trash-tab.active .dtable-font,.tree-view-trash-tab.active svg{background-color:##maincolor##;border-radius:4px;color:#fff}
.user-input-chat .sea-ai-assistant-message-content{background-color:##maincolor##;border-radius:6px 0 6px 6px;color:#fafafa}
.user-setting-nav .nav-item .nav-link:hover{color:##maincolor##}
.user-setting-nav .nav-item.active .nav-link{border-left-color:##maincolor##;color:##maincolor##}
.view-edit-popover-header .remove-icon-button{color:##maincolor##}
.workflow-app-container .participants-type-container .selected-participants-type-item{background-color:#e5a1521a;box-shadow:0 0 0 1px ##maincolor##;color:##maincolor##}
.workflow-app-settings-container .fields-setting-header .setting-choose-all{color:##maincolor##;cursor:pointer;font-size:12px}
.workflow-folder-tree .workflow-folder-tree-item.active-item{background-color:##maincolor##;border-radius:4px;color:#fff}
.workflow-group-container .load-more-workflows .load-more-workflows-tip{color:##maincolor##;cursor:pointer;margin:0 16px}
.workflow-list-view .list-view-sidebar li{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .share-item-view-sidebar .sidebar-item-active,.workflow-list-view .specific-list-view-sidebar .sidebar-item-active{border-bottom:2px solid ##maincolor##;color:##maincolor##}
.workflow-list-view .view-header .dtable-icon-workflow{color:##maincolor##}
.workflow-node-dropdown .dropdown-item:hover,.workflow-node-dropdown .selected-dropdown-item{background-color:##maincolor##;color:#fff}
.workflow-task-dialog .workflow-task-nodes-logs .workflow-task-node-log-selector.selected{border-bottom:2px solid ##maincolor##;color:#212529}
.workflow-task-list-modal .workflow-task-list-modal-header-left .dtable-icon-workflow{color:##maincolor##;font-size:20px;font-weight:500}
.workflow-task-list-toolbar-container .task-date-dropdown .dropdown-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-logs .workflow-task-log .workflow-task-log-icon{color:##maincolor##;margin-right:5px}
.workflow-task-nodes-popover .workflow-task-nodes .workflow-task-node-item:hover{background-color:##maincolor##;color:#fff}
.workflow-task-pending-dialog .workflow-task-flow-header .flow-chart,.workflow-task-pending-dialog .workflow-task-flow-header .task-logs{border-bottom:2px solid ##maincolor##;color:#212529}
.workspace .dropdown-item:not(.disabled):focus .dtable-font,.workspace .dropdown-item:not(.disabled):hover .dtable-font{background-color:##maincolor##!important;color:#fff!important}
.seatable-text-orange {  color: ##maincolor## !important;}
a.badge-primary:focus,a.badge-primary.focus{outline:0;box-shadow:0 0 0 2px rgba(##mainrgba##,.5)}
a.badge-primary:hover,a.badge-primary:focus{color:#fff;background-color:##maincolor##}
a.bg-primary:hover,a.bg-primary:focus,button.bg-primary:hover,button.bg-primary:focus{background-color:##maincolor## !important}
a:focus,a:hover {  color: ##maincolor##;}
a:hover{color:##maincolor##}
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
  codeElement.textContent = css_input
    .replaceAll("##maincolor##", color)
    .replaceAll("##mainrgba##", rgba_color);
}

/* wie erzeuge ich diese listen:
./generate-css.sh <docker-version-tag>
Diesen CSS Code, dann hier einbauen...
*/
