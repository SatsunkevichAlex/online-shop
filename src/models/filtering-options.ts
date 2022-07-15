export class FilteringOptions{
  cartCount!: string;
  yearSlider!: string[];
  countSlider!: string[];
  isPopular!: boolean;
  colorFilter!: { id: string; checked: boolean; }[];
  sizeFilter!: { id: string; checked: boolean; }[];
  producerFilter!: { id: string; checked: boolean; }[]
}