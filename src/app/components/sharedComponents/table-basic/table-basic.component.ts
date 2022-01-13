import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../base-component/base.component";
import {MatTableDataSource} from "@angular/material/table";
import {CrudService} from "../../../services/crud.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {BehaviorSubject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

export class TableBasicComponent<T = any> extends BaseComponent implements OnInit {
  listResult: T[] = [];
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  listCount: number = 0;
  // @ts-ignore
  protected crudService: CrudService<any>;
  pageSizeOptions: number[] = [20, 60, 100, 200, 400];

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading$.asObservable();

  constructor(
    protected activatedRoute?: ActivatedRoute,
    protected router?: Router
  ) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.crudService = this.getCrudService();
    this.searchOnFirstPage();
  }

  onSort(sort: Sort) {
    // @ts-ignore
    this.paginator?.pageIndex = 0;
    this.searchResult();
  }

  pageChanged(page: PageEvent) {
    this.searchResult();
  }

  refresh() {
    this.searchResult();
  }

  searchOnFirstPage() {
    this.searchResult();
  }

  searchResult() {
    if (this.crudService) {
      this._isLoading$.next(true);
      this.crudService.getModels()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) => {
          this._isLoading$.next(false);
          this.saveResult(result);
        })
    }
  }

  protected saveEmptyResult() {
    const result: any[] = [];
    this._isLoading$.next(false);
    this.saveResult(result);
  }

  protected saveResult(result: any) {
    this.listResult = result;
    this.dataSource = new MatTableDataSource(this.listResult);
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      // @ts-ignore
      if (data[sortHeaderId]) {
        return this.sort?.direction === 'asc' ? '3' : '1';
      }
      // @ts-ignore
      return data[sortHeaderId];
    }
    this.dataSource.sort = this.sort;
    this.listCount = this.listResult.length;
  }

  protected saveResultsArray(results: any[]) {
    if (!results) {
      results = [];
    }
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.sort = this.sort;
    this.dataSource.data.length = results.length;
    this.listCount = results.length;
  }

  protected getCrudService(): CrudService<any> {
    // @ts-ignore
    return null;
  }
}
