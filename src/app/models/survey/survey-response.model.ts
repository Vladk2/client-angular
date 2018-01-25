import {Question} from './question.model';

export class SurveyResponse {
  public question: Question;
  public data: any;
  public chartType;
  public values: any;

  constructor() {
  }

  setData(qType) {
    if (qType === 'BOOL') {
      this.chartType = 'pie';
      this.data = {
        labels: ['Da', 'Ne'],
        datasets: [
          {
            data: [this.values['yes'], this.values['no']],
            backgroundColor: [
              '#FF6384',
              '#36A2EB'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB'
            ]
          }
        ]
      };
    } else if (qType === 'GRADE') {
      this.chartType = 'doughnut';
      this.data = {
        labels: ['5', '4', '3', '2', '1'],
        datasets: [
          {
            data: [this.values['a'], this.values['b'], this.values['c'], this.values['d'], this.values['f']],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF5733',
              '#099311'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF5733',
              '#099311'
            ]
          }]
      };
    } else {
      this.data = this.values;
    }
  }

}
