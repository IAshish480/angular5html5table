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
/**
 * Created by Kuldeep.Poonia on 21/08/2016.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Number = (function () {
    function Number(model) {
        this.model = model;
    }
    Number.prototype.onInputChange = function (event) {
        var _this = this;
        var replacedValue = '';
        event = event + '';
        if (this.decimalPlace == undefined || this.decimalPlace == 0)
            replacedValue = event.replace(/[^0-9]/g, '');
        else {
            replacedValue = event.replace(/[^0-9.]/g, '');
            var newValue = replacedValue.split('.')[1];
            if (newValue != undefined) {
                newValue = newValue.substring(0, this.decimalPlace);
                var finalValue = replacedValue.split('.')[0] + '.' + newValue;
                replacedValue = parseFloat(finalValue);
            }
        }
        if (replacedValue == event)
            return;
        //must use time out otherwise not work
        setTimeout(function () {
            _this.model.viewToModelUpdate(replacedValue);
            _this.model.valueAccessor.writeValue(replacedValue);
        }, 1);
    };
    return Number;
}());
__decorate([
    core_1.Input('number'),
    __metadata("design:type", Number)
], Number.prototype, "decimalPlace", void 0);
Number = __decorate([
    core_1.Directive({
        selector: '[number]',
        host: {
            '(ngModelChange)': 'onInputChange($event)'
        }
    }),
    __metadata("design:paramtypes", [forms_1.NgModel])
], Number);
exports.Number = Number;
