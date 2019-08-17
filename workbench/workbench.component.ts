import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-workbench",
  templateUrl: "./workbench.component.html",
  styleUrls: ["./workbench.component.scss"]
})
export class WorkbenchComponent implements OnInit {
  public DataSource = [{
    References: "#0015",
    Category: "boston scientific",
    Manufacturer: "boston scientific",
    Brand: "ABCD",
    "Pkg Qty": 300,
    Flag: false
  },
  {
    References: "#0012",
    Category: "boston scientific",
    Manufacturer: "boston scientific1",
    Brand: "ABC",
    "Pkg Qty": 500,
    Flag: true
  },
  {
    References: "#0013",
    Category: "boston scientific",
    Manufacturer: "boston scientific",
    Brand: "ABC",
    "Pkg Qty": 600,
    Flag: true
  },
  {
    References: "#0014",
    Category: "boston scientific",
    Manufacturer: "boston scientific",
    Brand: "ABC",
    "Pkg Qty": 700,
    Flag: false
  },
  {
    References: "#0015",
    Category: "boston scientific",
    Manufacturer: "boston scientific",
    Brand: "ABC",
    "Pkg Qty": 700,
    Flag: false
  },
  {
    References: "#0016",
    Category: "boston scientific",
    Manufacturer: "boston scientific",
    Brand: "ABC",
    "Pkg Qty": 700,
    Flag: false
  },
  {
    References: "#0017",
    Category: "boston scientific",
    Manufacturer: "boston scientific",
    Brand: "ABC",
    "Pkg Qty": 700,
    Flag: false
  },

  ];

  public editable = ["#0012_Category", "#0013_References", "001_Reference", "003_Brabd"];
  public Suggestion = ["Suggesting you some data..."];
  public noSort = ['Flag'];
  public noFilter = ['Flag'];
  public PrimaryKey = 'References';

  
  constructor() {
  }
  ngOnInit() {
  }

  public suggestion($event) {
    console.log($event);
  }

}
