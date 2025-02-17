import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
export interface PeriodicElement {
  year: string;
  code: string;
  due: string;
  month: string;
  status: string;
  input: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { month: 'May', year: '2009', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2010', code: '', due: '', status: '', input: '', action: '' },
  { month: '6788', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'May', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: '6788', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'May', year: '2020', code: '', due: '', status: '', input: '', action: '' },
  { month: 'Apr', year: '2020', code: '', due: '', status: '', input: '', action: '' }
];
@Component({
  selector: 'app-incomplete-cs-submission',
  templateUrl: './incomplete-cs-submission.component.html',
  styleUrls: ['./incomplete-cs-submission.component.scss']
})
export class IncompleteCsSubmissionComponent implements OnInit {
  pageId="ICCSS";
  isOpen = false;
  displayedColumns: string[] = ['month', 'year', 'code', 'due', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  activeIndex: number;
  constructor(
    public data: DataService
    ) {
    this.data.headerName = {
      screenName: 'Incomplete Cs Submission',
      paths: [
        {
          name: 'Home',
          link: '#',
        },
        {
          name: 'Contribution',
          link: '',
        },
        {
          name: 'Incomplete Cs Submission',
          link: '',
        },
      ],
    };
   }

  ngOnInit(): void {
  }
  active(row) {
    this.activeIndex = row;
  }
}
