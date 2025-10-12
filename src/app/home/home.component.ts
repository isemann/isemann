import { AfterViewInit, Component, ViewChild, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IsemannService } from '../isemann.service'
import { TemElement, HumElement, PreElement, BatElement } from '../isemann.interface' // Import the Log interface
import { DatePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import { timer } from 'rxjs';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, MatTableModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  dataSourceTem: MatTableDataSource<TemElement> = new MatTableDataSource<TemElement>([]);
  displayedColumns: string[] = ['time', 'messurement', 'device', 'value'];
  constructor(private isemannService: IsemannService) { }

  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private ISEDEV001: any[] = [];
  private ISEDEV002: any[] = [];
  private ISEDEV003: any[] = [];
  private ISEDEV004: any[] = [];
  private ISEDEV005: any[] = [];
  private WIDEV001: any[] = [];
  private WIDEV002: any[] = [];


  ngOnInit(): void {
    this.isemannService.getTem().subscribe((response) => {
      this.chartInfo = response;
      if (this.chartInfo != null) {

        for (let i = 0; i < this.chartInfo.length; i++) {

          switch (this.chartInfo[i].device) {
            case 'ISE-DEV-001':
              this.ISEDEV001.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            case 'ISE-DEV-002':
              this.ISEDEV002.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            case 'ISE-DEV-003':
              this.ISEDEV003.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            case 'WI-DEV-001':
              this.WIDEV001.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            case 'WI-DEV-002':
              this.WIDEV002.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            case 'ISE-DEV-004':
              this.ISEDEV004.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            case 'ISE-DEV-005':
              this.ISEDEV005.push(this.chartInfo[i].value);
              this.labeldata.push(this.chartInfo[i].time);
              break;

            default:
              break;
          }

        }
        this.createChart(this.ISEDEV001, this.ISEDEV002, this.ISEDEV003, this.ISEDEV004, this.ISEDEV005, this.WIDEV001, this.WIDEV002, this.labeldata);
        Chart.register(Colors);
      }
    });
  }

  createChart(data1: any, data2: any, data3: any, data4: any, data5: any, data6: any, data7: any, labeldata: any) {
    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart
      data: {
        labels: labeldata, 
        datasets: [
          {
            label: 'Windmill (OE3BIA-2)',
            data: data1,
            yAxisID: 'value',
          },
          {
            label: 'Kuhberg (OE3XKU)',
            data: data2,
            yAxisID: 'value',
          },
          {
            label: 'Kleine Tulln (OE3BIA-3)',
            data: data3,
            yAxisID: 'value',
          },
          {
            label: 'Paris 15e (F4VVO-1)',
            data: data4,
            yAxisID: 'value',
          },
          {
            label: 'ESA HQ (F4VVO-3)',
            data: data5,
            yAxisID: 'value',
          },
          {
            label: 'Bregenzer Ache (OE9RWV-1)',
            data: data6,
            yAxisID: 'value',
          },
          {
            label: 'Riedenburg (OE9RWV-2)',
            data: data7,
            yAxisID: 'value',
          }
        ]
      },
      options: {
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'value'
        },
        scales: {
          xAxis: {
            // The axis for this scale is determined from the first letter of the id as `'x'`
            // It is recommended to specify `position` and / or `axis` explicitly.
            type: 'time',
            reverse: true,
            display: false,
            
          }
        },
        
        aspectRatio: 3,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'LoRa Wireless Sennsor - Temperature'
          }
        }
      },
    });
  }

  ngAfterViewInit(): void {
    const source = timer(2000, 1000);
    source.subscribe(val => this.refresh());
  }

  refresh() {
    this.isemannService.getTem().subscribe((data: TemElement[]) => {
      this.chartInfo.data = data;
    });

  }
}
