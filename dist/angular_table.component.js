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
var material_1 = require("@angular/material");
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
        this.currentRowFreeze = 0;
        this.currentCell = 0;
        this.currentCellFreeze = 0;
        this.lastKeyClicked = '';
        this.lastKeyClickedFreeze = '';
        this.clickedOnRowNumber = "";
        this.tableName = "";
        this.oldColumns = [];
        this.oldData = [];
        this.pagingDiff = 10;
        this.startingPoint = 0;
        this.splicedColumns = [];
        this.filterColumnIndex = 0;
        this.filterColumnModelId = '';
        this.selectedChoice = 'Contains';
        this.buttonVal = 'Freeze Left';
        this.filterOptionChoices = {};
        this.show = 'pin';
        this.filterObjectHeader = {};
        this.groupList = [];
        this.myFilterModel = '';
        this.pinButtons = [{ name: 'Move Left', value: 'p1' }, { name: 'Move Right', value: 'p2' }, {
                name: 'Original Move', value: 'p3'
            }];
        this.freezeColumns = [];
        this.OptionList = [{ Value: "Equals", Name: 'Equals' }, {
                Value: "notEquals",
                Name: 'Not Equals'
            }, { Value: "startsWith", Name: 'Starts With' }, { Value: "endsWith", Name: 'Ends With' }, {
                Value: "Contains", Name: 'Contains'
            }, { Value: "notContains", Name: 'Not Contains' }];
    }
    AngularTableComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.data != this.previousDataArray) {
            this.previousDataArray = this.data;
            this.rowData = this.data;
            if (+this.clickedOnRowNumber < this.rowData.length) {
                this.clickedOnRow('normal', this.rowData[+this.clickedOnRowNumber], +this.clickedOnRowNumber, { keyCode: '37' });
                setTimeout(function () { document.getElementById(_this.tableId + "rows" + _this.clickedOnRowNumber) ? document.getElementById(_this.tableId + "rows" + _this.clickedOnRowNumber).click() : ''; }, 100);
            }
        }
    };
    AngularTableComponent.prototype.mySelectedChoice = function (selected) {
        this.filterOptionChoices[this.filterColumnModelId + '-FilterOption'] = selected;
    };
    AngularTableComponent.prototype.testMethodForInput = function (selected) {
        this.filterObjectHeader[this.filterColumnModelId] = selected;
    };
    AngularTableComponent.prototype.filterOnInput = function () {
        this.startingPoint = 0;
        if (!this.filterObjectHeader.hasOwnProperty(this.filterColumnModelId) && this.myFilterModel.trim().length > 0)
            this.filterObjectHeader[this.filterColumnModelId] = this.myFilterModel;
        else if (this.filterObjectHeader.hasOwnProperty(this.filterColumnModelId) && this.myFilterModel.trim().length > 0)
            this.filterObjectHeader[this.filterColumnModelId] = this.myFilterModel;
        else if (this.filterObjectHeader.hasOwnProperty(this.filterColumnModelId) && this.myFilterModel.trim().length == 0) {
            delete this.filterObjectHeader[this.filterColumnModelId];
        }
        var numberOfKeys = Object.keys(this.filterObjectHeader).length;
        this.rowData = this.data;
        var dataToReturn = [];
        dataToReturn = this.data;
        if (numberOfKeys != 0) {
            var _loop_1 = function (key) {
                if (this_1.filterObjectHeader[key].trim() != '' && key && this_1.filterObjectHeader[key].trim() && this_1.selectedChoice.trim()) {
                    var config_1 = [key, this_1.filterObjectHeader[key], this_1.filterOptionChoices[key + '-FilterOption']];
                    if (config_1 === undefined || config_1[1] === undefined || config_1[1].trim().length === 0)
                        return { value: dataToReturn };
                    if (!Array.isArray(dataToReturn))
                        return { value: dataToReturn };
                    if (typeof config_1[2] == 'undefined' || config_1[2] == 'undefined' || config_1[2] == '' || config_1[2] == 'Contains')
                        dataToReturn = dataToReturn.filter(function (u) {
                            if (u.hasOwnProperty(config_1[0]))
                                return u[config_1[0]].toString().toUpperCase().indexOf(config_1[1].toString().toUpperCase()) != -1;
                        });
                    else if (typeof config_1[2] != 'undefined' && config_1[2] != 'undefined' && config_1[2] != '') {
                        if (config_1[2] == 'notContains')
                            dataToReturn = dataToReturn.filter(function (u) { if (u.hasOwnProperty(config_1[0]))
                                return u[config_1[0]].toString().toUpperCase().indexOf(config_1[1].toString().toUpperCase()) == -1; });
                        else if (config_1[2] == 'Equals')
                            dataToReturn = dataToReturn.filter(function (u) { if (u.hasOwnProperty(config_1[0]))
                                return u[config_1[0]].toString().toUpperCase() == config_1[1].toString().toUpperCase(); });
                        else if (config_1[2] == 'notEquals')
                            dataToReturn = dataToReturn.filter(function (u) { if (u.hasOwnProperty(config_1[0]))
                                return u[config_1[0]].toString().toUpperCase() != config_1[1].toString().toUpperCase(); });
                        else if (config_1[2] == 'startsWith')
                            dataToReturn = dataToReturn.filter(function (u) { if (u.hasOwnProperty(config_1[0]))
                                return u[config_1[0]].toString().toUpperCase().startsWith(config_1[1].toString().toUpperCase()); });
                        else if (config_1[2] == 'endsWith')
                            dataToReturn = dataToReturn.filter(function (u) { if (u.hasOwnProperty(config_1[0]))
                                return u[config_1[0]].toString().toUpperCase().endsWith(config_1[1].toString().toUpperCase()); });
                    }
                }
            };
            var this_1 = this;
            for (var key in this.filterObjectHeader) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        this.rowData = dataToReturn;
    };
    AngularTableComponent.prototype.groupByOption = function () {
        var newData = JSON.parse(JSON.stringify(this.oldData));
        this.groupList.push({ val: this.filterColumnModelId });
    };
    AngularTableComponent.prototype.setStyle = function (tabId) {
        document.getElementById('onetab').style.background = 'lightgray';
        document.getElementById('twotab').style.background = 'lightgray';
        document.getElementById('thirdtab').style.background = 'lightgray';
        document.getElementById(tabId).style.background = 'white';
        if (tabId === 'thirdtab') {
            document.getElementById('popUp').style.display = 'none';
            this.show = 'pin';
        }
        if (tabId === 'twotab') {
            setTimeout(function () {
                document.getElementById('filterInput').focus();
            }, 0);
        }
    };
    AngularTableComponent.prototype.gridOptionFunction = function (column, columnIndex, event) {
        var _this = this;
        this.filterColumnModelId = column.modelId;
        this.filterColumnIndex = columnIndex;
        this.show = 'pin';
        this.myFilterModel = this.filterObjectHeader[this.filterColumnModelId] ? this.filterObjectHeader[this.filterColumnModelId] : '';
        this.filterOptionChoices[column.modelId + '-FilterOption'] = this.filterOptionChoices[column.modelId + '-FilterOption'] ? this.filterOptionChoices[column.modelId + '-FilterOption'] : 'Contains';
        this.filterOptionChoices[column.modelId + '-buttonVal'] = this.filterOptionChoices[column.modelId + '-buttonVal'] ? this.filterOptionChoices[column.modelId + '-buttonVal'] : 'Freeze Left';
        this.buttonVal = this.filterOptionChoices[column.modelId + '-buttonVal'];
        setTimeout(function () {
            document.getElementById('popUp').style.display = 'block';
            document.getElementById('popUp').style.marginLeft = '0px';
            document.getElementById('popUp').style.marginLeft = event.x - 110 + 'px';
            _this.setStyle('onetab');
        }, 50);
    };
    AngularTableComponent.prototype.UnfreezeThis = function (column, index) {
        this.freezeColumns.splice(index, 1);
        this.headerRowsArray.splice(column.position, 0, column.obj);
    };
    AngularTableComponent.prototype.moveToFreeze = function (val) {
        this.freezeColumns.push({
            obj: this.headerRowsArray.splice(this.filterColumnIndex, 1)[0],
            position: this.filterColumnIndex
        });
        this.buttonVal = 'Freeze Left';
        this.filterOptionChoices[this.filterColumnModelId + '-buttonVal'] = this.buttonVal;
        var box2 = document.getElementById('popUp');
        box2.style.display = 'none';
    };
    AngularTableComponent.prototype.setArray = function (pId) {
        document.getElementById('popUp').style.display = 'none';
        function move(arr, old_index, new_index) {
            while (old_index < 0) {
                old_index += arr.length;
            }
            while (new_index < 0) {
                new_index += arr.length;
            }
            if (new_index >= arr.length) {
                var k = new_index - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr;
        }
        if (pId == 'p1') {
            this.headerRowsArray = move(this.headerRowsArray, this.filterColumnIndex, 0);
        }
        if (pId == 'p2') {
            this.headerRowsArray = move(this.headerRowsArray, this.filterColumnIndex, this.headerRowsArray.length - 1);
        }
        if (pId == 'p3') {
            this.headerRowsArray = this.oldColumns;
        }
        if (pId == 'p4') {
            this.splicedColumns.push({
                data: this.headerRowsArray.splice(this.filterColumnIndex, 1)[0],
                index: this.filterColumnIndex
            });
        }
    };
    AngularTableComponent.prototype.reAddColumnInGrid = function (col) {
        var index = this.splicedColumns.indexOf(col);
        if (index >= 0) {
            this.splicedColumns.splice(index, 1);
            this.headerRowsArray.splice(col.index, 0, col.data);
        }
    };
    AngularTableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.rowData = this.data;
        this.freezeColumns = this.columnArray.filter(function (u) { return u.freeze == true; });
        this.headerRowsArray = this.columnArray;
        this.columnType = this.FirstcolumnType;
        this.previousDataArray = this.rowData;
        this.tableId = this.customTableId ? this.customTableId : 'customTable';
        this.clickedOnRowNumber = this.selectedRowId ? this.selectedRowId : '0';
        this.tableName = this.tableNameFromParent ? this.tableNameFromParent : '';
        this.pagingDiff = this.paginator.pageSize;
        this.oldColumns = JSON.parse(JSON.stringify(this.headerRowsArray));
        this.oldData = JSON.parse(JSON.stringify(this.rowData));
        this.dataSource = new material_1.MatTableDataSource(this.rowData);
        setTimeout(function () {
            _this.dataSource.paginator = _this.paginator;
        }, 10);
    };
    AngularTableComponent.prototype.onPaginatorChange = function (e) {
        this.startingPoint = (this.paginator.pageIndex) * this.paginator.pageSize;
        this.pagingDiff = this.paginator.pageSize;
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
    AngularTableComponent.prototype.ChangeCurrentCell = function (tableType, event) {
        if (tableType == 'normal') {
            switch (event.keyCode) {
                case 37:
                    if (this.currentCell > 0)
                        this.currentCell--;
                    this.columnClicked(tableType, this.currentRow, this.currentCell, event);
                    return false;
                case 38:
                    if (this.currentRow > 0)
                        this.currentRow--;
                    this.clickedOnRow(tableType, this.rowData[this.currentRow], this.currentRow, event);
                    this.columnClicked(tableType, this.currentRow, this.currentCell, event);
                    return false;
                case 39:
                    if (this.headerRowsArray.length - 1 > this.currentCell) {
                        this.currentCell++;
                    }
                    this.columnClicked(tableType, this.currentRow, this.currentCell, event);
                    return false;
                case 40:
                    if (this.rowData.length - 1 > this.currentRow)
                        this.currentRow++;
                    this.clickedOnRow(tableType, this.rowData[this.currentRow], this.currentRow, event);
                    this.columnClicked(tableType, this.currentRow, this.currentCell, event);
                    return false;
                default:
                    return true;
            }
        }
        else if (tableType == 'freeze') {
            switch (event.keyCode) {
                case 37:
                    if (this.currentCellFreeze > 0)
                        this.currentCellFreeze--;
                    this.columnClicked(tableType, this.currentRowFreeze, this.currentCellFreeze, event);
                    return false;
                case 38:
                    if (this.currentRowFreeze > 0)
                        this.currentRowFreeze--;
                    this.clickedOnRow(tableType, this.rowData[this.currentRowFreeze], this.currentRowFreeze, event);
                    this.columnClicked(tableType, this.currentRowFreeze, this.currentCellFreeze, event);
                    return false;
                case 39:
                    if (this.headerRowsArray.length - 1 > this.currentCellFreeze) {
                        this.currentCellFreeze++;
                    }
                    this.columnClicked(tableType, this.currentRowFreeze, this.currentCellFreeze, event);
                    return false;
                case 40:
                    if (this.rowData.length - 1 > this.currentRowFreeze)
                        this.currentRowFreeze++;
                    this.clickedOnRow(tableType, this.rowData[this.currentRowFreeze], this.currentRowFreeze, event);
                    this.columnClicked(tableType, this.currentRowFreeze, this.currentCellFreeze, event);
                    return false;
                default:
                    return true;
            }
        }
    };
    AngularTableComponent.prototype.clickedOnRow = function (tableType, rows, selectedRowNo, event) {
        var _this = this;
        if (tableType == 'normal') {
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
        }
        else if (tableType == 'freeze') {
            this.currentRow = selectedRowNo;
            if (event.keyCode || event.type == "click")
                this.onSelectedRows.emit({
                    value: rows
                });
            this.rowData.forEach(function (obj, objIndex) {
                if (objIndex % 2 == 0)
                    document.getElementById(_this.tableId + "Freezerow" + objIndex) ? (document.getElementById(_this.tableId + "Freezerow" + objIndex).style.background = "inherit") : "";
                else
                    document.getElementById(_this.tableId + "Freezerow" + objIndex) ? (document.getElementById(_this.tableId + "Freezerow" + objIndex).style.background = "#cacaff") : "";
            });
            setTimeout(function () {
                document.getElementById(_this.tableId + "Freezerow" + selectedRowNo) ? document.getElementById(_this.tableId + "Freezerow" + selectedRowNo).style.background = "orange" : "";
            }, 100);
        }
    };
    AngularTableComponent.prototype.columnClicked = function (tableType, rowIndex, columnIndex, event) {
        var _this = this;
        if (tableType == 'normal') {
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
                }
                document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex).style.background = "lightblue" : "";
                var ele = document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex + "input");
                ele ? ele.focus() : "";
                this.lastElement = document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex + "input");
            }
            else {
                document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "row" + rowIndex + "column" + columnIndex).click() : '';
            }
        }
        else if (tableType == 'freeze') {
            var wid = document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex).style.width : '0px';
            if (event.keyCode)
                this.lastKeyClickedFreeze = event.keyCode;
            if (event.toElement && event.toElement.offsetLeft && event.toElement.offsetLeft != 'undefined' && event.toElement.offsetLeft != undefined && event.toElement.offsetLeft != null) {
                if (this.lastKeyClickedFreeze == '39') {
                    if (event.toElement.offsetLeft + (+wid.substr(0, wid.indexOf('p'))) > window.innerWidth)
                        document.getElementById(this.tableId).scrollLeft += 100;
                }
                else if (this.lastKeyClickedFreeze == '37') {
                    if (event.toElement.offsetLeft + (+wid.substr(0, wid.indexOf('p'))) < window.innerWidth)
                        document.getElementById(this.tableId).scrollLeft -= 100;
                }
                this.currentCellFreeze = columnIndex;
                for (var i = 0; i < this.rowData.length; i++) {
                    this.rowData.forEach(function (obj, id) {
                        _this.freezeColumns.forEach(function (colObj, index) {
                            document.getElementById(_this.tableId + "Freezerow" + i + "column" + index) ? document.getElementById(_this.tableId + "Freezerow" + i + "column" + index).style.background = "inherit" : "";
                            //  var ele = document.getElementById(this.tableId + "Freezerow" + i + "column" + index + "input");
                            //  ele && ele!=this.lastElement? ele.blur() : "";
                        });
                    });
                }
                if (this.lastElement) {
                }
                document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex).style.background = "lightblue" : "";
                var ele = document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex + "input");
                ele ? ele.focus() : "";
                this.lastElement = document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex + "input");
            }
            else {
                document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex) ? document.getElementById(this.tableId + "Freezerow" + rowIndex + "column" + columnIndex).click() : '';
            }
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
                if (_this.varForSort) {
                    return x[sortBy] == y[sortBy] ? 0 : x[sortBy] > y[sortBy] ? 1 : -1;
                }
                else if (!_this.varForSort) {
                    return (x[sortBy] > y[sortBy] ? -1 : x[sortBy] == y[sortBy]) ? 0 : 1;
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
__decorate([
    core_1.ViewChild(material_1.MatPaginator),
    __metadata("design:type", material_1.MatPaginator)
], AngularTableComponent.prototype, "paginator", void 0);
AngularTableComponent = __decorate([
    core_1.Component({
        selector: "angular-table",
        template: "<mat-chip-list *ngIf=\"splicedColumns.length > 0\">\n  <h4>Hidden Columns: </h4>\n  <mat-chip *ngFor=\"let col of splicedColumns\"\n            [removable]=\"true\" (remove)=\"reAddColumnInGrid(col)\">\n    {{col.data.columnName}}\n    <mat-icon matChipRemove>cancel</mat-icon>\n  </mat-chip>\n</mat-chip-list>\n<div id=\"popUp\"\n       style=\"z-index:1001;position: fixed;margin-top: 3rem;height: 160px;border-radius: 10px;\n    box-shadow: 5px 5px 5px grey;padding:2px;border: 2px solid black;display:none;background: whitesmoke;width:8rem;\">\n    <div \n         style=\"width:100%;background:lightgray;cursor:pointer;color: #606060;z-index: 1001;display: inline-block;\">\n      <div id=\"onetab\" style=\"text-align: center;border-radius:5px;float: left;width:33%;\">\n        <mat-icon class=\"md-12\" title=\"Move Column\" (click)=\"show = 'pin';setStyle('onetab')\">pin_drop\n        </mat-icon>\n      </div>\n      <!-- <div id=\"fourthtab\" style=\"text-align: center;border-radius:5px;float: left;width:33%;\">\n        <mat-icon class=\"md-12\" (click)=\"show = 'group';setStyle('fourthtab')\">\n          playlist_add_check\n        </mat-icon>\n      </div> -->\n      <div id=\"twotab\" style=\"text-align: center;border-radius:5px;float: left;width:33%;\">\n        <mat-icon class=\"md-12\"  title=\"Hide/Search\" (click)=\"show = 'filter';setStyle('twotab')\">search\n        </mat-icon>\n      </div>\n      <div id=\"thirdtab\" style=\"text-align: center;border-radius:5px;float: left;width:33%;\">\n        <mat-icon class=\"md-12\" title=\"Close\" (click)=\"show = 'other';setStyle('thirdtab')\">\n          close\n        </mat-icon>\n      </div>\n    </div>\n    <div *ngIf=\"show=='other'\" style=\"height: 88px;cursor:pointer;color: #606060;\n    z-index: 1001;\">\n\n    </div>\n    <div *ngIf=\"show=='pin'\" style=\"height: 88px;cursor:pointer;color: #606060;\n    z-index: 1001;\">\n      <button *ngFor=\"let pin of pinButtons\"\n              style=\"margin: 5px 0px 0px 5px;color: #606060;height: 25px;border-radius: 4px;width: 90%;line-height: 20px;font-size: 14px;font-weight: 600;font-family: inherit;\" id='p1'\n              (click)=\"setArray(pin.value)\">{{pin.name}}\n      </button>\n      <button  *ngIf=\"filterColumnModelId\" [(ngModel)]=\"filterOptionChoices[filterColumnModelId + '-buttonVal']\" id=\"buttonFreeze\"\n       name=\"button\"  ngDefaultControl  style=\"margin: 5px 0px 0px 5px;color: #606060;height: 25px;border-radius: 4px;width: 90%;line-height: 20px;font-size: 14px;font-weight: 600;font-family: inherit;\" \n        (click)=\"moveToFreeze()\">Freeze Left\n      </button>\n       <!--<button style=\"margin: 5px 0px -2px 5px;height: 25px;width: 90%;line-height: 20px;\" id='p2'-->\n      <!--(click)=\"setArray('p2',column,abc)\">Pin Right</button>-->\n      <!--<button style=\"margin: 5px 0px -2px 5px;height: 25px;width: 90%;line-height: 20px;\" id='p3'-->\n      <!--(click)=\"setArray('p3',column,abc)\">No Pin</button>-->\n\n    </div>\n    <!-- <div *ngIf=\"show=='group'\" style=\"height: 88px;cursor:pointer;color:#606060;\n    z-index: 1001;\">\n      <button (click)=\"groupByOption()\"\n              style=\"margin: 5px 0px -2px 5px;height: 25px;width: 90%;line-height: 20px;\">\n        Group\n      </button>\n     \n      <!--<button style=\"margin: 5px 0px -2px 5px;height: 25px;width: 90%;line-height: 20px;\" id='p2'-->\n      <!--(click)=\"setArray('p2',column,abc)\">Pin Right</button>-->\n      <!--<button style=\"margin: 5px 0px -2px 5px;height: 25px;width: 90%;line-height: 20px;\" id='p3'-->\n      <!--(click)=\"setArray('p3',column,abc)\">No Pin</button>-->\n\n    <!-- </div> --> \n    <div *ngIf=\"show=='filter'\" style=\"height: 88px;cursor:pointer;color: #606060;\n    z-index: 1001;\">\n  <button style=\"margin: 5px 0px 0px 5px;color: #606060;height: 25px;border-radius: 4px;width: 90%;line-height: 20px;font-size: 14px;font-weight: 600;font-family: inherit;\" \n  (click)=\"setArray('p4')\" >Hide Column\n </button> \n\n      <select *ngIf=\"filterColumnModelId\" [(ngModel)]=\"filterOptionChoices[filterColumnModelId + '-FilterOption']\"\n              style=\"width: 7.5rem;margin: 14px 12px 6px 6px;height: 24px;border: none;color: #606060;background-color: lightgray;\n        border-radius: 5px;\" (change)=\"mySelectedChoice($event.target.value)\">\n        <!--filterOptionChoices[filterColumnModelId + '-FilterOption']-->\n\n        <!--(change)=\"mySelectedChoice($event.target.value)\"-->\n        <!--[(ngModel)]=\"filterOptionChoices[filterColumnModelId + '-FilterOption']\"-->\n        <!--<option [ngValue]=\"''\" selected disabled>Select</option>-->\n        <option style=\"color: #606060;background-color: lightgray;\" *ngFor=\"let item of OptionList\" [value]=\"item.Value\">{{item.Name}}\n        </option>\n      </select>\n\n      <br>\n      <input id=\"filterInput\"\n             class=\"form-control input-lg my-column-filter\"\n             type=\"text\" [(ngModel)]=\"myFilterModel\"\n             style=\"width: 7rem;margin: 10px 2px 3px 0.4rem;font-family: -webkit-body;\"\n             (input)=\"testMethodForInput($event.target.value);filterOnInput()\">\n    </div>\n  </div>\n<fieldset [style.border-top]=\"tableName && tableName.length>0?'1px solid #d4d4d4':'none'\">\n  <legend *ngIf=\"tableName && tableName.length>0\">{{tableName}}</legend>\n  <div  tabindex=\"1\" id=\"{{tableId}}\" style=\"height: 98%;display:-webkit-box;\">\n  <!--Freeze Headers-->\n\n  <table (keydown)=\"ChangeCurrentCell('freeze',$event)\" style=\"margin-top: 2px; margin-left: 1px;\"  id=\"freezeheaderdiv\" >\n    <thead [style.overflow-x]=\"'hidden'\" [style.overflow-y]=\"scroll.y == true ? 'scroll' : 'hidden'\"\n     style=\"border-spacing: 0px; border-collapse: collapse; width: 99%; float: left;\">\n      <!-- <tr class=\"changeOnHover\" class=\"container\" [dragula]='\"second-bag\"' [dragulaModel]='columns'> -->\n      <tr class=\"changeOnHover\" class=\"container\">\n        <!-- <td style=\"width: 21px;min-width: 14px;max-width: 21px;padding-left: 5px;\">\n          <input *ngIf=\"columnType == 'checkbox'\" style=\"width: 14px; height: 14px;\" type=\"checkbox\" [(ngModel)]=\"headerChecked\"\n            (ngModelChange)=\"onHeaderSelection(headerChecked)\">\n          <label style=\"color:black; font-family: monospace; font-weight: bold;\" *ngIf=\"columnType == 'slno'\">\n            #\n          </label>\n        </td> -->\n\n\n        <ng-container *ngFor=\"let column of freezeColumns;let freezeColumnIndex=index\">\n          <td style=\"font-weight: 600;font-family: inherit;\" *ngIf=\"(column.obj['visible']==undefined || column.obj['visible']==null || column.obj['visible']==true)\" (click)=\"clickedForSort(column.obj,column.obj['modelId'])\"\n            [style.width]=\"column.obj.width\" [style.min-width]=\"column.obj.type && column.obj.type=='date'?'120px':column.obj.width\"\n            [style.max-width]=\"column.obj.width\">\n            <div style=\"width:100%;\">\n              <div  style=\"width:15%;float:left\">\n                <i *ngIf=\"column.obj['sort'] == true\" class=\"sortIcon material-icons\">unfold_more</i>\n              </div>\n              <div  [style.width]=\"column.obj['sort']==true?'60%':'75%'\" style=\"float:left\">\n                {{column.obj.columnName}}\n              </div>\n              <div style=\"top: 5px;right: 0;width:25%;float:left\">\n                <!--<mat-icon >menu-->\n                <!--</mat-icon>-->\n                <mat-icon class=\"md-12\" style=\"font-size: 16px; font-weight: 600;\" title=\"Unfreeze\" (click)=\"UnfreezeThis(column,freezeColumnIndex)\">\n                  close\n                </mat-icon>\n                <!-- <svg class=\"newMenu\"\n                     (click)=\"gridOptionFunction(column.obj,freezeColumnIndex,$event)\"\n                     [style.fill]=\"filterObjectHeader[column.obj.modelId] ?  'coral' : '#606060'\"\n                     style=\"float: right;z-index:999;height: 18px;cursor: pointer;\" version=\"1.1\"\n                     xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                  <title>filter</title>\n                  <path\n                    d=\"M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z\"></path>\n                </svg> -->\n              </div>\n            </div>\n             <!-- <span style=\"color:black; font-weight: bold;\">{{column['columnName']}}\n            </span>\n            <i *ngIf=\"column['sort'] == true\" class=\"sortIcon material-icons\">unfold_more</i> -->\n          </td>\n        </ng-container>\n      </tr>\n    </thead>\n\n    <tbody [ngClass]=\"{myscroll: scroll.y, myhidden: !scroll.y, myhozscroll: scroll.x, myhozhidden: !scroll.x }\"\n      style=\"overflow-y: auto; float: left; width: 99%;\">\n      <tr *ngFor=\"let rows of rowData | slice:[startingPoint]:[startingPoint + pagingDiff] ; let indexVar = index;\" id=\"{{tableId}}Freezerows{{indexVar}}\">\n\n        <!-- <td style=\"width: 21px;padding-left: 5px;max-width: 21px;\" (click)=\"clickedOnRow('freeze',rows,indexVar,$event)\">\n          <input *ngIf=\"columnType == 'checkbox'\" type=\"checkbox\" [(ngModel)]=\"rows['selected']\" (click)=\"onClicked()\"\n            style=\"width: 14px; height: 14px;\" (ngModelChange)=\"onRowSelected(rowData,indexVar)\">\n          <label *ngIf=\"columnType == 'slno'\">\n            {{indexVar+startingPoint + 1}}.\n          </label>\n        </td> -->\n        <ng-container *ngFor=\"let column of freezeColumns; let ind = index\">\n          <td *ngIf=\"(column.obj['visible']==undefined || column.obj['visible']==null || column.obj['visible']==true)\"\n            [style.min-width]=\"column.obj['type'] && column.obj['type']=='date'?'120px':column.obj['width']\"\n            [style.max-width]=\"column.obj['width']\" [style.text-align]=\"column.obj['type'] && column.obj['type'] == 'number' ? 'right': column.obj['type']=='string' || column.obj['type']==undefined || column.obj['type']==''?'left':'center'\"\n            [style.width]=\"column.obj['width']\" id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}\" (click)=\"columnClicked('freeze',indexVar,ind,$event);\">\n\n            <label id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] != true && column.obj['type'] != 'button'\"\n              [style.padding-left]=\"'5px'\" style=\"width: 90%;height: 100%;display: block;cursor: pointer;\" (click)=\"clickedOnRow('freeze',rows,indexVar,$event);\"\n              [style.padding-right]=\"column.obj['type'] && column.obj['type'] == 'number' ? '5px': ''\">\n              {{column.obj['subModelId'] ? (rows[column.obj['subModelId']] ? (rows[column.obj['subModelId']] &&\n              column.obj['jointModelId'] )?\n              rows[column.obj['subModelId']][column.obj['jointModelId']][column.obj['modelId']] :\n              rows[column.obj['subModelId']][column.obj['modelId']] : rows[column.obj['subModelId']]) : rows[column.obj['modelId']]}}\n            </label>\n\n            <input id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] == true && (column.obj['type'] == undefined || column.obj['type'] == null ||column.obj['type'] == '' ||column.obj['type'] == 'string'  )\"\n              [(ngModel)]=\"rows[column.obj.modelId]\" (ngModelChange)=\"onValueChange(column,column.obj.modelId, rows[column.obj.modelId], rows)\"\n              type=\"text\" style=\"text-align: left; width: 100%;\" class=\"customInput\" (click)=\"clickedOnRow('freeze',rows,indexVar,$event);\">\n\n            <input id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] == true && (column.obj['type'] == 'number')\"\n              [(ngModel)]=\"rows[column.obj.modelId]\" (ngModelChange)=\"onValueChange(column,column.obj.modelId, rows[column.obj.modelId], rows)\"\n              type=\"number\" class=\"customInput\" [number]=\"column.obj.decimal?column.obj.decimal:'0'\" style=\"padding-right: 10%; text-align: right;\"\n              (click)=\"clickedOnRow('freeze',rows,indexVar,$event);\">\n\n            <input id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] == true && (column.obj['type'] == 'checkbox')\"\n              [(ngModel)]=\"rows[column.obj.modelId]\" (ngModelChange)=\"onValueChange(column,column.obj.modelId, rows[column.obj.modelId], rows)\"\n              type=\"checkbox\" class=\"customInput\" style=\"padding-right: 10%; text-align: right; height: 15px;\">\n\n            <input id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] == true && (column.obj['type'] == 'date')\"\n              [(ngModel)]=\"rows[column.obj.modelId]\" (ngModelChange)=\"onValueChange(column,column.obj.modelId, rows[column.obj.modelId], rows)\"\n              onfocusin=\" this.type = 'date'\" onofocusout=\" this.type = 'text'\" onblur=\"(this.value ? this.type = 'date' : this.type = 'text')\"\n              placeholder=\"\" class=\"customInput\" style=\"text-align: center; width: 100%;\" min=\"{{column.obj['setMinDate'] && column.obj['setMinDate'] == true ? todayDate : ''}}\"\n              max=\"{{column.obj['setMaxDate'] && column.obj['setMaxDate'] == true ? todayDate : ''}}\" (click)=\"clickedOnRow('freeze',rows,indexVar,$event);\">\n\n            <input id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] == true && (column.obj['type'] == 'time')\"\n              [(ngModel)]=\"rows[column.obj.modelId]\" (ngModelChange)=\"onValueChange(column,column.obj.modelId, rows[column.obj.modelId], rows)\"\n              onfocusin=\" this.type = 'time'\" onofocusout=\" this.type = 'text'\" onblur=\"(this.value ? this.type = 'time' : this.type = 'text')\"\n              placeholder=\"\" class=\"customInput\" style=\"text-align: center; width: 5.8rem; padding-right: 0.4rem;\"\n              (click)=\"clickedOnRow('freeze',rows,indexVar,$event);\">\n\n            <select id=\"{{tableId}}Freezerow{{indexVar}}column{{ind}}input\" *ngIf=\"column.obj['editable'] == true && (column.obj['type'] == 'select')\"\n              class=\"customInput\" [(ngModel)]=\"rows[column.obj.modelId]\" (ngModelChange)=\"onSelectionChanged(column.obj.modelId, rows, column.obj.values)\">\n              <option value='' disabled>Select</option>\n              <option *ngFor=\"let val of column.obj['values']\" [value]=\"val[column.obj['modelId']]\">\n                {{val[column.obj['displayId']]}}\n              </option>\n            </select>\n\n            <span *ngIf=\"!column.obj['editable'] && (column.obj['type'] == 'button') && rows[column.obj['modelId']] && rows[column.obj['modelId']] != ''\"\n              class=\"customButton\" (click)=\"clickedOnRow('freeze',rows,indexVar,$event);\">\n              {{rows[column.obj['modelId']]}}</span>\n          </td>\n        </ng-container>\n      </tr>\n    </tbody>\n  </table>\n\n  <table (keydown)=\"ChangeCurrentCell('normal',$event)\" style=\"margin-top: 2px; margin-left: 1px; width: 100%;\">\n      <thead [style.overflow-x]=\"'hidden'\" [style.overflow-y]=\"scroll.y == true ? 'scroll' : 'hidden'\" style=\"border-spacing: 0px; border-collapse: collapse; width: 99%; float: left;\">\n        <!-- <tr class=\"changeOnHover\" class=\"container\" [dragula]='\"first-bag\"' [dragulaModel]='columns'> -->\n        <tr class=\"changeOnHover\" class=\"container\">\n          <!-- <td style=\"width: 21px;min-width: 14px;max-width: 21px;padding-left: 5px;\">\n            <input *ngIf=\"columnType == 'checkbox'\" style=\"width: 14px; height: 14px;\" type=\"checkbox\" [(ngModel)]=\"headerChecked\"\n              (ngModelChange)=\"onHeaderSelection(headerChecked)\">\n            <label style=\"color:black; font-family: monospace; font-weight: bold;\" *ngIf=\"columnType == 'slno'\">\n              #\n            </label>\n          </td> -->\n\n\n          <ng-container *ngFor=\"let column of headerRowsArray;let columnIndex=index\">\n            <td style=\"font-weight: 600;font-family: inherit;\" *ngIf=\"(column['visible']==undefined || column['visible']==null || column['visible']==true)\" (click)=\"clickedForSort(column,column['modelId'])\"\n              [style.width]=\"column.width\" [style.min-width]=\"column.type && column.type=='date'?'120px':column.width\"\n              [style.max-width]=\"column.width\">\n              <div style=\"width:100%;\">\n                <div  style=\"width:15%;float:left\">\n                  <i *ngIf=\"column['sort'] == true\" class=\"sortIcon material-icons\">unfold_more</i>\n                </div>\n                <div  [style.width]=\"column['sort']==true?'60%':'75%'\" style=\"float:left\">\n                  {{column.columnName}}\n                </div>\n                <div style=\"top: 5px;right: 0;width:25%;float:left\" >\n                  <!--<mat-icon >menu-->\n                  <!--</mat-icon>-->\n                  <svg class=\"newMenu\"\n                       (click)=\"gridOptionFunction(column,columnIndex,$event)\"\n                       [style.fill]=\"filterObjectHeader[column.modelId] ?  'coral' : '#606060'\"\n                       style=\"float: right;z-index:999;height: 18px;cursor: pointer;\" version=\"1.1\"\n                       xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n                    <title>filter</title>\n                    <path\n                      d=\"M16 0c-8.837 0-16 2.239-16 5v3l12 12v10c0 1.105 1.791 2 4 2s4-0.895 4-2v-10l12-12v-3c0-2.761-7.163-5-16-5zM2.95 4.338c0.748-0.427 1.799-0.832 3.040-1.171 2.748-0.752 6.303-1.167 10.011-1.167s7.262 0.414 10.011 1.167c1.241 0.34 2.292 0.745 3.040 1.171 0.494 0.281 0.76 0.519 0.884 0.662-0.124 0.142-0.391 0.38-0.884 0.662-0.748 0.427-1.8 0.832-3.040 1.171-2.748 0.752-6.303 1.167-10.011 1.167s-7.262-0.414-10.011-1.167c-1.24-0.34-2.292-0.745-3.040-1.171-0.494-0.282-0.76-0.519-0.884-0.662 0.124-0.142 0.391-0.38 0.884-0.662z\"></path>\n                  </svg>\n                </div>\n              </div>\n               <!-- <span style=\"color:black; font-weight: bold;\">{{column['columnName']}}\n              </span>\n              <i *ngIf=\"column['sort'] == true\" class=\"sortIcon material-icons\">unfold_more</i> -->\n            </td>\n          </ng-container>\n        </tr>\n      </thead>\n\n      <tbody [ngClass]=\"{myscroll: scroll.y, myhidden: !scroll.y, myhozscroll: scroll.x, myhozhidden: !scroll.x }\"\n        style=\"overflow-y: auto; float: left; width: 99%;\">\n        <tr *ngFor=\"let rows of rowData | slice:[startingPoint]:[startingPoint + pagingDiff] ; let indexVar = index;\" id=\"{{tableId}}rows{{indexVar}}\">\n\n          <!-- <td style=\"width: 21px;padding-left: 5px;max-width: 21px;\" (click)=\"clickedOnRow('normal',rows,indexVar,$event)\">\n            <input *ngIf=\"columnType == 'checkbox'\" type=\"checkbox\" [(ngModel)]=\"rows['selected']\" (click)=\"onClicked()\"\n              style=\"width: 14px; height: 14px;\" (ngModelChange)=\"onRowSelected(rowData,indexVar)\">\n            <label *ngIf=\"columnType == 'slno'\">\n              {{indexVar+startingPoint + 1}}.\n            </label>\n          </td> -->\n          <ng-container *ngFor=\"let column of headerRowsArray; let ind = index\">\n            <td *ngIf=\"(column['visible']==undefined || column['visible']==null || column['visible']==true)\"\n              [style.min-width]=\"headerRowsArray[ind]['type'] && headerRowsArray[ind]['type']=='date'?'120px':headerRowsArray[ind]['width']\"\n              [style.max-width]=\"headerRowsArray[ind]['width']\" [style.text-align]=\"column['type'] && column['type'] == 'number' ? 'right': column['type']=='string' || column['type']==undefined || column['type']==''?'left':'center'\"\n              [style.width]=\"headerRowsArray[ind]['width']\" id=\"{{tableId}}row{{indexVar}}column{{ind}}\" (click)=\"columnClicked('normal',indexVar,ind,$event);\">\n\n              <label id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] != true && column['type'] != 'button'\"\n                [style.padding-left]=\"'5px'\" style=\"width: 90%;height: 100%;display: block;cursor: pointer;\" (click)=\"clickedOnRow('normal',rows,indexVar,$event);\"\n                [style.padding-right]=\"column['type'] && column['type'] == 'number' ? '5px': ''\">\n                {{column['subModelId'] ? (rows[column['subModelId']] ? (rows[column['subModelId']] &&\n                column['jointModelId'] )?\n                rows[column['subModelId']][column['jointModelId']][column['modelId']] :\n                rows[column['subModelId']][column['modelId']] : rows[column['subModelId']]) : rows[column['modelId']]}}\n              </label>\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == undefined || column['type'] == null ||column['type'] == '' ||column['type'] == 'string'  )\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\"\n                type=\"text\" style=\"text-align: left; width: 100%;\" class=\"customInput\" (click)=\"clickedOnRow('normal',rows,indexVar,$event);\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'number')\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\"\n                type=\"number\" class=\"customInput\" [number]=\"column.decimal?column.decimal:'0'\" style=\"padding-right: 10%; text-align: right;\"\n                (click)=\"clickedOnRow('normal',rows,indexVar,$event);\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'checkbox')\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\"\n                type=\"checkbox\" class=\"customInput\" style=\"padding-right: 10%; text-align: right; height: 15px;\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'date')\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\"\n                onfocusin=\" this.type = 'date'\" onofocusout=\" this.type = 'text'\" onblur=\"(this.value ? this.type = 'date' : this.type = 'text')\"\n                placeholder=\"\" class=\"customInput\" style=\"text-align: center; width: 100%;\" min=\"{{column['setMinDate'] && column['setMinDate'] == true ? todayDate : ''}}\"\n                max=\"{{column['setMaxDate'] && column['setMaxDate'] == true ? todayDate : ''}}\" (click)=\"clickedOnRow('normal',rows,indexVar,$event);\">\n\n              <input id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'time')\"\n                [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onValueChange(column,column.modelId, rows[column.modelId], rows)\"\n                onfocusin=\" this.type = 'time'\" onofocusout=\" this.type = 'text'\" onblur=\"(this.value ? this.type = 'time' : this.type = 'text')\"\n                placeholder=\"\" class=\"customInput\" style=\"text-align: center; width: 5.8rem; padding-right: 0.4rem;\"\n                (click)=\"clickedOnRow('normal',rows,indexVar,$event);\">\n\n              <select id=\"{{tableId}}row{{indexVar}}column{{ind}}input\" *ngIf=\"column['editable'] == true && (column['type'] == 'select')\"\n                class=\"customInput\" [(ngModel)]=\"rows[column.modelId]\" (ngModelChange)=\"onSelectionChanged(column.modelId, rows, column.values)\">\n                <option value='' disabled>Select</option>\n                <option *ngFor=\"let val of column['values']\" [value]=\"val[column['modelId']]\">\n                  {{val[column['displayId']]}}\n                </option>\n              </select>\n\n              <span *ngIf=\"!column['editable'] && (column['type'] == 'button') && rows[column['modelId']] && rows[column['modelId']] != ''\"\n                class=\"customButton\" (click)=\"clickedOnRow('normal',rows,indexVar,$event);\">\n                {{rows[column['modelId']]}}</span>\n            </td>\n          </ng-container>\n        </tr>\n      </tbody>\n      <mat-paginator #paginator [hidePageSize]=\"rowData.length <= paginator.pageSize\" *ngIf=\"rowData.length > 0\" [length]=\"rowData.length\" pagingdiff=\"pageSize\" [pageSize]=\"5\"\n        (page)=\"onPaginatorChange()\" [pageSizeOptions]=\"[5, 10, 25, 100]\" [showFirstLastButtons]=\"true\">\n      </mat-paginator>\n    </table>\n  </div>\n</fieldset>",
        styles: ["table {\n    max-width: 100%;\n  \n    display: grid;\n    border-spacing: 0px;\n    overflow: auto;\n    border-collapse: collapse;\n   }\n  \n  span {\n    font-family: monospace;\n  }\n  \n  th,\n  td {\n    border: 1px solid #d4d4d4;\n    text-align: center;\n  }\n  \n  thead,\n  tfoot {\n    background: #f9f9f9;\n  }\n  \n  thead{\n    display: inline-table;\n  }\n  \n  tbody {\n     display: inline-table;\n  }\n  \n  input {\n    font-size: 13px !important;\n    border-radius: 4px;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    padding-left: 3px;\n    font-family: monospace;\n  }\n  \n  select {\n    font-size: 13px !important;\n    font-family: monospace;\n  }\n  \n  label {\n    font-size: 13px !important;\n    color: rgba(0,0,0,.6);\n  }\n  thead tr{\n    height: 35px;\n   \n  } thead tr td{\n    cursor:pointer;\n    text-align: center;\n    width:21px;\n    opacity: 0.9;\n    background: #f3f3f3;\n  }\n  tbody tr {\n    table-layout: fixed;\n    text-align: left;\n    height: 24px;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    min-width: 20px;\n    font-family:  monospace;\n  }\n  \n  .customInput {\n    width: 90%;\n    border: none;\n    padding: 0;\n    float: left;\n    background: inherit;\n  }\n  \n  .customInput:focus {\n    background: white;\n  }\n  \n  input[type=date] {\n    min-width: 110px;\n  }\n  \n  input[type=number]::-webkit-inner-spin-button,\n  input[type=number]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  \n  input[type=date]::-webkit-inner-spin-button,\n  input[type=date]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  \n  input[type=time]::-webkit-inner-spin-button,\n  input[type=time]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  \n  thead tr td:first-child{\n    // border-radius: 10px 0px 0px 0px\n  }\n  \n  thead tr:first-child{\n    // border-radius: 6px 6px 0px 0px;\n  }\n  \n  thead {\n    // border-radius: 10px 10px 0px 0px;\n  }\n  \n  thead  tr td:last-child{\n    border-radius: 0px 10px 0px 0px;\n  }\n  \n  .customButton {\n    color: white;\n    display: inline-block;\n    padding:0.2rem 10px;\n    font-weight: 700;\n    line-height: 1;\n    text-align: center;\n    white-space: nowrap;\n    cursor: pointer;\n    vertical-align: baseline;\n    border-radius: 1rem;\n    background-color: #ffc107;\n    border-radius: 5px;\n    position: relative;\n    top: 0px;\n    transition: all ease 0.3s;\n  }\n  \n  .customButton:active {\n    top: 2px;\n  }\n  \n    tr:nth-child(even) {\n      background-color: #cacaff;\n    }\n    /* tbody tr:hover {\n      background: rgb(227, 247, 254) !important;\n    }\n    tbody tr td:hover {\n      background: lightblue !important;\n    } */\n    tbody tr td{\n      cursor:pointer;\n      text-align: center;\n      border:1px solid #d4d4d4; \n      height: 15px; \n    }\n   \n    .sortIcon{\n      font-size: 16px;\n      float: right;\n      color: black;\n      font-weight: 600;\n    }\n  \n  \n  /* giving calender icon instead of dropdown in date field */\n  \n  /* input[type=\"date\"] {\n    position: relative;\n  } */\n  \n  /* input[type=\"date\"]::-webkit-calendar-picker-indicator {\n    color: transparent;\n    background: none;\n    z-index: 1;\n  } */\n  /* input[type=\"date\"]:before:focus{\n    display: block;\n  } */\n  /* input[type=\"date\"]:before {\n    \n   color: transparent;\n    background: none;\n    display: none;\n    font-family: 'FontAwesome';\n    content: '\f073';\n    width: 15px;\n    height: 20px;\n    position: absolute;\n    top: 3px;\n    right: 2px;\n    color: #999;\n  } */\n  fieldset{\n    font-size: 12px;\n  \n    font-family: monospace;\n      margin: 0px;\n      padding: 0;\n      display: contents;\n      height: 99%;\n      display: -webkit-box;\n      min-width: 0px;\n      border-bottom: none;\n      border-left: none;\n      border-right: none;\n    }"
        ]
    })
], AngularTableComponent);
exports.AngularTableComponent = AngularTableComponent;
