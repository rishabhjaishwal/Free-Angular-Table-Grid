import { Component, OnInit ,ViewChild ,Input, OnChanges, Output, EventEmitter} from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { ScrollingModule,CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-workbench-table',
  templateUrl: './workbench-table.component.html',
  styleUrls: ['./workbench-table.component.scss']
})
export class WorkbenchTableComponent implements OnInit,OnChanges {
  @ViewChild(CdkVirtualScrollViewport)
  public viewPort: CdkVirtualScrollViewport;

  @Output() suggestionString = new EventEmitter<string>();

@Input() public jsonData:any;
// editable Array is used to enable table cell for Editing
@Input() public editable:any;
// Suggestion Array is used for autoComplete Suggestions
@Input() public Suggestion:any;
// noSort Variable is used for disable Sorting on Specific Column
@Input() public noSort:any;
// noFilter is used for disable Filter on Specific Column
@Input() public noFilter:any;
// keys is used for internal purpose for extracting Column name from JSON data
  public keys = Object.keys;
// Primary key for distinguishing every row
@Input() public PrimaryKey:any;

// Internal uses variables ---Declaration Start
  public ColumnSelectionData = new SelectionModel<any>(true, []);
  public contractData;
  public TableHeaderName;
  public JsonColumn;
  public Opendropdown;
  public filteredJson;
  public sortStatus = {};
  public filterStatus = {};
  public ChangeReflectedRequired = false;
  public sortFilter = false; // Activate Sorting On Click
  public tempSort;
  public pushedData = this.jsonData;
  public previousValue = '122222';
// Internal uses variables ---Declaration End
  constructor() { }
  ngOnChanges() {
    this.pushedData = this.jsonData;
  }
  ngOnInit() {
    this.ExtractDifferentColumn();
    this.dropDownClose();
    setTimeout(() => {
      this.stateEditable();
    }, 1500);
  }

  public ExtractDifferentColumn() {
    this.contractData = [];
    this.JsonColumn = {};
    this.contractData = this.jsonData;
    this.TableHeaderName = Object.keys(this.jsonData[0]);
    this.TableHeaderName.map(element => {
      this.sortStatus[element] = false;
      this.filterStatus[element] = false;
      this.JsonColumn[element] = [];
    });
    this.contractData.map(data => {
      this.TableHeaderName.map(ele => {
        if (this.JsonColumn[ele].includes(data[ele])) {
        } else {
          this.JsonColumn[ele].push(data[ele]);
        }
      });
    });
  }

  public dropDownOpen(id) {
    if (this.ChangeReflectedRequired === true) {
    this.ExtractDifferentColumn();
    this.ChangeReflectedRequired = false;
    }
    if (this.Opendropdown != null && this.Opendropdown !== id) {
      document.getElementById(this.Opendropdown).style.display = "none";
    }
    if (document.getElementById(id).style.display === "block") {
      document.getElementById(id).style.display = "none";
    } else {
      document.getElementById(id).style.display = "block";
    }
    this.Opendropdown = id;
  }

  public dropDownClose() {
    document.addEventListener("click", function() {
      if (
        !(event.target as HTMLInputElement).matches(".dropdown-list") &&
        !(event.target as HTMLInputElement).matches(".fas")
      ) {
        let sharedowns = document.getElementsByClassName("filter_popup");
        let i;
        for (i = 0; i < sharedowns.length; i++) {
          (sharedowns[i] as HTMLInputElement).style.display = "none";
        }
      }
    });
  }


  // Sort Method ---------------Start
  public sort(column): void {
    console.log("--------column---", column);
    if (this.sortStatus[column] === false) {
      this.tempSort = this.pushedData;
      this.tempSort.sort(this.GetSortOrder(column));
      this.contractData = this.tempSort;
      // this.jsonData = this.tempSort;
      // this.pushedData = [];
      setTimeout(() => {
      this.pushedData = this.tempSort;
      }, 100);
      this.sortStatus[column] = true;
    } else {
      this.tempSort = this.pushedData;
      this.tempSort.reverse(this.GetSortOrder(column));
      this.contractData = this.tempSort;
      // this.jsonData = this.tempSort;
      // this.pushedData = [];
      setTimeout(() => {
        this.pushedData = this.tempSort;
        }, 100);
      this.sortStatus[column] = false;
    }
  }

  // Sort Method ---------------End

