import { NgModel } from "@angular/forms";
export declare class Number {
    private model;
    decimalPlace: number;
    constructor(model: NgModel);
    onInputChange(event: any): void;
}
