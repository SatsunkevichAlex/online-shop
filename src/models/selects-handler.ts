import { App } from "../app";

export class SelectsHandler {
  addListenerForSelects(): void {
    let selects = document.getElementById('select-filters-container')!.children;

    Array.from(selects).slice(0, 3).forEach(select => {
      select.addEventListener('change', this.handleSelectFilterChange);
    });
  }

  handleSelectFilterChange(event: Event): void {
    let target = event.target as HTMLSelectElement;
    let parent = target.parentElement;
    let selectedValues = Array.from(parent!.children)
      .filter(it => {
        return it.id && (it as HTMLInputElement).checked
      })
      .map(it => it.getAttribute('name')) as string[];

    let selectedElement = parent?.id.split('-')[0]!;

    let brashes = document.querySelectorAll('.brash');
    const arrayBrashes = Array.from(brashes);

    switch (selectedElement) {
      case 'sizes':
        SelectsHandler.filterDisplayedBrashes(
          arrayBrashes,
          selectedValues,
          4,
          'hide-sizes');
        break;
      case 'colors':
        SelectsHandler.filterDisplayedBrashes(
          arrayBrashes,
          selectedValues,
          3,
          'hide-colors');
        break;
      case 'producers':
        SelectsHandler.filterDisplayedBrashes(
          arrayBrashes,
          selectedValues,
          2,
          'hide-producers');
        break;
      default:
        break;
    }
  }

  private static filterDisplayedBrashes(arrayBrashes: Element[], selectedValues: string[], ulIndex: number, classValue: string): void {
    if (selectedValues.length === 0) {
      arrayBrashes.forEach(brash => {
        if (brash.classList.contains(classValue)) {
          brash.classList.remove(classValue);
        }
      })
      App.showNoItemsMessage();
      return;
    }

    let showArr = arrayBrashes.filter(it => {
      let brashProp = it.querySelector('ul')?.childNodes[ulIndex].textContent?.split(' ')[1] as string;
      return selectedValues.map(it => it.toUpperCase()).includes(brashProp.toUpperCase());
    })

    let hideArr = arrayBrashes.filter(it => !showArr.includes(it));
    hideArr.forEach(brash => {
      if (!brash.classList.contains(classValue)) {
        brash.classList.add(classValue);
      }
    })

    showArr.forEach(brash => {
      if (brash.classList.contains(classValue)) {
        brash.classList.remove(classValue);
      }
    })
    App.showNoItemsMessage();
  }
}