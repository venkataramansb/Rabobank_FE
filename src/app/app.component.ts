import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CSV-Table';
  tableConfig = [
    {column: 'First name', transform: val => val},
    {column: 'Sur name', transform: val => val},
    {column: 'Issue count', transform: val => val},
    {
      column: 'Date of birth',
      transform: (val) => new Date(val).toLocaleDateString()
    }
  ];

}
