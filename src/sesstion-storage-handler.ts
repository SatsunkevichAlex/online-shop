import { FilteringOptions } from "./models/filtering-options";

export class SessionStorageHandler {
  static saveSession: boolean = true;

  addListenerForResetSessionStorage(): void {
    document.getElementById("reset-storage")!
      .addEventListener('click', () => {
        sessionStorage.clear();
        SessionStorageHandler.saveSession = false;

        location.reload();
      })
  }

  setSessionStorage(): void {
    this.setBrashes();
    this.setFilteringOpions();
  }

  restoreFilters(filterOptions: FilteringOptions): void {
    let cartCount = document.querySelector('.cart-count');
    cartCount!.textContent = filterOptions.cartCount;

    let yearSlider = document.querySelector('.year-filter') as any;
    let yArr = filterOptions.yearSlider.map((v: string | number) => +v);
    yearSlider.noUiSlider.set(yArr);

    let countFilter = document.querySelector('.count-filter') as any;
    let cArr = filterOptions.countSlider.map((v: string | number) => +v);
    countFilter.noUiSlider.set(cArr);

    this.restoreFilterStatus('colors-select', filterOptions.colorFilter);
    this.restoreFilterStatus('producers-select', filterOptions.producerFilter);
    this.restoreFilterStatus('sizes-select', filterOptions.sizeFilter);

    let isPopular = (document.getElementById('is-popular') as HTMLInputElement);
    isPopular.checked = filterOptions.isPopular;
  }

  private setBrashes(): void {
    let brashes = document.querySelector('#items-container')?.innerHTML as string;
    sessionStorage.setItem('brashes', brashes);
  }

  private setFilteringOpions(): void {
    let cartCount = document.querySelector('.cart-count')?.textContent;
    let yearFilterStart = document.querySelector('.year-filter')?.querySelector('.noUi-handle-lower')?.getAttribute('aria-valuetext');
    let yearFilterEnd = document.querySelector('.year-filter')?.querySelector('.noUi-handle-upper')?.getAttribute('aria-valuetext');
    let countFilterStart = document.querySelector('.count-filter')?.querySelector('.noUi-handle-lower')?.getAttribute('aria-valuetext');
    let countFilterEnd = document.querySelector('.count-filter')?.querySelector('.noUi-handle-upper')?.getAttribute('aria-valuetext');
    let isPopular = (document.getElementById('is-popular') as HTMLInputElement).checked;
    let colorFilter = this.getSelectsStatus('colors-select');
    let brandFilter = this.getSelectsStatus('producers-select');
    let sizeFilter = this.getSelectsStatus('sizes-select');

    let filterOptions = new FilteringOptions();
    filterOptions.cartCount = cartCount as string;
    filterOptions.yearSlider = [yearFilterStart as string, yearFilterEnd as string];
    filterOptions.countSlider = [countFilterStart as string, countFilterEnd as string];
    filterOptions.isPopular = isPopular;
    filterOptions.colorFilter = colorFilter;
    filterOptions.producerFilter = brandFilter;
    filterOptions.sizeFilter = sizeFilter;

    sessionStorage.setItem('filter-settings', JSON.stringify(filterOptions));
  }

  private getSelectsStatus(id: string): { id: string; checked: boolean; }[] {
    let container = document.getElementById(id)!;
    let children = container.children;
    let inputs = Array.from(children).filter(it => it.id);
    let asInputs = inputs.map(it => it as HTMLInputElement);
    let statuses = asInputs.map(it => ({ id: it.id, checked: it.checked }));
    return statuses;
  }

  private restoreFilterStatus(id: string, options: { id: string; checked: boolean; }[]): void {
    let container = document.getElementById(id)!;
    let children = container.children;
    let inputs = Array.from(children)
      .filter(it => it.id)
      .map(it => it as HTMLInputElement);
    inputs.forEach(input => {
      let option = options.filter(it => it.id === input.id)[0];
      input.checked = option.checked;
    });
  }
}