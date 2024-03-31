import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Product } from '../pages/models/product.module';
import { Category } from '../pages/models/category.model';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];

  private _HTTP: string = 'https://fakestoreapi.com/products';

  constructor(private httpClient: HttpClient,
    private filterSerice: FilterService) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this._HTTP)
      .pipe(map(data => {
        return this.products = this.onHardcodeProduct(data);
        
      }))
  }

  onHardcodeProduct(data: Product[], category: string = 'all'): Product[] {
    console.log("HardCode is Working");

    data.map((item: Product) => {
      switch (item.id) {
        case 9: {
          item.subCategory = 'HDD';
          item.colors = ["black", "red"];
          item.characteristics = {
            brand: "WD",
            conector: ["USB-3.0", "USB-2.0"],
            compatibility: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7"],
            size: "2TB"
          };
          break;
        }
        case 10: {
          item.subCategory = 'SSD';
          item.colors= ["black", "green"];
          item.characteristics = {
            brand: "SanDisk",
            conector: ["SATA-3"],
            compatibility: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7"],
            size: "1TB"
          }
          break;
        }
        case 11: {
          item.subCategory = 'SSD';
          item.colors= ["black", "white"];
          item.characteristics = {
            brand: "Silicon Power",
            conector: ["SATA-3"],
            compatibility: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7"],
            size: "256GB"
          }
          break;
        }
        case 12: {
          item.subCategory = 'HDD';
          item.colors= ["black", "blue"];
          item.characteristics = {
            brand: "WD",
            conector: ["USB-3.0"],
            compatibility: ["PS 5", "PS 4", "PS 4 pro"],
            size: "4TB"
          }
          break;
        }
        case 13: {
          item.subCategory = 'Monitor';
          item.colors= ["black", "white"];
          item.characteristics = {
            brand: "Accer",
            conector: ["HDMI"],
            diagonal: '21.5"',
            screenExtension: '1920 x 1080',
            refreshRate: "75Hz",
            matrixType: "IPS"
          }
          break;
        }
        case 14: {
          item.subCategory = 'Monitor';
          item.colors= ["black", "white"];
          item.characteristics = {
            brand: "Samsung",
            conector: ["HDMI"],
            diagonal: '49"',
            screenExtension: "5,120 x 1,440",
            refreshRate: "144Hz",
            matrixType: "QLED"
          }
          break;
        }
        case 5: {
          item.subCategory = 'Bracelet';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.characteristics = {
            brand: "John Hardy",
            material: ["Gold", "Silver"]
          }
          break;
        }
        case 6: {
          item.subCategory = 'Ring';
          item.size= ['4 1/4', '5 1/2', '6 3/4', '8', '9'];
          item.characteristics = {
            brand: "Hafeez Center",
            material: ["Silver"]
          }
          break;
        }
        case 7: {
          item.subCategory = 'Ring';
          item.size= ['4 1/4', '5 1/2', '6 3/4', '8', '9'];
          item.characteristics = {
            brand: "Italo Halo",
            material: ["Gold"]
          }
          break;
        }
        case 8: {
          item.subCategory = 'Earrings';
          item.characteristics = {
            brand: "Pierced Owl",
            material: ["Rose Gold", "316L Stainless Steel"]
          }
          break;
        }
        case 1: {
          item.subCategory = 'Backpack';
          item.colors= ["black", "white"];
          item.size= ['20L', '25L', '30L', '35L']
          item.characteristics = {
            brand: "Fjallraven",
            material: ["Catton"],
            purpose: ["laptop"]
          }
          break;
        }
        case 2: {
          item.subCategory = 'T-Shirts';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["black/white", "white/black"];
          item.characteristics = {
            brand: "H2H",
            material: ["Catton"]
          }
          break;
        }
        case 3: {
          item.subCategory = 'Jacket';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["brown", "black"];
          item.characteristics = {
            brand: "BETTONAL",
            material: ["Catton"]
          }
          break;
        }
        case 4: {
          item.subCategory = 'pullover';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["brown", "black", 'grey', 'green'];
          item.characteristics = {
            brand: "O'STIN",
            material: ["Catton"]

          }
          break;
        }
        case 18: {
          item.subCategory = 'T-Shirts';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["brown", "black", 'grey', 'red'];
          item.characteristics = {
            brand: "MBJ",
            material: ["RAYON"]
          }
          break;
        }
        case 19: {
          item.subCategory = 'T-Shirts';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["brown", "black", 'grey', 'red'];
          item.characteristics = {
            brand: "Opna",
            material: ["Polyester"]
          }
          break;
        }
        case 20: {
          item.subCategory = 'T-Shirts';
          item.size = ['XS', 'S', 'M', 'L', 'XL'];
          item.colors = ["purpure", "black", 'grey', 'red'];
          item.characteristics = {
            brand: "DANVOUY",
            material: ["Catton"]
          }
          break;
        }
        case 15: {
          item.subCategory = 'Jacket';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["purpure", "black", 'grey', 'green'];
          item.characteristics = {
            brand: "BIYLACLESEN",
            material: ["Polyester"],
            purpose: ["Snowboard"]
          }
          break;
        }
        case 16: {
          item.subCategory = 'Jacket';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["brown", "black"];
          item.characteristics = {
            brand: "Lock and Love",
            material: ["POLYURETHANE"],
            purpose: ["moto"]
          }
          break;
        }
        case 17: {
          item.subCategory = 'Jacket';
          item.size= ['XS', 'S', 'M', 'L', 'XL'];
          item.colors= ["blue", "black", 'brown'];
          item.characteristics = {
            brand: "Arthas",
            material: ["Polyester"],
            purpose: ["Climbing", "Rain", "Windbreaker"]
          }
          break;
        }
      }
    })
    // this.filterSerice.products.add(data);
    return data;
  }

  // getHardcodeProductById(data: Product[], id: number): Product[] {
  //   console.log(data);
    
  //   return data.filter(product => product.id === id)

  // }


getProductsByCategory(category: string, limit: number = 0): Observable < Product[] > {
  if(limit) {
    return this.httpClient.get<Product[]>(this._HTTP + '/category/' + category + '?limit=' + limit)
      .pipe(map(data => {
        return this.onHardcodeProduct(data)
      }))
  }
    return this.httpClient.get<Product[]>(this._HTTP + '/category/' + category)
        .pipe(map(data => {
          return this.onHardcodeProduct(data)
        }))
}

getAllCategories(): Observable < Category[] > {
  const _url = '/categories';
  return this.httpClient.get<string[]>(this._HTTP + _url)
    .pipe(map(data => {
      let newObs: Category[] = [];
      data.map(item => {
        switch (item) {
          case "electronics": newObs.push({ name: "electronics", subCategory: ["HDD", "SSD", "Monitor"] }); break;
          case "jewelery": newObs.push({ name: "jewelery", subCategory: ["Bracelet", "Ring", "Earrings"] }); break;
          case "men's clothing": newObs.push({ name: "men's clothing", subCategory: ["pullover", "T-Shirts", "Jacket", "Backpack"] }); break;
          case "women's clothing": newObs.push({ name: "women's clothing", subCategory: ["T-Shirts", "Jacket"] }); break;
          default: break;
        }
      })
      return newObs;
    }))
      ;
}

getProductById(id: number) : Observable <Product> {
  return this.httpClient.get<Product>(this._HTTP + '/' + id)
    .pipe(map((data: Product) => {
      return this.onHardcodeProduct([data])[0]
    }))
}
}
