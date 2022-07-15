import noUiSlider from 'nouislider';

export class App {
  cartElement: HTMLElement;
  cartCount: number;

  static saveSession: boolean = true;

  constructor() {
    this.cartCount = 0;
    this.cartElement = document.querySelector('.cart-count') as HTMLElement;
  }

  addListenerForSearch(): void {
    let search = document.getElementById('search');
    search?.addEventListener('keyup', this.handleSearch);
  }

  addListenerForPopular(): void {
    let popularCheckBox = document.getElementById('is-popular');
    popularCheckBox?.addEventListener('change', this.handlePopularCheckbox);
  }

  addListenerForResetFilters(): void {
    let reset = document.getElementById("reset-filters")
    reset?.addEventListener('click', this.resetFiltersHandler);
  }

  addListenerForSorting(): void {
    let soringContainer = document.querySelector('.sorting');
    soringContainer?.addEventListener('click', this.handleSorting);
  }

  addListenerToBuyButton(): void {
    let brashesContainer = document.querySelector('#items-container');
    brashesContainer?.addEventListener('click', this.handleClickAddToCart.bind(this));
  }

  handleFiltering(event: Event): void {
    let startYear = parseInt(document.getElementById('year-formatting-start')?.innerText as string);
    let endYear = parseInt(document.getElementById('year-formatting-end')?.innerText as string);
    let startCount = parseInt(document.getElementById('count-formatting-start')?.innerText as string);
    let endCount = parseInt(document.getElementById('count-formatting-end')?.innerText as string);

    let target = event.target as HTMLElement;

    if (typeof (startCount) === 'number' &&
      typeof (endCount) === 'number' &&
      typeof (startYear) === 'number' &&
      typeof (endYear) === 'number') {
      let brashes = document.querySelectorAll('.brash');
      const arrayBrashes = Array.from(brashes);

      if (target.id.includes('count')) {
        let showArr = arrayBrashes.filter(it => {
          let count = parseInt(it.querySelector('ul')?.childNodes[0].textContent?.split(' ')[1] as string);
          return startCount <= count && count <= endCount;
        })

        let hideArr = arrayBrashes.filter(it => !showArr.includes(it));
        hideArr.forEach(brash => {
          if (!brash.classList.contains('hide-count')) {
            brash.classList.add('hide-count');
          }
        })

        showArr.forEach(brash => {
          if (brash.classList.contains('hide-count')) {
            brash.classList.remove('hide-count');
          }
        })
      }

      if (target.id.includes('year')) {
        let showArr = arrayBrashes.filter(it => {
          let year = parseInt(it.querySelector('ul')?.childNodes[1].textContent?.split(' ')[1] as string);
          return startYear <= year && year <= endYear;
        })

        let hideArr = arrayBrashes.filter(it => !showArr.includes(it));
        hideArr.forEach(brash => {
          if (!brash.classList.contains('hide-year')) {
            brash.classList.add('hide-year');
          }
        })

        showArr.forEach(brash => {
          if (brash.classList.contains('hide-year')) {
            brash.classList.remove('hide-year');
          }
        })
      }
    }
    App.showNoItemsMessage();
  }

  private handleSearch(event: Event) {
    let target = event.target as HTMLInputElement;
    let searchValue = target.value;

    let brashes = document.querySelectorAll('.brash');
    let arrayBrashes = Array.from(brashes);
    if (arrayBrashes.filter(it => it.classList.length === 1)) {
      let showArr = arrayBrashes.filter(it => {
        var includes = it.innerHTML.toUpperCase().includes(searchValue.toUpperCase());
        return includes;
      })

      let hideArr = arrayBrashes.filter(it => !showArr.includes(it));
      hideArr.forEach(brash => {
        if (!brash.classList.contains('search-hide')) {
          brash.classList.add('search-hide');
        }
      })

      showArr.forEach(brash => {
        if (brash.classList.contains('search-hide')) {
          brash.classList.remove('search-hide');
        }
      })
    } else {
      let filteredBrashes = arrayBrashes.filter(it => it.classList.length > 1);

      let showArr = filteredBrashes.filter(it => {
        var includes = it.innerHTML.includes(searchValue);
        return includes;
      })

      let hideArr = filteredBrashes.filter(it => !showArr.includes(it));
      hideArr.forEach(brash => {
        if (!brash.classList.contains('search-hide')) {
          brash.classList.add('search-hide');
        }
      })

      showArr.forEach(brash => {
        if (brash.classList.contains('search-hide')) {
          brash.classList.remove('search-hide');
        }
      })
    }
    App.showNoItemsMessage();
  }

