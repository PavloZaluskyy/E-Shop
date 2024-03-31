import { Injectable } from '@angular/core';
import { FilterCheckbox, Product } from '../pages/models/product.module';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  // brandsArr: string[] = [];

  constructor() { }

  getBrandsForFilter(data: Product[]): FilterCheckbox[] {
    let brandsArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.brand && !brandsArr.some(element => element.name === item.characteristics?.brand))
        brandsArr.push({
          name: item.characteristics?.brand,
          completed: false
        })

    })
    console.log(brandsArr);
    
    return brandsArr;
  }

  getCompatibilityFilter(data: Product[]): FilterCheckbox[] {
    let compatibilityArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.compatibility?.length){
        item.characteristics?.compatibility?.map( compatibility=> {
          if(!compatibilityArr.some(element => element.name === compatibility)){
            compatibilityArr.push({
              name: compatibility,
              completed: false
            })
          }
        })
      }
    })
    console.log(compatibilityArr);
    
    return compatibilityArr;
  }
  

  getConnectorForFilter(data: Product[]): FilterCheckbox[] {
    let connectorArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.conector?.length){
        item.characteristics?.conector?.map(conector => {
          if(!connectorArr.some(element => element.name === conector)){
            connectorArr.push({
              name: conector,
              completed: false
            })
          }
        })
      }
    })
    console.log(connectorArr);
    
    return connectorArr;
  }
  getSizeForFilter(data: Product[]): FilterCheckbox[] {
    let sizeArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.size && !sizeArr.some(element => element.name === item.characteristics?.size))
        sizeArr.push({
          name: item.characteristics?.size,
          completed: false
        })

    })
    console.log(sizeArr);
    
    return sizeArr;
  }
  getDiagonalForFilter(data: Product[]): FilterCheckbox[] {
    let diagonalArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.diagonal && !diagonalArr.some(element => element.name === item.characteristics?.diagonal))
        diagonalArr.push({
          name: item.characteristics?.diagonal,
          completed: false
        })

    })
    console.log(diagonalArr);
    
    return diagonalArr;
  }
  getScreenExtensionForFilter(data: Product[]): FilterCheckbox[] {
    let newArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.screenExtension && !newArr.some(element => element.name === item.characteristics?.screenExtension))
        newArr.push({
          name: item.characteristics?.screenExtension,
          completed: false
        })

    })
    console.log(newArr);
    
    return newArr;
  }

  getRefreshRateForFilter(data: Product[]): FilterCheckbox[] {
    let newArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.refreshRate && !newArr.some(element => element.name === item.characteristics?.refreshRate))
        newArr.push({
          name: item.characteristics?.refreshRate,
          completed: false
        })

    })
    console.log(newArr);
    
    return newArr;
  }

  getMatrixForFilter(data: Product[]): FilterCheckbox[] {
    let newArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.matrixType && !newArr.some(element => element.name === item.characteristics?.matrixType))
        newArr.push({
          name: item.characteristics?.matrixType,
          completed: false
        })

    })
    console.log(newArr);
    
    return newArr;
  }

  getMaterialForFilter(data: Product[]): FilterCheckbox[] {
    let newArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.material?.length){
        item.characteristics?.material?.map( compatibility=> {
          if(!newArr.some(element => element.name === compatibility)){
            newArr.push({
              name: compatibility,
              completed: false
            })
          }
        })
      }
    })
    console.log(newArr);
    
    return newArr;
  }
 
  getPurposeForFilter(data: Product[]): FilterCheckbox[] {
    let newArr: FilterCheckbox[] = [];
    data.map((item: Product) => {
      if(item.characteristics?.purpose?.length){
        item.characteristics?.purpose?.map( compatibility=> {
          if(!newArr.some(element => element.name === compatibility)){
            newArr.push({
              name: compatibility,
              completed: false
            })
          }
        })
      }
    })
    console.log(newArr);
    
    return newArr;
  }
}
