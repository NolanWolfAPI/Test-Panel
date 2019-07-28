import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component ({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pageNumber = 1;

  @Input() pageSize = 100;

  @Input() totalCount = 100;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  get display(): boolean {
    return this.totalCount > this.pageSize;
  }

  get buttonRange(): number[] {
    if (!this.display) return [];
    let numbers = []; // this.pageNumber === 1 ? [] : [1,2, -1];
    if ((this.pageNumber - 2) > 3) {
      numbers.push(1,2,-1);
    } else if ((this.pageNumber - 2) > 2) {
      numbers.push(1, 2);
    } else if ((this.pageNumber - 2) > 1) {
      numbers.push(1);
    }
    for (let i = 0; i < 5; i++) {
      const value = (this.pageNumber - 2) + i;
      if (value < 1 || value > this.lastPageNumber) continue;
      numbers.push(value);
    }

    if (this.pageNumber < this.lastPageNumber - 4) {
      numbers.push(-1, this.lastPageNumber - 1, this.lastPageNumber);
    } else if (this.pageNumber < this.lastPageNumber - 3) {
      numbers.push(this.lastPageNumber - 1, this.lastPageNumber);
    } else if (this.pageNumber < this.lastPageNumber - 2) {
      numbers.push(this.lastPageNumber);
    }
    return numbers;
    //return Array.from(Array(this.lastPageNumber), (x, i) => i + 1);
  }

  get previousNumber(): number {
    return this.pageNumber < 1 ? 1 : this.pageNumber - 1;
  }

  get nextNumber(): number {

    return this.pageNumber < this.lastPageNumber ? this.pageNumber + 1 : this.lastPageNumber;
  }

  get lastPageNumber(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.pageChanged.emit(pageNumber);
  }
}
