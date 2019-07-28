import {Component, Input, OnChanges, OnInit} from '@angular/core';

import {LoadingState} from '../../models/shared/loading-state';

@Component ({
  selector: 'data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];

  @Input() setup: Column[] = [];

  @Input() loading: LoadingState = new LoadingState;

  @Input() rowUrlRender: Function = (row) => `/${row.id}/edit`;

  constructor() {}

  selectData(row, setup) {
    switch(typeof setup.selector) {
      case 'string':
        return row[setup.selector];
      case 'function':
        return setup.selector(row);
      default:
        return setup.selector;
    }
  }

  selectDataType(row, setup) {
    return typeof this.selectData(row, setup);
  }

  selectDataStringName(setup) {
    switch(typeof setup.selector) {
      case 'string':
        return setup.selector;
       case 'function':
         return setup.selector.name;
      default:
        return setup.selector;
    }
  }

  ngOnInit() {
    this.loading.setSuccessful();
  }

  ngOnChanges() {
    this.loading.setSuccessful();
  }
}

export interface Column {
  title:string;
  selector:string|Function;
  cellRender?:Function;
}
