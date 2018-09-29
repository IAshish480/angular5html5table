"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AngularTableComponent = (function () {
    function AngularTableComponent() {
        this.onSelectedRows = new core_1.EventEmitter();
        this.onRowValueChange = new core_1.EventEmitter();
        this.onColumnClicked = new core_1.EventEmitter();
        this.varForSort = true;
        this.todayDate = "";
        this.headerChecked = false;
        this.scroll = { x: false, y: false };
        this.rowData = [];
        this.headerRowsArray = [];
        this.headerCheckedListenerFire = false;
        this.previousDataArray = [];
        this.columnType = '';
        this.tableId = "";
        this.currentRow = 0;
        this.currentCell = 0;
        this.lastKeyClicked = '';
        this.clickedOnRowNumber = "";
        this.tableName = "";
    }
    AngularTableComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.data != this.previousDataArray) {
            this.previousDataArray = this.data;
            this.rowData = this.data;
            if (+this.clickedOnRowNumber < this.rowData.length) {
                this.clickedOnRow(this.rowData[+this.clickedOnRowNumber], +this.clickedOnRowNumber, { keyCode: '37' });
                setTimeout(function () { document.getElementById(_this.tableId + "rows" + _this.clickedOnRowNumber) ? document.getElementById(_this.tableId + "rows" + _this.clickedOnRowNumber).click() : ""; }, 100);
            }
        }
    };
    AngularTableComponent.prototype.ngAfterViewInit = function () {
        this.rowData = this.data;
        this.headerRowsArray = this.columnArray;
        this.columnType = this.FirstcolumnType;
        this.previousDataArray = this.rowData;
        this.tableId = this.customTableId ? this.customTableId : 'customTable';
        this.clickedOnRowNumber = this.selectedRowId ? this.selectedRowId : '0';
        this.tableName = this.tableNameFromParent ? this.tableNameFromParent : '';
    };
    AngularTableComponent.prototype.currentDate = function () {
        var tdate = new Date();
        var month = "" + (tdate.getMonth() + 1);
        if (tdate.getMonth() < 10)
            month = 0 + "" + month;
        var date = "" + tdate.getDate();
        if (tdate.getDate() < 10)
            date = 0 + "" + date;
        return tdate.getFullYear() + "-" + month + "-" + date;
    };
    AngularTableComponent.prototype.ngOnInit = function () {
        this.todayDate = this.currentDate();
    };
    AngularTableComponent.prototype.ChangeCurrentCell = function (event) {
        switch (event.keyCode) {
            case 37:
                console.log(this.currentCell);
                if (this.currentCell > 0)
                    this.currentCell--;
                this.columnClicked(this.currentRow, this.currentCell, event);
                return false;
            case 38:
                if (this.currentRow > 0)
                    this.currentRow--;
                this.clickedOnRow(this.rowData[this.currentRow], this.currentRow, event);
                this.columnClicked(this.currentRow, this.currentCell, event);
                return false;
            case 39:
                console.log(this.currentCell, '...39');
                if (this.headerRowsArray.length - 1 > this.currentCell) {
                    this.currentCell++;
                    console.log('inside if...', this.headerRowsArray.length, '.......', this.currentCell);
                }
                this.columnClicked(this.currentRow, this.currentCell, event);
                return false;
            case 40:
                if (this.rowData.length - 1 > this.currentRow)
                    this.currentRow++;
                this.clickedOnRow(this.rowData[this.currentRow], this.currentRow, event);
                this.columnClicked(this.currentRow, this.currentCell, event);
                return false;
            default:
                return true;
        }
    };
    AngularTableComponent.prototype.clickedOnRow = function (rows, selectedRowNo, event) {
        var _this = this;
        this.currentRow = selectedRowNo;
        if (event.keyCode || event.type == "click")
            this.onSelectedRows.emit({
                value: rows
            });
        this.rowData.forEach(function (obj, objIndex) {
            if (objIndex % 2 == 0)
                document.getElementById(_this.tableId + "rows" + objIndex) ? (document.getElementById(_this.tableId + "rows" + objIndex).style.background = "inherit") : "";
            else
                document.getElementById(_this.tableId + "rows" + objIndex) ? (document.getElementById(_this.tableId + "rows" + objIndex).style.background = "#cacaff") : "";
        });
        setTimeout(function () {
            document.getElementById(_this.tableId + "rows" + selectedRowNo) ? document.getElementById(_this.tableId + "rows" + selectedRowNo).style.background = "orange" : "";
        }, 100);
    };
    AngularTableComponent.prototype.columnClicked = function (rowIndex, columnIndex, event) {
        var _this = this;
        var wid = document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex).style.width : '0px';
        if (event.keyCode)
            this.lastKeyClicked = event.keyCode;
        if (event.toElement && event.toElement.offsetLeft && event.toElement.offsetLeft != 'undefined' && event.toElement.offsetLeft != undefined && event.toElement.offsetLeft != null) {
            if (this.lastKeyClicked == '39') {
                if (event.toElement.offsetLeft + (+wid.substr(0, wid.indexOf('p'))) > window.innerWidth)
                    document.getElementById(this.tableId).scrollLeft += 100;
            }
            else if (this.lastKeyClicked == '37') {
                if (event.toElement.offsetLeft + (+wid.substr(0, wid.indexOf('p'))) < window.innerWidth)
                    document.getElementById(this.tableId).scrollLeft -= 100;
            }
            this.currentCell = columnIndex;
            for (var i = 0; i < this.rowData.length; i++) {
                this.rowData.forEach(function (obj, id) {
                    _this.columnArray.forEach(function (colObj, index) {
                        document.getElementById(_this.tableId + "row" + i + "column" + index) ? document.getElementById(_this.tableId + "row" + i + "column" + index).style.background = "inherit" : "";
                        //  var ele = document.getElementById(this.tableId + "row" + i + "column" + index + "input");
                        //  ele && ele!=this.lastElement? ele.blur() : "";
                    });
                });
            }
            if (this.lastElement) {
                // this.lastElement.blur();
                console.log(this.lastElement);
            }
            document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex).style.background = "lightblue" : "";
            var ele = document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex + "input");
            ele ? ele.focus() : "";
            this.lastElement = document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex + "input");
        }
        else {
            document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex).click() : '';
        }
    };
    AngularTableComponent.prototype.onHeaderSelection = function (selectionValue) {
        this.headerCheckedListenerFire = true;
        for (var i = 0; i < this.rowData.length; i++)
            this.rowData[i].selected = selectionValue;
        var selectedRows = this.rowData.filter(function (u) { return u.hasOwnProperty("selected") && u.selected == true; });
        this.onSelectedRows.emit({ value: selectedRows });
    };
    AngularTableComponent.prototype.onClicked = function () {
        this.headerCheckedListenerFire = false;
    };
    AngularTableComponent.prototype.onRowSelected = function (selectedRow, indexVar) {
        this.currentRow = indexVar;
        selectedRow.selected = selectedRow.selected;
        if (this.headerCheckedListenerFire == true)
            return;
        this.headerCheckedListenerFire = false;
        var selectedRows = this.rowData.filter(function (u) { return u.hasOwnProperty("selected") && u.selected == true; });
        this.onSelectedRows.emit({ value: selectedRows });
    };
    AngularTableComponent.prototype.clickedForSort = function (column, sortBy) {
        var _this = this;
        if (column["sort"] == true) {
            this.varForSort = !this.varForSort;
            this.rowData = this.rowData.sort(function (x, y) {
                if (_this.varForSort)
                    return x[sortBy] == y[sortBy] ? 0 : x[sortBy] > y[sortBy] ? 1 : -1;
                else if (!_this.varForSort) {
                    return (x[sortBy] > y[sortBy] ? 0 : x[sortBy] == y[sortBy]) ? -1 : 1;
                }
            });
        }
    };
    AngularTableComponent.prototype.onValueChange = function (headerColumn, column, value, rowData) {
        this.data = this.rowData;
        this.onRowValueChange.emit({
            value: { modelId: column, newValue: value, rowData: rowData }
        });
    };
    AngularTableComponent.prototype.onSelectionChanged = function (column, rowData, selectionData) {
        var selectedValueObject = selectionData.filter(function (u) { return u[column] == rowData[column]; });
        if (selectedValueObject !== undefined)
            selectedValueObject = selectedValueObject[0];
        this.onRowValueChange.emit({
            value: { modelId: column, newValue: selectedValueObject, rowData: rowData }
        });
    };
    return AngularTableComponent;
}());
__decorate([
    core_1.Input("rowData"),
    __metadata("design:type", Array)
], AngularTableComponent.prototype, "data", void 0);
__decorate([
    core_1.Input("headerRowsArray"),
    __metadata("design:type", Array)
], AngularTableComponent.prototype, "columnArray", void 0);
__decorate([
    core_1.Input("leftColumnType"),
    __metadata("design:type", String)
], AngularTableComponent.prototype, "FirstcolumnType", void 0);
__decorate([
    core_1.Input("idOfTable"),
    __metadata("design:type", String)
], AngularTableComponent.prototype, "customTableId", void 0);
__decorate([
    core_1.Input("defaultSelectedRow"),
    __metadata("design:type", String)
], AngularTableComponent.prototype, "selectedRowId", void 0);
__decorate([
    core_1.Input("tableNameFromParent"),
    __metadata("design:type", String)
], AngularTableComponent.prototype, "tableNameFromParent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AngularTableComponent.prototype, "onSelectedRows", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AngularTableComponent.prototype, "onRowValueChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AngularTableComponent.prototype, "onColumnClicked", void 0);
AngularTableComponent = __decorate([
    core_1.Component({
        selector: "angular-table",
        template: "<fieldset [style.border-top]=\"tableName && tableName.length>0?'1px solid #d4d4d4':'none'\">\n  <legend *ngIf=\"tableName && tableName.length>0\">{{tableName}}</legend>\n  <div (keydown)=\"ChangeCurrentCell($event)\" tabindex=\"1\" id=\"{{tableId}}\" style=\"height: 98%;display:-webkit-box;\">\n    <table style=\"margin-top: 2px; margin-left: 1px;\">\n      <thead [style.overflow-x]=\"'hidden'\" [style.overflow-y]=\"scroll.y == true ? 'scroll' : 'hidden'\" style=\"border-spacing: 0px; border-collapse: collapse; width: 99%; float: left;\">\n        <tr class=\"changeOnHover\">\n          <td style=\"width: 21px;min-width: 14px;max-width: 21px;padding-left: 5px;\">\n            <input *ngIf=\"columnType == 'checkbox'\" style=\"width: 14px; height: 14px;\" type=\"checkbox\" [(ngModel)]=\"headerChecked\"\n              (ngModelChange)=\"onHeaderSelection(headerChecked)\">\n            <label style=\"color:black; font-family: monospace; font-weight: bold;\" *ngIf=\"columnType == 'slno'\">\n              #\n            </label>\n          </td>\n       \n          <ng-container *ngFor=\"let column of headerRowsArray\">\n            <td *ngIf=\"(column['visible']==undefined || column['visible']==null || column['visible']==true)\" (click)=\"clickedForSort(column,column['modelId'])\"\n              [style.width]=\"column.width\" [style.min-width]=\"column.type && column.type=='date'?'120px':column.width\"\n              [style.max-width]=\"column.width\">\n              <span style=\"color:black; font-weight: bold;\">{{column['columnName']}}\n              </span>\n              <i *ngIf=\"column['sort'] == true\" class=\"sortIcon material-icons\">unfold_more</i>\n            </td>\n          </ng-container>\n        </tr>\n      </thead>\n\n      <tbody [ngClass]=\"{myscroll: scroll.y, myhidden: !scroll.y, myhozscroll: scroll.x, myhozhidden: !scroll.x }\"\n        style=\"overflow-y: auto; float: left; width: 99%;\">\n        <tr *ngFor=\"let rows of rowData; let indexVar = index;\" id=\"{{tableId}}rows{{indexVar}}\">\n\n          <td style=\"width: 21px;padding-left: 5px;max-width: 21px;\" (click)=\"clickedOnRow(rows,indexVar,$event)\">\n            <input *ngIf=\"columnType == 'checkbox'\" type=\"checkbox\" [(ngModel)]=\"rows['selected']\" (click)=\"onClicked()\"\n              style=\"width: 14px; height: 14px;\" (ngModelChange)=\"onRowSelected(rowData,indexVar)\">\n            <label *ngIf=\"columnType == 'slno'\">\n              {{indexVar + 1}}.\n            </label>\n          </td>\n          <ng-container *ngFor=\"let column of headerRowsArray; let ind = index\">\n            <td *ngIf=\"(column['visible']==undefined || column['visible']==null || column['visible']==true)\"\n              [style.min-width]=\"headerRowsArray[ind]['type'] && headerRowsArray[ind]['type']=='date'?'120px':headerRowsArray[ind]['width']\"\n              [style.max-width]=\"headerRowsArray[ind]['width']\" [style.text-align]=\"column['type'] && column['type'] == 'number' ? 'right': column['type']=='string' || column['type']==undefined || column['type']==''?'left':'center'\"\n              [style.width]=\"headerRowsArray[ind]['width']\" id=\"{{tableId}}row{{indexVar}}column{{ind}}\" (click)=\"columnClicked(indexVar,ind,$event);\">\n\n              <label id=\"{{tableId}}row{{indexVar}}column{{ind}}input\"   *ngIf=\"column['editable'] != true && column['type'] != 'button'\" [style.padding-left]=\"'5px'\"\n                style=\"width: 90%;height: 100%;display: block;cursor: pointer;\" (click)=\"clickedOnRow(rows,indexVar,$event);\"\n                [style.padding-right]=\"column['type'] && column['type'] == 'number' ? '5px': ''\">\n                {{column['subModelId'] ? (rows[column['subModelId']] ? (rows[column['subModelId']] &&\n                column['jointModelId'] )?\n                rows[column['subModelId']][column['jointModelId']][column['modelId']] :\n                rows[column['subModelId']][column['modelId']] : rows[column['subModelId']]) : rows[column['modelId']]}}\n              </label>\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == undefined || column['type'] == null ||column['type'] == '' ||column['type'] == 'string'  )\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\"\n                type=\"text\" style=\"text-align: left; width: 100%;\" class=\"customInput\" (click)=\"clickedOnRow(rows,indexVar,$event);\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'number')\" [(ngModel)]=\"rows[column.modelId]\"\n                (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\" type=\"number\" class=\"customInput\"\n                [number]=\"column.decimal?column.decimal:'0'\" style=\"padding-right: 10%; text-align: right;\" (click)=\"clickedOnRow(rows,indexVar,$event);\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'checkbox')\" [(ngModel)]=\"rows[column.modelId]\"\n                (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\" type=\"checkbox\"\n                class=\"customInput\" style=\"padding-right: 10%; text-align: right; height: 16px;\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'date')\" [(ngModel)]=\"rows[column.modelId]\"\n                (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\" onfocusin=\" this.type = 'date'\"\n                onofocusout=\" this.type = 'text'\" onblur=\"(this.value ? this.type = 'date' : this.type = 'text')\"\n                placeholder=\"\" class=\"customInput\" style=\"text-align: center; width: 100%;\" min=\"{{column['setMinDate'] && column['setMinDate'] == true ? todayDate : ''}}\"\n                max=\"{{column['setMaxDate'] && column['setMaxDate'] == true ? todayDate : ''}}\" (click)=\"clickedOnRow(rows,indexVar,$event);\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'time')\" [(ngModel)]=\"rows[column.modelId]\"\n                (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\" onfocusin=\" this.type = 'time'\"\n                onofocusout=\" this.type = 'text'\" onblur=\"(this.value ? this.type = 'time' : this.type = 'text')\"\n                placeholder=\"\" class=\"customInput\" style=\"text-align: center; width: 5.8rem; padding-right: 0.4rem;\"\n                (click)=\"clickedOnRow(rows,indexVar,$event);\">\n\n              <select id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'select')\" class=\"customInput\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onSelectionChanged(column.modelId, rows, column.values)\">\n                <option value='' disabled>Select</option>\n                <option *ngFor=\"let val of column['values']\" [value]=\"val[column['modelId']]\">\n                  {{val[column['displayId']]}}\n                </option>\n              </select>\n\n              <span *ngIf=\"!column['editable'] && (column['type'] == 'button') && rows[column['modelId']] && rows[column['modelId']] != ''\"\n                class=\"customButton\" (click)=\"clickedOnRow(rows,indexVar,$event);\">\n                {{rows[column['modelId']]}}</span>\n            </td>\n          </ng-container>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</fieldset>",
        styles: ["table {\n    max-width: 100%;\n    width: 100%;\n    display: grid;\n    border-spacing: 0px;\n    overflow: auto;\n    border-collapse: collapse;\n    border-radius: 8px;}\n  \n  span {\n    font-family: monospace;\n  }\n  \n  th,\n  td {\n    border: 1px solid #d4d4d4;\n    text-align: center;\n  }\n  \n  thead,\n  tfoot {\n    background: #f9f9f9;\n  }\n  \n  thead{\n    display: inline-table;\n  }\n  \n  tbody {\n     display: inline-table;\n  }\n  \n  input {\n    font-size: 13px !important;\n    border-radius: 4px;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    padding-left: 3px;\n    font-family: monospace;\n  }\n  \n  select {\n    font-size: 13px !important;\n    font-family: monospace;\n  }\n  \n  label {\n    font-size: 13px !important;\n    color: rgba(0,0,0,.6);\n  }\n  thead tr{\n    height: 35px;\n   \n  } thead tr td{\n    cursor:pointer;\n    text-align: center;\n    width:21px;\n    opacity: 0.9;\n    background: #f3f3f3;\n  }\n  tbody tr {\n    table-layout: fixed;\n    text-align: left;\n    height: 24px;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    min-width: 20px;\n    font-family:  monospace;\n  }\n  \n  .customInput {\n    width: 90%;\n    border: none;\n    padding: 0;\n    float: left;\n    background: inherit;\n  }\n  \n  .customInput:focus {\n    background: white;\n  }\n  \n  input[type=date] {\n    min-width: 110px;\n  }\n  \n  input[type=number]::-webkit-inner-spin-button,\n  input[type=number]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  \n  input[type=date]::-webkit-inner-spin-button,\n  input[type=date]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  \n  input[type=time]::-webkit-inner-spin-button,\n  input[type=time]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  \n  thead tr td:first-child{\n    border-radius: 10px 0px 0px 0px\n  }\n  \n  thead tr:first-child{\n    border-radius: 6px 6px 0px 0px;\n  }\n  \n  thead {\n    border-radius: 10px 10px 0px 0px;\n  }\n  \n  thead  tr td:last-child{\n    border-radius: 0px 10px 0px 0px;\n  }\n  \n  .customButton {\n    color: white;\n    display: inline-block;\n    padding: .25rem 2.2rem;\n    font-weight: 700;\n    line-height: 1;\n    text-align: center;\n    white-space: nowrap;\n    cursor: pointer;\n    vertical-align: baseline;\n    border-radius: 1rem;\n    background-color: #ffc107;\n    border-radius: 5px;\n    position: relative;\n    top: 0px;\n    transition: all ease 0.3s;\n  }\n  \n  .customButton:active {\n    top: 2px;\n  }\n  \n    tr:nth-child(even) {\n      background-color: #cacaff;\n    }\n    /* tbody tr:hover {\n      background: rgb(227, 247, 254) !important;\n    }\n    tbody tr td:hover {\n      background: lightblue !important;\n    } */\n    tbody tr td{\n      cursor:pointer;\n      text-align: center;\n      border:1px solid #d4d4d4; \n      height: 15px; \n    }\n   \n    .sortIcon{\n      font-size: 16px;\n      float: right;\n      color: black;\n      font-weight: 600;\n    }\n  \n  \n  /* giving calender icon instead of dropdown in date field */\n  \n  /* input[type=\"date\"] {\n    position: relative;\n  } */\n  \n  /* input[type=\"date\"]::-webkit-calendar-picker-indicator {\n    color: transparent;\n    background: none;\n    z-index: 1;\n  } */\n  /* input[type=\"date\"]:before:focus{\n    display: block;\n  } */\n  /* input[type=\"date\"]:before {\n    \n   color: transparent;\n    background: none;\n    display: none;\n    font-family: 'FontAwesome';\n    content: '\f073';\n    width: 15px;\n    height: 20px;\n    position: absolute;\n    top: 3px;\n    right: 2px;\n    color: #999;\n  } */\n  fieldset{\n    font-size: 12px;\n  \n    font-family: monospace;\n      margin: 0px;\n      padding: 0;\n      display: contents;\n      height: 99%;\n      display: -webkit-box;\n      min-width: 0px;\n      border-bottom: none;\n      border-left: none;\n      border-right: none;\n    }"
        ]
    })
], AngularTableComponent);
exports.AngularTableComponent = AngularTableComponent;