  private resetFiltersHandler(): void {
    let selectsContainer = document.getElementById("select-filters-container");
    let array = [...selectsContainer!.querySelectorAll("*")];
    array.forEach(it => {
      if (it.tagName.toUpperCase() == 'input'.toUpperCase()) {
        (it as HTMLInputElement).checked = false;
      }
    })

    let brashes = document.querySelectorAll('.brash');
    let arrayBrashes = Array.from(brashes);
    arrayBrashes.forEach(brash => {
      brash.className = "brash";
    });

    let yearSlider = document.querySelector('.count-filter') as any;
    yearSlider.noUiSlider.reset()
    let countSlider = document.querySelector('.year-filter') as any;
    countSlider.noUiSlider.reset()

    let checkbox = document.getElementById('is-popular') as HTMLInputElement;
    checkbox.checked = false;
  }

  static showNoItemsMessage(): void {
    let brashes = document.querySelectorAll('.brash');
    let arrayBrashes = Array.from(brashes);
    let showed = arrayBrashes.filter(it => it.classList.length === 1);
    let message = document.getElementById('no-items-msg');
    if (showed.length === 0) {
      message!.className = "no-items-msg-showed";
    } else {
      message!.className = "no-items-msg-hide";
    }
  }

  private handlePopularCheckbox(event: Event): void {
    let target = event.target as HTMLInputElement;

    let brashes = document.querySelectorAll('.brash');
    let arrayBrashes = Array.from(brashes);

    if (!target.checked) {
      arrayBrashes.forEach(brash => {
        if (brash.classList.contains('hide-unpopular')) {
          brash.classList.remove('hide-unpopular');
        }
      })
      App.showNoItemsMessage();
      return;
    }

    let showArr = arrayBrashes.filter(it => {
      let checked = it.querySelector('ul')?.childNodes[5].textContent?.split(' ')[2] === 'Yes';
      return checked === target.checked;
    })

    let hideArr = arrayBrashes.filter(it => !showArr.includes(it));
    hideArr.forEach(brash => {
      if (!brash.classList.contains('hide-unpopular')) {
        brash.classList.add('hide-unpopular');
      }
    })

    showArr.forEach(brash => {
      if (brash.classList.contains('hide-unpopular')) {
        brash.classList.remove('hide-unpopular');
      }
    })
    App.showNoItemsMessage();
  }

  private handleSorting(event: Event): void {
    let target = event.target as HTMLElement;
    if (target.classList.contains('arrow')) {
      let sortBy = target.parentElement?.classList[1];
      let order = target.classList[1];

      let brashes = document.querySelectorAll('.brash');
      let arrayBrashes = Array.from(brashes);

      if (sortBy === 'year') {
        if (order === 'up') {
          arrayBrashes = arrayBrashes.sort((a, b) => {
            let left = parseInt(a.querySelector('ul')?.childNodes[1].textContent?.split(' ')[1] as string);
            let right = parseInt(b.querySelector('ul')?.childNodes[1].textContent?.split(' ')[1] as string);
            return left - right;
          })
        } else {
          arrayBrashes = arrayBrashes.sort((a, b) => {
            let left = parseInt(a.querySelector('ul')?.childNodes[1].textContent?.split(' ')[1] as string);
            let right = parseInt(b.querySelector('ul')?.childNodes[1].textContent?.split(' ')[1] as string);
            return right - left;
          })
        }
      }

      if (sortBy === 'name') {
        if (order === 'up') {
          arrayBrashes = arrayBrashes.sort((a, b) => {
            let left = a.childNodes[0].textContent as string;
            let right = b.childNodes[0].textContent as string;
            return right.localeCompare(left);
          })
        } else {
          arrayBrashes = arrayBrashes.sort((a, b) => {
            let left = a.childNodes[0].textContent as string;
            let right = b.childNodes[0].textContent as string;
            return left.localeCompare(right);
          })
        }
      }

      let container = document.querySelector('#items-container');
      arrayBrashes.forEach(brash => {
        container?.appendChild(brash);
      });
    }
  }

  private handleClickAddToCart(event: Event): void {
    let target = event.target as HTMLButtonElement;
    let parent = target.parentElement as HTMLDivElement;

    if (target.classList.contains('add-to-cart')) {
      let totalAvailable = 0;
      let addedCount = 0;
      if (parent) {
        let addedEl = parent.querySelector('.add-count') as HTMLInputElement;
        addedCount = +addedEl.value;
        totalAvailable = parseInt(parent.querySelector('ul')?.firstChild?.textContent?.split(' ')[1] as unknown as string);
        if (addedCount > totalAvailable) {
          alert('You can not buy more than available in stock');
          return
        }
      }

      if (this.cartElement) {
        target.classList.toggle('added');
        parent.querySelector('.add-count')?.classList.toggle('selected-count');

        var added = document.querySelectorAll('.selected-count');
        var selected = Array.from(added)
          .map(it => +(it as HTMLInputElement).value)
          .reduce((a, b) => a + b, 0);

        if (selected > 20) {
          alert('Sorry, all slots are filled!');
          target.classList.toggle('added');
          parent.querySelector('.add-count')?.classList.toggle('selected-count');
          return;
        }
        this.cartElement.textContent = selected.toString();
      }
    }
  }
}