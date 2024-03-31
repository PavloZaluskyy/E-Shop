export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: Rating;
    subCategory?: string;
    colors?: string[];
    size?: string[];
    characteristics?: Characteristics;
  }

  export interface Rating {
    rate: number;
    count: number;
  }

export interface Characteristics {
  brand: string;
  conector?: string[];
  compatibility?: string[];
  size?: string;
  diagonal?: string;
  screenExtension?: string;
  refreshRate?: string;
  matrixType?: string;
  material?: string[];
  purpose?: string[];    
}

export interface FilterComplite {
  brand: string[];
  conector?: string[];
  compatibility?: string[];
  size?: string[];
  diagonal?: string[];
  screenExtension?: string[];
  refreshRate?: string[];
  matrixType?: string[];
  material?: string[];
  purpose?: string[];    
}

export interface FilterCheckbox {
  name: string;
  completed: boolean;
}

export interface InputOnFilterComponent {
  brandsArr: FilterCheckbox[];
  connector: FilterCheckbox[];
  compatibility: FilterCheckbox[];
  size: FilterCheckbox[];
  diagonal: FilterCheckbox[];
  screenExtension: FilterCheckbox[];
  refreshRate: FilterCheckbox[];
  matrixType: FilterCheckbox[];
  material: FilterCheckbox[];
  purpose: FilterCheckbox[];
}

export interface ChooseCriterionProduct {
  name: string;
  isSelected: boolean;
}
