import { Component, OnInit } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-workbench",
  templateUrl: "./workbench.component.html",
  styleUrls: ["./workbench.component.scss"]
})
export class WorkbenchComponent implements OnInit {
  public jsonData = [
    {
      Reference: "#0012",
      Category: "boston scientific",
      Manufacturer: "boston scientific1",
      Brand: "ABC",
      "Pkg Qty": 500
    },
    {
      Reference: "#0013",
      Category: "boston scientific",
      Manufacturer: "boston scientific",
      Brand: "ABC",
      "Pkg Qty": 600
    },
    {
      Reference: "#0014",
      Category: "boston scientific",
      Manufacturer: "boston scientific",
      Brand: "ABC",
      "Pkg Qty": 700
    },
    {
      Reference: "#0015",
      Category: "boston scientific",
      Manufacturer: "boston scientific",
      Brand: "ABCD",
      "Pkg Qty": 300
    }
  ];
  public editable = ["#0012Category", "#0013Reference"];
  public keys = Object.keys;
  public ColumnSelectionData = new SelectionModel<any>(true, []);
  public contractData;
  public TableHeaderName;
  public JsonColumn;
  public Opendropdown;
  public filteredJson;
  public sortFilter = false; // Activate Sorting On Click
  public tempSort;
  public pushedData = this.jsonData;
  constructor() {}

  ngOnInit() {
    this.ExtractDifferentColumn();
    this.dropDownClose();
    setTimeout(() => {
      // this.stateEditable();
    }, 2000);
  }

  public ExtractDifferentColumn() {
    this.contractData = [];
    this.JsonColumn = {};
    this.contractData = this.jsonData;
    this.TableHeaderName = Object.keys(this.jsonData[0]);
    this.TableHeaderName.map(element => {
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
    if (this.sortFilter === false) {
      this.tempSort = this.jsonData;
      this.tempSort.sort(this.GetSortOrder(column));
      this.contractData = this.tempSort;
      this.jsonData = this.tempSort;
      this.sortFilter = true;
    } else {
      this.tempSort = this.jsonData;
      this.tempSort.reverse(this.GetSortOrder(column));
      this.contractData = this.tempSort;
      this.jsonData = this.tempSort;
      this.sortFilter = false;
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
  public ApplyFilter() {
    this.filteredJson = [];
    let originalData = this.jsonData;
    let FilterData = this.ColumnSelectionData.selected;
    if (this.ColumnSelectionData.selected.length > 0) {
      var uniqueAllFilterColumns = new Set();
      FilterData.map(element => {
        let splitted = element.split("*");
        uniqueAllFilterColumns.add(splitted[0]);
      });
      uniqueAllFilterColumns.forEach(ele => {
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
        // this.stateEditable();
      }, 2000);
    } else {
      this.pushedData = this.jsonData;
      setTimeout(() => {
        // this.stateEditable();
      }, 2000);
    }
  }

  public resetSelectedFilter(columnName) {
    let Selected = this.ColumnSelectionData.selected;
    Selected.map(sel => {
      let data = sel.split("*");
      if (data[0] === columnName) {
        this.ColumnSelectionData.deselect(sel);
      }
    });
    this.ApplyFilter();
  }

  public stateEditable() {
    if (this.editable.length > 0) {
      this.editable.map(edit => {
        console.log(edit);
        document.getElementById(edit).setAttribute("contenteditable", "true");
        document.getElementById(edit).setAttribute("class", "editableCell");
      });
    }
  }
}
