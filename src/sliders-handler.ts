import { App } from "./app";
import noUiSlider, { target } from 'nouislider';

export class SlidersHandler {
  filtersContainer = document.querySelector('.sliders');
  popularCheckBox = document.getElementById('is-popular');

  yearSlider = document.querySelector('.year-filter') as target;
  countSlider = document.querySelector('.count-filter') as target;

  minYearElement = document.getElementById('year-formatting-start');
  maxYearElement = document.getElementById('year-formatting-end');
  minCountElement = document.getElementById('count-formatting-start');
  maxCountElement = document.getElementById('count-formatting-end');

  arrayBrashes!: HTMLElement[];

  addListenerForSliders(): void {
    this.filtersContainer?.addEventListener(
      'DOMSubtreeModified', this.handleFiltering.bind(this));
  }

  createSliders(): void {
    this.buildYearFilter();
    this.buildCountFilter();
  }

  private buildYearFilter(): void {
    let formatForYearSlider = {
      from: function (formattedValue: string) {
        return Number(formattedValue);
      },
      to: function (numericValue: number) {
        return Math.round(numericValue);
      }
    };

    noUiSlider.create(this.yearSlider, {
      start: ['1990', '2030'],
      connect: true,
      range: {
        'min': 1990,
        'max': 2030
      },
      format: formatForYearSlider,
    });

    this.yearSlider?.noUiSlider?.set(['1998', '2020']);

    var formatValues = [
      this.minYearElement!,
      this.maxYearElement!
    ];

    this.yearSlider?.noUiSlider?.on('update', function (values: (number | string)[], handleNumber: number) {
      formatValues[handleNumber].innerHTML = values[handleNumber].toString();
    });
  }

  private buildCountFilter(): void {
    let formatForCountSlider = {
      from: function (formattedValue: string) {
        return Number(formattedValue);
      },
      to: function (numericValue: number) {
        return Math.round(numericValue);
      }
    };

    noUiSlider.create(this.countSlider, {
      start: ['0', '200'],
      connect: true,
      range: {
        'min': 0,
        'max': 200
      },
      format: formatForCountSlider
    });

    this.countSlider?.noUiSlider?.set(['10', '160']);

    var formatValues = [
      this.minCountElement!,
      this.maxCountElement!
    ];

    this.countSlider?.noUiSlider?.on('update', function (values: (number | string)[], handleNumber: number) {
      formatValues[handleNumber].innerHTML = values[handleNumber].toString();
    });
  }

  private handleFiltering(event: Event): void {
    let target = event.target as HTMLElement;

    let minYear = this.minYearElement!.innerText;
    let maxYear = this.maxYearElement!.innerText;
    let minCount = this.minCountElement!.innerText;
    let maxCount = this.maxCountElement!.innerText;

    if (minCount && maxCount && minYear && maxYear) {
      if (target.id.includes('count')) {
        this.sliderFiltering(0, 'hide-count', minCount, maxCount);
      }

      if (target.id.includes('year')) {
        this.sliderFiltering(1, 'hide-year', minYear, maxYear);
      }
    }
    App.showNoItemsMessage();
  }

  private sliderFiltering(
    childIndex: number,
    className: string,
    min: string,
    max: string
  ) {
    this.arrayBrashes = Array.from(document.querySelectorAll('.brash'))

    let showArr = this.arrayBrashes.filter(it => {
      let value = parseInt(this.getBrashPropValue(it, childIndex, 1));
      return +min <= value && value <= +max;
    })

    let hideArr = this.arrayBrashes.filter(it =>
      !showArr.includes(it));
    hideArr.forEach(brash => {
      if (!brash.classList.contains(className)) {
        brash.classList.add(className);
      }
    })

    showArr.forEach(brash => {
      if (brash.classList.contains(className)) {
        brash.classList.remove(className);
      }
    })
  }

  private getBrashPropValue(brash: Element, liIndex: number, splittedIndex: number): string {
    let value = brash
      .querySelector('ul')!
      .childNodes[liIndex].textContent!
      .split(' ')[splittedIndex] as string

    return value
  }
}