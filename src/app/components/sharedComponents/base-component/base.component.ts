import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

export class BaseComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(protected route?: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
