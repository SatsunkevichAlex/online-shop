import { App } from "./app";
import { brashes } from "./assets/brashes"
import { BrashBuilder } from "./brash-builder";
import { Brash } from "./models/brash";
import { FilteringOptions } from "./models/filtering-options";
import { SelectsHandler } from "./models/selects-handler";
import { SessionStorageHandler } from "./sesstion-storage-handler";
import { SlidersHandler } from "./sliders-handler";
import './styles.scss';

let app = new App();
let builder = new BrashBuilder();
let sessionStorageHandler = new SessionStorageHandler();
let slidersHandler = new SlidersHandler();
let selectsHandler = new SelectsHandler();

let sessionBrashes = sessionStorage.getItem('brashes');
let filterOptionsString = sessionStorage.getItem('filter-settings') as string;
let filterOptions = JSON.parse(filterOptionsString) as FilteringOptions;

if (sessionBrashes) {
  let container = document.querySelector('#items-container');
  container!.innerHTML = sessionBrashes;
} else {
  var strictBrashes = brashes.map(it => it as unknown as Brash);
  strictBrashes.forEach(brash => {
    builder.buildBrashHtml(brash);
  })
}

app.addListenerToBuyButton();
app.addListenerForSorting();
slidersHandler.createSliders();
slidersHandler.addListenerForSliders();
app.addListenerForPopular();
selectsHandler.addListenerForSelects();
app.addListenerForResetFilters();
sessionStorageHandler.addListenerForResetSessionStorage();
app.addListenerForSearch();
document.getElementById('search')!.focus();

if (filterOptions) {
  sessionStorageHandler.restoreFilters(filterOptions);
}

window.onbeforeunload = function () {
  if (!SessionStorageHandler.saveSession) {
    SessionStorageHandler.saveSession = true;
    return;
  }
  sessionStorageHandler.setSessionStorage();
};