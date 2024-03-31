import { Component, Output, EventEmitter, OnInit, ElementRef, ViewChild, Input, input } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { Category } from '../../../models/category.model';
import { MatSelectionList } from '@angular/material/list';
import { FilterService } from '../../../../services/filter.service';
import { Characteristics, FilterCheckbox, FilterComplite } from '../../../models/product.module';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  @Input() brandsArr: FilterCheckbox[];
  @Input() connectorArr: FilterCheckbox[];
  @Input() compatibilityArr: FilterCheckbox[];
  @Input() sizeArr: FilterCheckbox[];
  @Input() diagonalArr: FilterCheckbox[];
  @Input() screenExtensionArr: FilterCheckbox[];
  @Input() refreshRateArr: FilterCheckbox[];
  @Input() matrixTypeArr: FilterCheckbox[];
  @Input() materialArr: FilterCheckbox[];
  @Input() purposeArr: FilterCheckbox[];
  @Input() minMaxPrice: any;

  @Output() categoriesEmit = new EventEmitter<object>();
  @Output() filters = new EventEmitter<object>();
  @Output() clearFilter = new EventEmitter<string>()
  //@Output() showCategory = new EventEmitter<string>();
  categories: Category[] = [];
  subCategory: string = "";
  category: string = "";
  allCompleteBrands: boolean = false;
  allCompleteConnection: boolean = false;
  allCompleteCompatibility: boolean = false;
  allComplateSize: boolean = false;

  allCompleteDiagonal: boolean = false;
  allCompleteScreenExtension: boolean = false;
  allCompleteRefreshRate: boolean = false;
  allComplateMatrix: boolean = false;
  allCompleteMaterial: boolean = false;
  allComplatePurpose: boolean = false;

  filterComplite: FilterComplite;

  ratePrice = {
    min: 1,
    max: 99999
  }
  // brandsArr: string[];
  @ViewChild('categoryRef') private categoryRef: MatSelectionList;
  @ViewChild('subCategoryRef') private subCategoryRef: MatSelectionList;

  onShowCategory(category: string): void {
    // this.filterByAppStatus(subCatRef, event)
    console.log(this.brandsArr);
   this.category = category;
   
   this.onFilterEmit();
   this.subCategory =  "";
  }

  onShowSubCategory(subCategory: string): void {
    console.log("subcat working");
    console.log(this.brandsArr);
    // console.log(this.subCategoryRef);
    if(subCategory) {
      this.subCategory = subCategory;
    } else {
      this.subCategory =  "";
    } 
    this.onFilterEmit();
  }
  //   CheckBox for Brands
  someCompleteBrands(): boolean{
    if (this.brandsArr == null) {
      return false;
    }
    return this.brandsArr.filter(t => t.completed).length > 0 && !this.allCompleteBrands;

  }

  setAllBrands(completed: boolean){
    this.allCompleteBrands = completed;
    if (this.brandsArr == null) {
      return;
    }
    this.brandsArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("brands", this.checkAllBrands());
  }

  updateAllCompleteBrands(){
    this.allCompleteBrands = this.brandsArr != null && this.brandsArr.every(t => t.completed);
    this.onDynamicFilter("brands", this.checkAllBrands());
  }

  checkAllBrands(): string[] {
    if(this.allCompleteBrands) {
      return ['all']
    }
    return this.brandsArr.filter(item => item.completed).map(item => item.name)
  }

  // CheckBox for Connectors

  
  someCompleteConnectors(): boolean{
    if (this.connectorArr == null) {
      return false;
    }
    return this.connectorArr.filter(t => t.completed).length > 0 && !this.allCompleteConnection;

  }

  setAllConnectors(completed: boolean){
    this.allCompleteConnection = completed;
    if (this.connectorArr == null) {
      return;
    }
    this.connectorArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("connectors", this.checkAllConnectors());
  }

  updateAllCompleteConnectors(){
    this.allCompleteConnection = this.connectorArr != null && this.connectorArr.every(t => t.completed);
    this.onDynamicFilter("connectors", this.checkAllConnectors());
  }

  checkAllConnectors(): string[] {
        if(this.allCompleteConnection) {
      return ['all']
    }
    return this.connectorArr.filter(item => item.completed).map(item => item.name)
  }


  //  CheckBox compatibility
  someCompleteCompatibility(): boolean{
    if (this.compatibilityArr == null) {
      return false;
    }
    return this.compatibilityArr.filter(t => t.completed).length > 0 && !this.allCompleteCompatibility;

  }

  setAllCompatibility(completed: boolean){
    this.allCompleteCompatibility = completed;
    if (this.compatibilityArr == null) {
      return;
    }
    this.compatibilityArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("compatibility", this.checkAllCompatibility());
  }

  updateAllCompatibility(){
    this.allCompleteCompatibility = this.compatibilityArr != null && this.compatibilityArr.every(t => t.completed);
    this.onDynamicFilter("compatibility", this.checkAllCompatibility());
  }

  checkAllCompatibility(): string[] {
        if(this.allCompleteCompatibility) {
      return ['all']
    }
    return this.compatibilityArr.filter(item => item.completed).map(item => item.name)
  }
 

  // CheckBox Size 
  someCompleteSize(): boolean{
    if (this.sizeArr == null) {
      return false;
    }
    return this.sizeArr.filter(t => t.completed).length > 0 && !this.allComplateSize;

  }

  setAllSize(completed: boolean){
    this.allComplateSize = completed;
    if (this.sizeArr == null) {
      return;
    }
    this.sizeArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("size", this.checkAllSize());
  }

  updateAllSize(){
    this.allComplateSize = this.sizeArr != null && this.sizeArr.every(t => t.completed);
    this.onDynamicFilter("size", this.checkAllSize());
  }

  checkAllSize(): string[] {
        if(this.allComplateSize) {
      return ['all']
    }
    return this.sizeArr.filter(item => item.completed).map(item => item.name)
  }
  // CheckBox Diagonal

  someCompleteDiagonal(): boolean{
    if (this.diagonalArr == null) {
      return false;
    }
    return this.diagonalArr.filter(t => t.completed).length > 0 && !this.allCompleteDiagonal;

  }

  setAllDiagonal(completed: boolean){
    this.allCompleteDiagonal = completed;
    if (this.diagonalArr == null) {
      return;
    }
    this.diagonalArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("diagonal", this.checkAllDiagonal());
  }

  updateAllDiagonal(){
    this.allCompleteDiagonal = this.diagonalArr != null && this.diagonalArr.every(t => t.completed);
    this.onDynamicFilter("diagonal", this.checkAllDiagonal());
  }

  checkAllDiagonal(): string[] {
        if(this.allCompleteDiagonal) {
      return ['all']
    }
    return this.diagonalArr.filter(item => item.completed).map(item => item.name)
  }
  
  // CheckBox ScreenExtension

  
  someCompleteScreenExtension(): boolean{
    if (this.screenExtensionArr == null) {
      return false;
    }
    return this.screenExtensionArr.filter(t => t.completed).length > 0 && !this.allCompleteScreenExtension;

  }

  setAllScreenExtension(completed: boolean){
    this.allCompleteScreenExtension = completed;
    if (this.screenExtensionArr == null) {
      return;
    }
    this.screenExtensionArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("screenExtension", this.checkAllScreenExtension());
  }

  updateAllScreenExtension(){
    this.allCompleteScreenExtension = this.screenExtensionArr != null && this.screenExtensionArr.every(t => t.completed);
    this.onDynamicFilter("screenExtension", this.checkAllScreenExtension());
  }

  checkAllScreenExtension(): string[] {
        if(this.allCompleteScreenExtension) {
      return ['all']
    }
    return this.screenExtensionArr.filter(item => item.completed).map(item => item.name)
  }

  // CheckBox RefreshRate

  someCompleteRefreshRate(): boolean{
    if (this.refreshRateArr == null) {
      return false;
    }
    return this.refreshRateArr.filter(t => t.completed).length > 0 && !this.allCompleteRefreshRate;

  }

  setAllRefreshRate(completed: boolean){
    this.allCompleteRefreshRate = completed;
    if (this.refreshRateArr == null) {
      return;
    }
    this.refreshRateArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("refreshRate", this.checkAllRefreshRate());
  }

  updateAllRefreshRate(){
    this.allCompleteRefreshRate = this.refreshRateArr != null && this.refreshRateArr.every(t => t.completed);
    this.onDynamicFilter("refreshRate", this.checkAllRefreshRate());
  }

  checkAllRefreshRate(): string[] {
        if(this.allCompleteRefreshRate) {
      return ['all']
    }
    return this.refreshRateArr.filter(item => item.completed).map(item => item.name)
  }

  // CheckBox MatrixType

  
  someCompleteMatrixType(): boolean{
    if (this.refreshRateArr == null) {
      return false;
    }
    return this.refreshRateArr.filter(t => t.completed).length > 0 && !this.allCompleteRefreshRate;

  }

  setAllMatrixType(completed: boolean){
    this.allComplateMatrix = completed;
    if (this.matrixTypeArr == null) {
      return;
    }
    this.matrixTypeArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("matrixType", this.checkAllMatrixType());
  }

  updateAllMatrixType(){
    this.allComplateMatrix = this.matrixTypeArr != null && this.matrixTypeArr.every(t => t.completed);
    this.onDynamicFilter("matrixType", this.checkAllMatrixType());
  }

  checkAllMatrixType(): string[] {
        if(this.allComplateMatrix) {
      return ['all']
    }
    return this.matrixTypeArr.filter(item => item.completed).map(item => item.name)
  }

  // CheckBox Material

  
  someCompleteMaterial(): boolean{
    if (this.materialArr == null) {
      return false;
    }
    return this.materialArr.filter(t => t.completed).length > 0 && !this.allCompleteMaterial;

  }

  setAllMaterial(completed: boolean){
    this.allCompleteMaterial = completed;
    if (this.materialArr == null) {
      return;
    }
    this.materialArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter("material", this.checkAllMaterial());
  }

  updateAllMaterial(){
    this.allCompleteMaterial = this.materialArr != null && this.materialArr.every(t => t.completed);
    this.onDynamicFilter("material", this.checkAllMaterial());
  }

  checkAllMaterial(): string[] {
        if(this.allCompleteMaterial) {
      return ['all']
    }
    return this.materialArr.filter(item => item.completed).map(item => item.name)
  }

  // CheckBox Purpose

  someCompletePurpose(): boolean{
    if (this.purposeArr == null) {
      return false;
    }
    return this.purposeArr.filter(t => t.completed).length > 0 && !this.allComplatePurpose;

  }

  setAllPurpose(completed: boolean){
    this.allComplatePurpose = completed;
    if (this.purposeArr == null) {
      return;
    }
    this.purposeArr.forEach(t => (t.completed = completed));
    this.onDynamicFilter('purpose', this.checkAllPurpose());
  }

  updateAllPurpose(){
    this.allComplatePurpose = this.purposeArr != null && this.purposeArr.every(t => t.completed);
    this.onDynamicFilter('purpose', this.checkAllPurpose());
  }

  checkAllPurpose(): string[] {
        if(this.allComplatePurpose) {
      return ['all']
    }
    return this.purposeArr.filter(item => item.completed).map(item => item.name)
  }

  onFilterEmit() {
    // if(this.onValidatorPrice()) {
      console.log("emit");
      
      this.categoriesEmit.emit(
        {
          category: this.category,
          subCategory: this.subCategory,
          ratePrice: this.ratePrice
        })
      // console.log(this.minMaxPrice);
    // }
    

      // this.category = "";
      // this.subCategory = "";
  
  }

  onDynamicFilter(key:string ,value: string[]){
    this.filters.emit({key, value})
      // {
      //   brands: [...this.checkAllBrands()],
      //   connectors: [...this.checkAllConnectors()],
      //   compatibility: [...this.checkAllCompatibility()],
      //   size: [...this.checkAllSize()],
      //   diagonal: [...this.checkAllDiagonal()],
      //   screenExtension: [...this.checkAllScreenExtension()],
      //   refreshRate: [...this.checkAllRefreshRate()],
      //   matrixType: [...this.checkAllMatrixType()],
      //   material: [...this.checkAllMaterial()],
      //   purpose: [...this.checkAllPurpose()],
      //   ratePrice: this.ratePrice

      // })
  }

  updateRatePrice(key: string, value: number ){
      // this.ratePrice.min = Math.round(this.minMaxPrice.min);
      // this.ratePrice.max = Math.round(this.ratePrice.max)
      if (key === 'min') {
        console.log("min");
        
        this.ratePrice.min = +value;
      } else if(key === 'max') {
        console.log("max");
        this.ratePrice.max = +value;
      }
      
      console.log(this.ratePrice);
  }
  onValidatorPrice(): boolean {
    if(this.ratePrice.min < this.ratePrice.max && this.ratePrice.min >= this.minMaxPrice.min && this.ratePrice.max <= this.minMaxPrice.max) {
      return true
    }
    return false
  }

  constructor(private _productService: ProductsService,
              private filterService: FilterService) {}

  ngOnInit(): void {
    console.log(this.minMaxPrice);
    this.ratePrice.min = this.minMaxPrice.min;
    this.ratePrice.max = this.minMaxPrice.max;
    this._productService.getAllCategories()
      .subscribe(data => { this.categories = data;
        // console.log(this.filterService.products);
        // this.filterService.getBrandsForFilter();
        // console.log(this.filterService.brandsArr);
        
        // this.categories = [...data];
        // this.categories.unshift('all');
      })
  }

  onClear(){
    this.brandsArr = [];
    this.connectorArr = [];
    this.compatibilityArr = [];
    this.sizeArr = [];
    this.diagonalArr = [];
    this.screenExtensionArr = [];
    this.refreshRateArr = [];
    this.matrixTypeArr = [];
    this.materialArr = [];
    this.purposeArr = [];

    this.clearFilter.emit("clear")
  }

}
