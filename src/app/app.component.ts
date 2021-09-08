import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponentService } from './app-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  displayedColumns: string[] = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain'];
  dataSource:any;
  totalElements:number;
  pageSize:number;
  nextPage:string;
  previous:string;
  pageIndex:number;

  constructor(private service: AppComponentService){}

  ngOnInit(): void {
    this.pageIndex=0;
    this.getPlanets();
  }

  getPlanets(nextPage?:string){
    this.service.getPlanets(nextPage).subscribe(data => {
      this.nextPage = data.next;
      this.previous = data.previous;
      this.totalElements = data.count;
      this.pageSize = data.results.length;
      this.dataSource = new MatTableDataSource(data.results);
    });
  }

  onPaginate(event:PageEvent){
    let url: string;

    if (event.pageIndex > this.pageIndex){
      url = this.nextPage;
    } else {
      url = this.previous;
    }

    this.pageIndex = event.pageIndex;
    this.getPlanets(url);
  }
}
