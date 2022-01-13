import { Component, OnInit } from '@angular/core';
import {TableBasicComponent} from "../sharedComponents/table-basic/table-basic.component";
import {Product} from "../../model/product";
import {MatTableDataSource} from "@angular/material/table";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends TableBasicComponent<Product>  {
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSourceTable: Product[] = [];
  // @ts-ignore
  override dataSource = new MatTableDataSource([]);
  constructor(private productService: ProductService) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override getCrudService() {
    return this.productService;
  }

  onEdit(product: Product) {
    this.productService.saveModel(product);
  }

  onDelete(product: Product) {
    this.productService.deleteModel(product);
  }

  addProduct() {
    const product: Product = {
      id: 1,
      name: 'Laptop',
      description: 'Szybki'
    };
    this.productService.saveModel(product);
  }
}
