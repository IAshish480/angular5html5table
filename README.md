#readme

### angular5html5table

Angular light weight Table.
_* Check the [HowTo](#HowTo) section below._

## Features

- Supports basic angular and html.
- Supports multiple platforms
- The value automatically updates intable as changes in your code.
- Emits an event after every required click and change to your parent component code.
- Nice devs behind it. 🤓

<!-- For hints -->
_* Check the [Hints](#Hints) section below._


## HowTo

<!-- import in the module -->
I _promise_ that it's **very** easy to use:

install using npm i angular5html5table

_* Check the [Usage](#Usage) section below._


## Usage



Call it from the html of the file in which you want to show the table , like

<angular-table 
    [rowData]="rowData"  <!-- jsaon array containing data with a modelId key which is as same in headerRowsArray's object modelId field-->
    [headerRowsArray]="headerRowsArray"  <!-- important if use multiple tables in the same component -->
    [leftColumnType]="leftColumnType"  <!-- slno shows serial no. or checkbox shows check box for row selection-->
    [tableNameFromParent]="'Table_Name'"  <!-- important if use multiple tables in the same component -->
    [defaultSelectedRow]="'selectRowNoByDefault'"  <!-- selects a row by default in the table -->
    [idOfTable]="'tableId'"  <!-- important if use multiple tables in the same component -->
    (onSelectedRows)="onRowSelection($event.value)"  <!-- emits an event when a particular row is selected-->
    (onColumnClicked)="onColumnClicked($event.value)"  <!-- emits an event when a particular column is clicked-->
    (onRowValueChange)="onValueChanged($event.value)"  <!-- emits an event when a particular row's value is changed -->
    >

    For further help
_* Check the [Help](#Help) section below._

## Hints
* Each headerRowsArray's Object must have a columnName field which is displayed on header.
* Each headerRowsArray's Object must have a modelId field which will be helping in binding with tbody element.
* Each headerRowsArray's Object must have a width field which will set the default width of the table header column.
* By default every field is of label type.
* To enable sorting feature use sort:true in headerRowsArray's Object.
* Can have a date field using type:"date" and editable:"true" in headerRowsArray's Object.
* Can have a time field using type:"time" and editable:"true"  in headerRowsArray's Object.
* Can have a number field using type:"number" and editable:"true"  in headerRowsArray's Object.
* Can have a select type field using type:"select" and editable:"true" and values:"JSON Array with a displayProperty which is to be displayed in select options" and displayId:"displayProperty"  in headerRowsArray's Object.
* Can have a checkbox field using type:"checkbox" and editable:"true"  in headerRowsArray's Object.
* To set minimum date of Today use setMinDate:true in headerRowsArray's Object.
* To set maximum date of Today use setMaxDate:true in headerRowsArray's Object.


## Demo

> Previews needs to be opened in new standalone windows.

- [StackBlitz](https://angular5html5table.stackblitz.io/)


## Repositories
(Github) https://github.com/IAshish480/angular5html5table.git


## Help

If you need help you can contact to iashish480@gmail.com with a subject "HELP REGARDING TABLE" in the mail.

