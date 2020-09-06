import { Component, OnInit } from '@angular/core';
import { GlobalState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/model/ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalI = 0;
  totalE = 0;
  ing = 0;
  eg = 0;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: MultiDataSet = [[350, 450]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<GlobalState>) { }

  ngOnInit() {
    this.store.select('incomeOutcome').subscribe(({items}) => this.showSum(items));
  }

  showSum(items: IngresoEgreso[]){
    for (let item of items){
      if(item.tipo === 'egreso'){
        this.totalE += item.monto;
        this.eg++;
      }
      if(item.tipo === 'ingreso'){
        this.totalI += item.monto;
        this.ing++;
      }
    }
    this.doughnutChartData = [[this.totalI, this.totalE]];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
