import { Brash } from "./models/brash";

export class BrashBuilder {
  buildBrashHtml(brash: Brash): void {
    let div = document.createElement('div');
    div.classList.add('brash');

    let title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = brash.brand + " " + brash.model;

    let image = document.createElement('img');
    image.src = brash.image;

    let details = document.createElement("div");
    details.classList.add('details');

    let buyButton = document.createElement('button');
    buyButton.classList.add('add-to-cart');
    buyButton.textContent = 'Add to cart';

    let inputCount = document.createElement('input');
    inputCount.classList.add('add-count');
    inputCount.type = "text";
    inputCount.setAttribute("value", "1");

    let descr = document.createElement('ul');
    let liCount = document.createElement('li');
    liCount.textContent = `Count: ${brash.count}`;

    let liYear = document.createElement('li');
    liYear.textContent = `Year: ${brash.year}`;

    let liBrand = document.createElement('li');
    liBrand.textContent = `Brand: ${brash.brand}`;

    let liColor = document.createElement('li');
    liColor.textContent = `Color: ${brash.color}`;

    let liSize = document.createElement('li');
    liSize.textContent = `Size: ${brash.size}`;

    let liIsPopular = document.createElement('li');
    liIsPopular.textContent = `Is Popular: ${brash.isPopular === true ? 'Yes' : 'No'}`;
    descr.appendChild(liCount);
    descr.appendChild(liYear);
    descr.appendChild(liBrand);
    descr.appendChild(liColor);
    descr.appendChild(liSize);
    descr.appendChild(liIsPopular);

    details.appendChild(descr);
    details.appendChild(buyButton);
    details.appendChild(inputCount);

    div.appendChild(title);
    div.appendChild(image);
    div.appendChild(details);

    let itemsContainer = document.getElementById('items-container');
    itemsContainer?.appendChild(div);
  }
}