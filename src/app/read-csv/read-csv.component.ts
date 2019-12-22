import {Component, Input, OnInit} from '@angular/core';
import * as csv from 'csvtojson';
import {MatTableDataSource} from '@angular/material/table';
import _ from 'lodash';

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.css']
})
export class ReadCsvComponent implements OnInit {
  private contents = [];
  private contentsToDisplay = [];

  @Input()
  config = [];

  dataEmpty = () => _.isEmpty(this.contents) || _.isEmpty(this.config);

  displayedColumns = () => this.config.map(x => x.column);

  constructor() {
  }

  ngOnInit() {
  }

  onFileInput(files: File[]) {
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = () => {
      if (typeof fileReader.result === 'string') {
        csv().fromString(fileReader.result).then(json => {
          this.contents = json;
          this.contentsToDisplay = [].concat(this.contents);
        });
      }
    };
    fileReader.readAsText(files[0]);
  }

  applyFilter(value: string, fieldName: string) {
    if (_.isEmpty(value)) {
      this.contentsToDisplay = this.contents;
    } else {
      this.contentsToDisplay = this.contents.filter(x => x[fieldName] === value);
    }
  }
}
