import { NgZone, Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { BasePage } from '../../base/base.page';

export interface Item {
  id: string;
  name: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends BasePage implements OnInit {

  @Input() items: Item[] = [];
  @Input() selectedItems: string[] = [];
  @Input() title = 'Select Items';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredItems: Item[] = [];
  workingSelectedValues: string[] = [];

  ngOnInit() {
    this.items = this.options.items
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  trackItems(index: number, item: Item) {
    return item.name;
  }

  async cancelChanges() {
    this.selectionCancel.emit();
    await this.pop()
  }

  async confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
    await this.dismiss(this.items.filter(i=>this.workingSelectedValues.indexOf(i.id)>-1))
  }

  searchbarInput(ev) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => {
        return item.name.toLowerCase().includes(normalizedQuery);
      });
    }
  }

  isChecked(value: string) {
    return this.workingSelectedValues.find((item) => item === value);
  }

  checkboxChange(ev) {
    const { checked, value } = ev.detail;

    if (checked) {
      this.workingSelectedValues = [...this.workingSelectedValues, value];
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter((item) => item !== value);
    }
  }

  
}