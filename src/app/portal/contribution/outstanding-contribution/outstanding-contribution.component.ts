import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/service/data.service";
export interface PeriodicElement {
  year: string;
  code: string;
  due: string;
  month: string;
  status: string;
  input: string;
  action: string;
  select: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    month: "May",
    year: "2009",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "Apr",
    year: "2010",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "6788",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "Apr",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "Apr",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "May",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "6788",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "Apr",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "Apr",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "May",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
  {
    month: "Apr",
    year: "2020",
    code: "",
    due: "",
    status: "",
    input: "",
    select: "",
    action: "",
  },
];
@Component({
  selector: "app-outstanding-contribution",
  templateUrl: "./outstanding-contribution.component.html",
  styleUrls: ["./outstanding-contribution.component.scss"],
})
export class OutstandingContributionComponent implements OnInit {
  pageId = "OUTSC";
  isOpen = false;
  activeIndex: number;
  displayedColumns: string[] = [
    "month",
    "year",
    "code",
    "due",
    "status",
    "select",
    "action",
  ];
  dataSource = ELEMENT_DATA;
  constructor(public data: DataService) {}

  ngOnInit(): void {}
  active(row) {
    this.activeIndex = row;
  }
}
