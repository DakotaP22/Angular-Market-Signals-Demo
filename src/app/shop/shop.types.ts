export type ShopItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  brand: string;
  unitsInCart: number;
  img_src?: string;
};

export type ShopFilter = {
  minimumPrice: number | undefined;
  maximumPrice: number | undefined;
  search: string | null;
};

export enum ShopPages {
  MEAT_AND_SEAFOOD = 'meat-and-seafood',
  PRODUCE = 'produce',
  DAIRY = 'dairy',
  BAKERY = 'bakery',
}
