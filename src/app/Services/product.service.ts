import {Injectable, OnInit} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Product[];


  constructor() {
    this.products=[
      {id:UUID.UUID(),name:"Computer",price:4000,promotion:true},
      {id:UUID.UUID(),name:"SmartPhone",price:2000,promotion:false},
      {id:UUID.UUID(),name:"Printer",price:3000,promotion:true}
    ]
    for (let i = 0; i <10 ; i++) {
      this.products.push({id:UUID.UUID(),name:"Computer",price:4000,promotion:true})
      this.products.push({id:UUID.UUID(),name:"SmartPhone",price:2000,promotion:false})
      this.products.push({id:UUID.UUID(),name:"Printer",price:3000,promotion:true})


    }
  }
  public getAllProducts() :Observable<Array<Product>>{
    let rnd=Math.random();
    if(rnd<0.5) return throwError(()=>new Error("there is problem in the Connection"))

    else return of(this.products);
  }

  public getPageProducts(page :number,size:number) :Observable<PageProduct>{
    let index=page*size;
    let totalPage=~~(this.products.length/size);
    if(this.products.length % size !=0)
      totalPage++;

    let pageProducts = this.products.slice(index,index+size);

    return of({page:page,totalPages:totalPage,size:size,products:pageProducts})
  }

  public deleteProduct(id:string) :Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true)
  }

  public SetPromotion(id:string) :Observable<boolean>{
    let product = this.products.find(p=>p.id==id);
    if(product!=undefined){
      product.promotion=!product.promotion
      return of(true)
    }
    else return throwError(()=>new Error('the promotion is not found !'))
  }

  public SearchProduct(keyword:string,page:number,size:number) :Observable<PageProduct>{
    let result = this.products.filter(p=>p.name.includes(keyword));
    let index=page*size;
    let totalPage=~~(result.length/size);
    if(result.length % size !=0)
      totalPage++;

    let pageProducts = result.slice(index,index+size);


    return of({page:page,size:size,totalPages:totalPage,products:pageProducts})


  }

}
