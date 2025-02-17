import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, Color } from "ng2-charts";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  sample = "76657000";
  pageId = "DSHBD";
  currencyCode = "FJD";

  dashboard;
  dashboardParams = {
    DSHYears: [],
  };

  monthCode = [
    { short: "Jan", expanded: "January" },
    { short: "Feb", expanded: "February" },
    { short: "Mar", expanded: "March" },
    { short: "Apr", expanded: "April" },
    { short: "May", expanded: "May" },
    { short: "Jun", expanded: "June" },
    { short: "Jul", expanded: "July" },
    { short: "Aug", expanded: "August" },
    { short: "Sep", expanded: "September" },
    { short: "Oct", expanded: "October" },
    { short: "Nov", expanded: "November" },
    { short: "Dec", expanded: "December" },
  ];
  dashboardData = {
    Table: [],
    Table1: [],
    Table2: [],
    Table3: [],
    Table4: [],
    Table5: [],
    Table6: [],
    Table7: [],
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            fontSize: 10,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            fontSize: 10,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];

  public chartColors: Color[] = [
    {
      backgroundColor: "#f58220",
      borderColor: "#f58220",
    },
  ];
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: "Employee Count",
      barThickness: 8,
      barPercentage: 0.5,
    },
  ];

  // second
  public barChartOptionsm: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            fontSize: 10,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            fontSize: 10,
          },
        },
      ],
    },
  };
  public barChartLabelsm: Label[] = [];
  public barChartTypem: ChartType = "bar";
  public barChartLegendm = true;
  public barChartPluginsm = [];

  public chartColorsm: Color[] = [
    {
      backgroundColor: "#f58220",
      borderColor: "#f58220",
    },
  ];
  public barChartDatam: ChartDataSets[] = [
    {
      data: [],
      label: "CS Amount",
      barThickness: 15,
      barPercentage: 0.5,
    },
    {
      data: [],
      label: "Paid Amount",
      barThickness: 15,
      barPercentage: 0.5,
    },
  ];
  constructor(
    public data: DataService,
    public fullspinner: FullSpinnerService
  ) {
    this.dashboard = [];
    this.data.headerName = {
      screenName: 'Dashboard',
      paths: [
        {
          name: 'Home',
          link: '#',
        },
        {
          name: 'Dashboard',
          link: '',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.initialdata();
  }


  initialdata() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dashboard.dashboardinitialdata).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        success.data.forEach((element) => {
          this.dashboardParams[element.key] = element.value;
        });

        console.log(this.dashboardParams);
        this.getDashboardsearch();
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getDashboardsearch() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dashboard.getdashboardsearch).then(
      (success: any) => {
        this.dashboard = success;
        this.fullspinner.empty.next(false);
        console.log(this.dashboard);
        let dasboarddata = success.strDashboardData;
        this.generatedashboard(dasboarddata);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getDashboard() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dashboard.generatedashboard).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        let dasboarddata = success.strDashboardData;
        this.generatedashboard(dasboarddata);
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  generatedashboard(success) {

    this.dashboardData = JSON.parse(success);

    console.log(this.dashboardData);


    if (this.dashboardData.Table6 == null || this.dashboardData.Table6.length == 0) {
      let csData = {
        CS_CODE: '',
        LAST_CONTRIBUTION_AMOUNT: 0.0,
        LAST_CONTRIBUTION_MONTH: '',
        LAST_CONTRIBUTION_YEAR: ''
      };
      this.dashboardData.Table6.push(csData);
    }
    if (this.dashboardData.Table7 == null || this.dashboardData.Table7.length == 0) {
      let payData = {
        LAST_PAYMENT_MONTH: '',
        LAST_PAYMENT_AMOUNT: 0.0,
        LAST_PAYMENT_YEAR: ''
      };

      this.dashboardData.Table7.push(payData);
    }


    //this.GenerateEmployeeSummaryDashboard();

    this.GenerateContributionSummaryDashboard();

    this.fullspinner.empty.next(false);
    this.data.successMesaage(success);
  }

  GenerateEmployeeSummaryDashboard() {

    this.dashboardData.Table5.forEach((element) => {
      const index = this.monthCode
        .map((e) => e.expanded)
        .indexOf(element.MONTH_DESCRIPTION);
      if (index !== -1) {
        const shortCode = this.monthCode[index].short;
        this.barChartLabels.push(shortCode);
        this.barChartData[0].data.push(element.EMPLOYEE_COUNT);
      }
    });
  }

  GenerateContributionSummaryDashboard() {
    this.dashboardData.Table4.forEach((element) => {
      const index = this.monthCode
        .map((e) => e.expanded)
        .indexOf(element.CONTIBUTION_MONTH_DESCRIPTION);
      if (index !== -1) {
        const shortCode = this.monthCode[index].short;
        this.barChartLabelsm.push(shortCode);
        this.barChartDatam[0].data.push(element.TOTAL_CONTRIBUTION_AMOUNT);
        this.barChartDatam[1].data.push(element.TOTAL_PAID_OUT_AMOUNT);
      }
    });
  }

  GetContributionSummaryByYear(year) {
    if(year == null || year == undefined || year == "")
    {
      return;
    }
    this.fullspinner.empty.next(true);
    this.dashboard.intYear = year;
    this.data.postData(AppGlobal.apiPaths.dashboard.getContributionSummarybyyear, this.dashboard).then(
      (success: any) => {
        this.barChartLabelsm=[];
        this.barChartDatam[0].data=[];
        this.barChartDatam[1].data =[];

        this.fullspinner.empty.next(false);
        let data = JSON.parse(success.strDashboardData);
        if (data != null && data.Table4 !=  null) {
          data.Table4.forEach((element) => {
            const index = this.monthCode
              .map((e) => e.expanded)
              .indexOf(element.CONTIBUTION_MONTH_DESCRIPTION);
            if (index !== -1) {
              const shortCode = this.monthCode[index].short;
              this.barChartLabelsm.push(shortCode);
              this.barChartDatam[0].data.push(element.TOTAL_CONTRIBUTION_AMOUNT);
              this.barChartDatam[1].data.push(element.TOTAL_PAID_OUT_AMOUNT);
            }
          });

        }

      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );

  }

  GetEmployeeSummaryByYear(year) {
    if(year == null || year == undefined || year == "")
    {
      return;
    }
    this.fullspinner.empty.next(true);
    this.dashboard.intYear = year;
    this.data.postData(AppGlobal.apiPaths.dashboard.getemployeesummarybyyear, this.dashboard).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.barChartLabels =[];
        this.barChartData[0].data =[];
        let data = JSON.parse(success.strDashboardData);
        if (data != null && data.Table5 != null) {
          data.Table5.forEach((element) => {
            const index = this.monthCode
              .map((e) => e.expanded)
              .indexOf(element.MONTH_DESCRIPTION);
            if (index !== -1) {
              const shortCode = this.monthCode[index].short;
              this.barChartLabels.push(shortCode);
              this.barChartData[0].data.push(element.EMPLOYEE_COUNT);
            }
          });
        }
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );

  }
}
