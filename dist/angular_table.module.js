"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var number_directive_1 = require("./number.directive");
var angular_table_component_1 = require("./angular_table.component");
var core_1 = require("@angular/core");
var icon_1 = require("@angular/material/icon");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AngularTableModule = (function () {
    function AngularTableModule() {
    }
    return AngularTableModule;
}());
AngularTableModule = __decorate([
    core_1.NgModule({
        declarations: [
            angular_table_component_1.AngularTableComponent, number_directive_1.Number
        ],
        imports: [
            common_1.CommonModule, icon_1.MatIconModule, forms_1.FormsModule, forms_1.ReactiveFormsModule
        ],
        exports: [angular_table_component_1.AngularTableComponent]
    })
], AngularTableModule);
exports.default = AngularTableModule;
