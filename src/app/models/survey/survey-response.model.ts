import {Question} from './question.model';

export class SurveyResponse {
  public question: Question;
  public data: any;
  public values: any;

  constructor() {
  }

  setData(qType, values) {
    if (qType === 'BOOL') {
      this.data = {
        labels: ['Da', 'Ne'],
        datasets: [
          {
            data: [values['yes'], values['no']],
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
      this.data = {
        labels: ['5', '4', '3', '2', '1'],
        datasets: [
          {
            data: [values['a'], values['b'], values['c'], values['d'], values['f']],
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
      this.data = values;
    }
  }

}
