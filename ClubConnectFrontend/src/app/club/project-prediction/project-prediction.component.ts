import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ClubService } from 'src/app/shared/services/club.service';
import { ActivatedRoute } from '@angular/router';
import * as chartData from "src/app/shared/data/dashboard/default copy";
import { Chart } from 'chart.js';

interface PredictionData {
  clubId: number;
  periodInMonths: number;
  totalFundsRaised: number;
  averageProjectCost: number;
  monthsSustainable: number;
  numberOfProjectsInPeriod: number;
  requiredFunds: number;
  adviceMessage: string;
}
export interface Balance {
  icon: string;
  title: string;
  price: string;
  growth: string;
  colorClass: string;
  show?: boolean;
}

@Component({
  selector: 'app-project-pred',
  templateUrl: './project-prediction.component.html',
  styleUrls: ['./project-prediction.component.scss']
})
export class ProjectPredictionComponent implements OnInit {
  //predictionData: any[];
  clubId: number;
  periodInMonths: number;

  constructor(private clubService: ClubService, private route: ActivatedRoute) {}

  /*ngOnInit() {
    this.clubId = +this.route.snapshot.paramMap.get('id');
    this.periodInMonths = +this.route.snapshot.paramMap.get('periodInMonths');
    this.fetchPredictionData();
    if (this.predictionData) {
      this.generateChart();
    }
  }

  fetchPredictionData() {
    this.clubService.predictProjectsAndFunds(this.clubId, this.periodInMonths)
      .subscribe(
        (data: any) => {
          this.predictionData = data;
          console.log('Prediction Data:', this.predictionData);
        },
        (error: any) => {
          console.error('Error fetching prediction data', error);
        }
      );
  }
  



  @Input() predictionData: any;
  @ViewChild('predictionChartCanvas') predictionChartCanvas: ElementRef;
  
  predictionChart: Chart;

 

  ngAfterViewInit() {
    if (this.predictionData) {
      this.generateChart();
    }
  }

  generateChart() {
    this.predictionChart = new Chart(this.predictionChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Average Project Cost', 'Number of Projects', 'Required Funds'],
        datasets: [{
          label: 'Prediction Data',
          data: [
            this.predictionData.averageProjectCost,
            this.predictionData.numberOfProjectsInPeriod,
            this.predictionData.requiredFunds
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }*/


  @Input() predictionData: PredictionData;
  @ViewChild('predictionChartCanvas') predictionChartCanvas: ElementRef;




  ngOnInit() {
    this.clubId = +this.route.snapshot.paramMap.get('id');
    this.periodInMonths = +this.route.snapshot.paramMap.get('periodInMonths');
    this.clubService.predictProjectsAndFunds(this.clubId,this.periodInMonths)
      .subscribe((data: any) => {
        this.predictionData = data;
        this.generateChart();
      },
      (error: any) => {
        console.error('Error fetching prediction data', error);
      });
  }

  generateChart() {
    if (!this.predictionData) {
      return;
    }

    const ctx = this.predictionChartCanvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Average Project Cost', 'Number of Projects', 'Required Funds'],
        datasets: [{
          label: 'Prediction Data',
          data: [
            this.predictionData.averageProjectCost,
            this.predictionData.numberOfProjectsInPeriod,
            this.predictionData.requiredFunds
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }







  public overallBalance = chartData.overallBalance;


  toggle(item: Balance) {
    item.show = !item.show;
  }

  public balance: Balance[] = [
    {
      icon: "income",
      title: "Income",
      price: "$22,678",
      growth: "+$456",
      colorClass: "success",
    },
    {
      icon: "expense",
      title: "Expense",
      price: "$12,057",
      growth: "+$256",
      colorClass: "danger",
    },
    {
      icon: "doller-return",
      title: "Cashback",
      price: "8,475",
      growth: "",
      colorClass: "success",
    },
  ];










  public show: boolean = false
 

  /*toggle() {
    this.show = !this.show
  }*/

  public activity = [
    {
      date: "8th March, 2022",
      title: "Updated Product",
      dace: "Quisque a consequat ante sit amet magna...",
      time: "1 day ago",
      primaryDotColor: "primary"
    },
    {
      date: "15th Oct, 2022",
      title: "Tello just like your product",
      dace: "Quisque a consequat ante sit amet magna...",
      time: "Today",
      primaryDotColor: "warning"
    },
    {
      date: "20th Sep, 2022",
      title: "Tello just like your product",
      dace: "Quisque a consequat ante sit amet magna...",
      time: "12:00 PM",
      primaryDotColor: "secondary"
    },
  ]






  
  
}
