import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort: string = "desc";
  itemsShowCount: number = 12;


  onSortUpdated(newSort: string) : void {
    this.sort = newSort;
    this.sortChange.emit(this.sort)
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
