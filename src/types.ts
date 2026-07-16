export interface ProductColour {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // Lawn, Silk, Velvet, Chiffon, Georgette, Cotton
  subCategory: string; // Unstitched, Semi-Stitched, Festive Luxury, Ready-to-Wear
  price: number; // Original retail-equivalent price
  wholesalePrice: number; // Wholesale unit price (must buy whole pack/catalog set)
  packSize: number; // How many suits in 1 pack (usually 4 to 10 for complete catalogs)
  discount: number; // Percentage discount on wholesale price for bulk orders (or promotional discount)
  sku: string;
  material: string;
  description: string;
  specifications: {
    shirt: string;
    dupatta: string;
    trouser: string;
    embroideryDetails: string;
    careInstructions: string;
  };
  images: string[];
  sizes: string[];
  colours: ProductColour[];
  rating: number;
  reviewsCount: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
}

export interface CartItem {
  id: string; // Composite key: productId_size_colour_stitching
  product: Product;
  quantity: number; // Number of packs ordered
  selectedSize: string;
  selectedColour: ProductColour;
  stitchingOption: 'Unstitched' | 'Semi-Stitched' | 'Custom Boutique Stitched';
}

export interface User {
  name: string;
  email: string;
  companyName?: string;
  gstNumber?: string;
  isLoggedIn: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
