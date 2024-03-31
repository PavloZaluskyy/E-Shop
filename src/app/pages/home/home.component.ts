import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FilterCheckbox, InputOnFilterComponent, Product } from '../models/product.module';
import { ProductsService } from '../../services/products.service';
import { FilterService } from '../../services/filter.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  category: string = 'all';
  cols: number = 3;
  products: Product[] = [];
  sort: string = 'desc';
  subCategory: string = '';

  inputOnFilterComponent: InputOnFilterComponent = {
    brandsArr: [],
    connector: [],
    compatibility: [],
    size: [],
    diagonal: [],
    screenExtension: [],
    refreshRate: [],
    matrixType: [],
    material: [],
    purpose: []
  }
  minMaxPrice: any = {
    min: 0,
    max: 1
  }


  rowHeight: number = ROWS_HEIGHT[this.cols];

  constructor(
    private _cartService: CartService,
    private _productsService: ProductsService,
    private _filterService: FilterService) { }

  ngOnInit(): void {
    this._productsService.getAllProducts()
      .subscribe(data => {
        // this.category = 'all';
        this.products = data;
        // this.inputOnFilterComponent.brandsArr = this._filterService.getBrandsForFilter(this.products);
        // this.inputOnFilterComponent.connector = this._filterService.getConnectorForFilter(this.products);
        // this.inputOnFilterComponent.compatibility = this._filterService.getCompatibilityFilter(this.products);
        // this.inputOnFilterComponent.size = this._filterService.getSizeForFilter(this.products);

        // this.inputOnFilterComponent.diagonal = this._filterService.getDiagonalForFilter(this.products);
        // this.inputOnFilterComponent.screenExtension = this._filterService.getScreenExtensionForFilter(this.products);
        // this.inputOnFilterComponent.refreshRate = this._filterService.getRefreshRateForFilter(this.products);
        // this.inputOnFilterComponent.matrixType = this._filterService.getMatrixForFilter(this.products);
        // this.inputOnFilterComponent.material = this._filterService.getMaterialForFilter(this.products);
        // this.inputOnFilterComponent.purpose = this._filterService.getPurposeForFilter(this.products);

        // this.products = this._productsService.onHardcodeProduct(data, this.category);
        // this._filterService.products = this.products;
        console.log(this.products);

        this.onSortProduct();
      })
  }

  // onHardcodeProduct(data: Product[], category: string): Product[] {
  //   console.log("HardCode is Working");

  //   switch (category) {
  //     case "electronics": {
  //       data.map(item => {
  //         switch (item.id) {
  //           case 9: {item.subCategory = 'HDD'; break;}
  //           case 10: {item.subCategory = 'SSD'; break;}
  //           case 11: {item.subCategory = 'SSD'; break;}
  //           case 12: {item.subCategory = 'HDD'; break;}
  //           case 13: {item.subCategory = 'Monitor'; break;}
  //           case 14: {item.subCategory = 'Monitor'; break;}
  //         }
  //       })
  //       break;
  //     }
  //     case "jewelery": {
  //       data.map(item => {
  //         switch (item.id) {
  //           case 5: {item.subCategory = 'Bracelet'; break;}
  //           case 6: {item.subCategory = 'Ring'; break;}
  //           case 7: {item.subCategory = 'Ring'; break;}
  //           case 8: {item.subCategory = 'Earrings'; break;}
  //         }
  //       })
  //       break;
  //     }

  //     case "men's clothing": {
  //       data.map(item => {
  //         switch (item.id) {
  //           case 1: {item.subCategory = 'Backpack'; break;}
  //           case 2: {item.subCategory = 'T-Shirts'; break;}
  //           case 3: {item.subCategory = 'Jacket'; break;}
  //           case 4: {item.subCategory = 'pullover'; break;}
  //         }
  //       })
  //       break;
  //     }
  //     case "women's clothing": {
  //       data.map(item => {
  //         switch (item.id) {
  //           case 18: {item.subCategory = 'T-Shirts'; break;}
  //           case 19: {item.subCategory = 'T-Shirts'; break;}
  //           case 20: {item.subCategory = 'T-Shirts'; break;}
  //           case 15: {item.subCategory = 'Jacket'; break;}
  //           case 16: {item.subCategory = 'Jacket'; break;}
  //           case 17: {item.subCategory = 'Jacket'; break;}
  //         }
  //       })
  //       break;
  //     }
  //   }

  //   return data;
  // }

  onFilterByCategory(ratePrice = 0): void {
    if (this.category !== 'all') {
      this._productsService.getProductsByCategory(this.category)
        .subscribe(data => {
          this.products = data;
          this.generateFilter()
          // if(ratePrice) {
          //   this.onFilterByPrice(ratePrice);
          // }

          console.log("This`s subCategory" + this.subCategory);
          // this. products = this._productsService.onHardcodeProduct(data, this.category);
          if (this.subCategory) {
            this.products = this.onShowBySubCategory(data);
            this.generateFilter()
          }
          console.log("After worked filter SubCat ");
          // console.log(this.products);

          this.onSortProduct();
        });
    } else this._productsService.getAllProducts()
      .subscribe(data => {
        this.products = data; this.onSortProduct();
        if(ratePrice) {
          this.onFilterByPrice(ratePrice);
        }
        // this.inputOnFilterComponent.brandsArr = [...this._filterService.getBrandsForFilter(this.products)];
        // this.inputOnFilterComponent.connector = [...this._filterService.getConnectorForFilter(this.products)];
        // this.inputOnFilterComponent.compatibility = this._filterService.getCompatibilityFilter(this.products);
        // this.inputOnFilterComponent.size = this._filterService.getSizeForFilter(this.products);
        // this.inputOnFilterComponent.diagonal = this._filterService.getDiagonalForFilter(this.products);
        // this.inputOnFilterComponent.screenExtension = this._filterService.getScreenExtensionForFilter(this.products);
        // this.inputOnFilterComponent.refreshRate = this._filterService.getRefreshRateForFilter(this.products);
        // this.inputOnFilterComponent.matrixType = this._filterService.getMatrixForFilter(this.products);
        // this.inputOnFilterComponent.material = this._filterService.getMaterialForFilter(this.products);
        // this.inputOnFilterComponent.purpose = this._filterService.getPurposeForFilter(this.products);
      })
    console.log(this.inputOnFilterComponent.connector);
  }

  onShowBySubCategory(data: Product[]) {
    const OldArr = [...this.products];
    console.log(this.subCategory);
    console.log(data);
    data = data.filter(item => item.subCategory == this.subCategory)
    console.log("Sort by SubCategory: ");
    console.log(data);
    return data
  }

  generateFilter() {
    this.inputOnFilterComponent.brandsArr = [...this._filterService.getBrandsForFilter(this.products)];
    this.inputOnFilterComponent.connector = [...this._filterService.getConnectorForFilter(this.products)];
    this.inputOnFilterComponent.compatibility = this._filterService.getCompatibilityFilter(this.products);
    this.inputOnFilterComponent.size = this._filterService.getSizeForFilter(this.products);
    this.inputOnFilterComponent.diagonal = this._filterService.getDiagonalForFilter(this.products);
    this.inputOnFilterComponent.screenExtension = this._filterService.getScreenExtensionForFilter(this.products);
    this.inputOnFilterComponent.refreshRate = this._filterService.getRefreshRateForFilter(this.products);
    this.inputOnFilterComponent.matrixType = this._filterService.getMatrixForFilter(this.products);
    this.inputOnFilterComponent.material = this._filterService.getMaterialForFilter(this.products);
    this.inputOnFilterComponent.purpose = this._filterService.getPurposeForFilter(this.products);
  }
  onSortChange(sort: string): void {
    console.log(sort);
    this.sort = sort;
    this.onSortProduct();

  }

  onSortProduct(): void {
    let sortObj;

    if (this.sort === 'desc') {
      console.log("sort desc");

      sortObj = this.products.slice(0).sort((a, b) => a.price - b.price);
      this.minMaxPrice.min = sortObj[0].price;
      this.minMaxPrice.max = sortObj[sortObj.length - 1].price;
    } else {
      sortObj = this.products.slice(0).sort((a, b) => a.price < b.price ? 1 : -1);
      this.minMaxPrice.max = sortObj[0].price;
      this.minMaxPrice.min = sortObj[sortObj.length - 1].price;
    }

    this.products = [...sortObj]
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onChangeFilter(newFilter: any): void {
    console.log("change");

    switch (newFilter.key) {
      case 'brands': this.onFilterByBrands(newFilter.value); this.onSortProduct(); break;
      case 'connectors': this.onFilterByConnectors(newFilter.value); this.onSortProduct(); break;
      case 'compatibility': this.onFilterByCompatibility(newFilter.value); this.onSortProduct(); break;
      case 'size': this.onFilterBySize(newFilter.value); this.onSortProduct(); break;
      case 'diagonal': this.onFilterByDiagonal(newFilter.value); this.onSortProduct(); break;
      case 'screenExtension': this.onFilterByScreenExtension(newFilter.value); this.onSortProduct(); break;
      case 'refreshRate': this.onFilterByRefreshRate(newFilter.value); this.onSortProduct(); break;
      case 'matrixType': this.onFilterByMatrix(newFilter.value); this.onSortProduct(); break;
      case 'material': this.onFilterByMaterial(newFilter.value);this.onSortProduct(); break;
      case 'purpose': this.onFilterByPurpose(newFilter.value); this.onSortProduct(); break;
      default: this.onCheckByCategory(); this.onSortProduct(); break;
    }


    console.log("home comp new Filter:" + newFilter.subCategory);


  }
  onChangeCategory(newFilter: any) {
    this.category = "";
    this.subCategory = "";
    console.log(newFilter);
    
    if (newFilter.category) {
      this.category = newFilter.category;
      if (newFilter.subCategory) {
        this.subCategory = newFilter.subCategory;
      }
      // if(newFilter.ratePrice.min || newFilter.ratePrice.max) {
      //   console.log(newFilter.ratePrice);
        this.onFilterByCategory(newFilter.ratePrice);}
      // this.onFilterByCategory();
    // }
    console.log(newFilter);
    if(newFilter.ratePrice.min || newFilter.ratePrice.max) {
      console.log(newFilter.ratePrice);
      // this.onFilterByCategory(newFilter.ratePrice);
      this.onFilterByPrice(newFilter.ratePrice);
    }
  }

  onFilterByPrice(ratePrice: any) {
    this.products = this.products.filter(item => item.price >= ratePrice.min && item.price <= ratePrice.max);
    console.log("price");

    console.log(this.products);

  }

  onFilterByCompatibility(filterCompatibility: string[]) {
    let newArr: Product[] = [];
    if (filterCompatibility[0] !== 'all' && filterCompatibility.length) {
      for (let product of this._productsService.products) {
        for (let compatibility of filterCompatibility) {
          if (product.characteristics?.compatibility?.some(e => e === compatibility)) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      console.log(newArr);

      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onFilterByPurpose(filterCompatibility: string[]) {
    let newArr: Product[] = [];
    if (filterCompatibility[0] !== 'all' && filterCompatibility.length) {
      for (let product of this._productsService.products) {
        for (let compatibility of filterCompatibility) {
          if (product.characteristics?.purpose?.some(e => e === compatibility)) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      console.log(newArr);

      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onFilterByMaterial(filterCompatibility: string[]) {
    let newArr: Product[] = [];
    if (filterCompatibility[0] !== 'all' && filterCompatibility.length) {
      for (let product of this._productsService.products) {
        for (let compatibility of filterCompatibility) {
          if (product.characteristics?.material?.some(e => e === compatibility)) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      console.log(newArr);

      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onFilterByConnectors(filterConnectors: string[]) {
    let newArr: Product[] = [];
    if (filterConnectors[0] !== 'all' && filterConnectors.length) {
      for (let product of this._productsService.products) {
        for (let connector of filterConnectors) {
          if (product.characteristics?.conector?.some(e => e === connector)) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onCheckByCategory() {
    if (this.category || this.subCategory) {
      this.onFilterByCategory();
    } else {
      this._productsService.getAllProducts()
        .subscribe(data => this.products = data)
    }
  }

  onFilterByBrands(filterBrands: string[]) {
    let newArr: Product[] = [];
    if (filterBrands[0] !== 'all' && filterBrands.length) {
      for (let product of this._productsService.products) {
        for (let brand of filterBrands) {
          if (product.characteristics?.brand === brand) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    } else {
      this.onCheckByCategory();
    }
  }

  onFilterBySize(filterSize: string[]) {
    let newArr: Product[] = [];
    if (filterSize[0] !== 'all' && filterSize.length) {
      for (let product of this._productsService.products) {
        for (let size of filterSize) {
          if (product.characteristics?.size === size) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onFilterByDiagonal(filterSize: string[]) {
    let newArr: Product[] = [];
    if (filterSize[0] !== 'all' && filterSize.length) {
      for (let product of this._productsService.products) {
        for (let size of filterSize) {
          if (product.characteristics?.diagonal === size) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onFilterByScreenExtension(filterSize: string[]) {
    let newArr: Product[] = [];
    if (filterSize[0] !== 'all' && filterSize.length) {
      for (let product of this._productsService.products) {
        for (let size of filterSize) {
          if (product.characteristics?.screenExtension === size) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }
  onFilterByRefreshRate(filterSize: string[]) {
    let newArr: Product[] = [];
    if (filterSize[0] !== 'all' && filterSize.length) {
      for (let product of this._productsService.products) {
        for (let size of filterSize) {
          if (product.characteristics?.refreshRate === size) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }

  onFilterByMatrix(filterSize: string[]) {
    let newArr: Product[] = [];
    console.log(this._productsService.products);

    if (filterSize[0] !== 'all' && filterSize.length) {
      for (let product of this._productsService.products) {
        for (let size of filterSize) {
          if (product.characteristics?.matrixType === size) {
            if (!newArr.find(e => e.id === product.id)) {
              newArr.push(product)
            }
          }
        }
      }
      this.products = newArr;
      this.generateFilter()

    }
    else {
      this.onCheckByCategory();
    }
  }


  onAddToCart(product: Product) {
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }
  onClearFilter(item: any) {
    console.log("clear");
    
    this._productsService.getAllProducts()
      .subscribe((data: Product[]) => this.products = data)

  }

}

