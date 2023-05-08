import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../Services/product.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products! :Array<Product>;
  errorMessage! : string;
  searchFormGroup!: FormGroup
  currentPage:number=0
  pageSize:number=5
  totalPages:number=0
  currentAction:string="all"
  //Injected the Service
  constructor(private productService:ProductService,private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null)
    })
    this.handleGetPageProducts();

  }
  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next  : (data)=>{
        this.products=data;
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    })

  }
  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
        console.log(this.totalPages)
      },
      error: (err)=>{
        this.errorMessage=err;
      }
    })
  }
  handleDeleteProduct(p: Product) {
    let con=confirm("Are you sure ?")
    if(con==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next:(data)=>{
        // this.handleGetAllProducts();
        let index=this.products.indexOf(p);
        this.products.splice(index,1)
      }
    })
  }

  handleSetPromotion(p: Product) {
    let promo=p.promotion;
    this.productService.SetPromotion(p.id).subscribe({
      next:(data)=>{
        p.promotion=!promo;
      }

    })

  }

  handleGetSearch() {
    this.currentAction="search";
    let keyword=this.searchFormGroup.value.keyword;
    this.currentPage=0;
    this.productService.SearchProduct(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      }
    })
  }

  goToPage(i:number) {
    this.currentPage = i;
    if (this.currentAction == 'all') this.handleGetPageProducts();
    else
        this.handleGetSearch();
  }
}