  public GetSortOrder(prop) {
    return function(a, b) {
      if (a[prop] === "" || a[prop] == null) {
        return -1;
      }
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  // Filter Function start
  public  ApplyFilter() {
    this.filteredJson = [];
    let originalData =  this.jsonData;
    let FilterData = this.ColumnSelectionData.selected;
    if (this.ColumnSelectionData.selected.length > 0) {
      var uniqueAllFilterColumns = new Set();
      FilterData.map( element => {
        let splitted = element.split("*");
        if (this.filterStatus[splitted[0]] === false) {
          this.filterStatus[splitted[0]] = true;
        }
        uniqueAllFilterColumns.add(splitted[0]);
      });
      uniqueAllFilterColumns.forEach( ele => {
        FilterData.map(fdata => {
          let splitted = fdata.split("*");
          originalData.map(odata => {
            if (
              ele === splitted[0] &&
              splitted[1] === odata[splitted[0]].toString()
            ) {
              this.filteredJson.push(odata);
            }
          });
        });
        originalData = this.filteredJson;
        this.filteredJson = [];
      });
      this.pushedData = originalData;
      setTimeout(() => {
        this.stateEditable();
      }, 2000);
    } else {
      this.pushedData = this.jsonData;
      setTimeout(() => {
        this.stateEditable();
      }, 2000);
    }
  }

  public resetSelectedFilter(columnName) {
    let Selected = this.ColumnSelectionData.selected;
    Selected.map(sel => {
      let data = sel.split("*");
      this.filterStatus[columnName] = false;
      if (data[0] === columnName) {
        this.ColumnSelectionData.deselect(sel);
      }
    });
    this.ApplyFilter();
  }

  public stateEditable() {
    if (this.editable.length > 0) {
      for (let i = 0; i < this.editable.length; i++) {
        console.log(this.editable[i]);
        let parentHeight = document.getElementById(this.editable[i]).offsetHeight;
        document.getElementById(this.editable[i] + 'span').style.lineHeight = parentHeight.toString()+'px';
        document
          .getElementById(this.editable[i] + 'span')
          .setAttribute("contenteditable", "true");
        document
          .getElementById(this.editable[i])
          .setAttribute("class", "editableCell resetpadding");
      }
    }
  }

// AutoComplete dialog
public enableAutoComplete(event,autocompletebox_Id, editabebox_Id) {
  // Extracting the Editable Field Value for autocomplete suggestion
  this.suggestionString.emit(document.getElementById(editabebox_Id + 'span').innerText);
  if (event.key === "Enter") {
    for ( let i = 0; i < this.editable.length; i++) {
      if (this.editable[i] === editabebox_Id) {
        this.editable.splice(i, 1);
        document.getElementById(editabebox_Id + 'span').innerText =
        document.getElementById(editabebox_Id + 'span').
        innerText.substring(0, document.getElementById(editabebox_Id + 'span').innerText.length - 1 );
      }
    }
    if (document.getElementById(autocompletebox_Id) !== null) {
    document.getElementById(autocompletebox_Id).style.display = 'none';
    document.getElementById(editabebox_Id + 'span').setAttribute("contenteditable", "false");
    document.getElementById(editabebox_Id).setAttribute("class", "nothing resetpaddinghide");
    }
  } else {
  console.log(event.path[0].id );
  let value = document.getElementById(event.path[0].id).innerText;

  let width = document.getElementById(event.path[0].id).offsetWidth;
  width -= 3;
  console.log(value.length, width);
  if (value !== '' && document.getElementById(autocompletebox_Id) !== null) {
    document.getElementById(autocompletebox_Id).style.width = width.toString() + 'px';
    // document.getElementById(autocompletebox_Id).style.marginLeft = '0px';
    document.getElementById(autocompletebox_Id).style.display = 'block';
    this.previousValue = value;
  } else {
    if (document.getElementById(autocompletebox_Id) !== null) {
    document.getElementById(autocompletebox_Id).style.display = 'none';
    }
  }
}
}

//  Disable autocomplete when blur
public disableAutoComplete(editable_Id,autocompletebox_Id) {
  setTimeout(() => {
    if (document.getElementById(autocompletebox_Id) !== null) {
      document.getElementById(autocompletebox_Id).style.display = "none";
    }
    var data = document.getElementById(editable_Id + "span").innerText;
    this.editedJsonData(
      editable_Id,
      data,
      this.PrimaryKey
    );

  }, 230);
}

public SelectSuggestion(event, editabebox_Id, autocompletebox_Id) {
  let value = document.getElementById(event.path[0].id).innerText;
  let column = editabebox_Id.split("_");
  document.getElementById(editabebox_Id + 'span').innerText = value;
  for ( let i = 0; i < this.editable.length; i++) {
    if (this.editable[i] === editabebox_Id) {
      this.editable.splice(i, 1);
    }
  }
  console.log(autocompletebox_Id,'ddddd')
  if (document.getElementById(autocompletebox_Id) !== null) {
  document.getElementById(autocompletebox_Id).style.display = 'none';
  document.getElementById(editabebox_Id+'span').setAttribute("contenteditable", "false");
  document.getElementById(editabebox_Id).setAttribute("class", "nothing resetpaddinghide");
  }
  this.editedJsonData(editabebox_Id, value, this.PrimaryKey);
}


public editedJsonData(id,value, columnName) {
  let dataPosition = id.split("_");
  console.log(dataPosition)
  this.jsonData.map(row => {
    if (row[columnName].toString() === dataPosition[0].toString()) {
        if (value.substring(value.length - 1 ) === "\n") {
          if (typeof row[dataPosition[1]] === 'number') {
            row[dataPosition[1]] = parseInt(value.substring(0, value.length - 1))
          } else {
            row[dataPosition[1]] = value.substring(0, value.length - 1);
          }
        } else {
          if (typeof row[dataPosition[1]] === 'number') {
          row[dataPosition[1]] = parseInt(value);
          } else {
          row[dataPosition[1]] = value;
          }
        }
    }
  });
  this.ChangeReflectedRequired = true;
  console.log(this.jsonData);
}



public compare(a: number | string, b: number | string, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

}
