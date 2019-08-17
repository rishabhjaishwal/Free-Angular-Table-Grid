# Free-Angular-Table-Grid
Perform Filter, Sorting, Suggestion, Editable cell on Each Column of Table Grid  

# Requirements
1. Bootstrap 4 required to be installed
2. Angular Material Mat-checkbox should be imported at the time of Component to be used 

# How to Use
1. Just Provide Json Data it will handle all other thing for you.
2. Go through .ts file to know the jsonData global variable 
3. Please install bootstrap 4 for UI purpose

# Variable Info
1. @Output() suggestionString = new EventEmitter<string>();

2. @Input() public jsonData:any;
## editable Array is used to enable table cell for Editing
3. @Input() public editable:any;
## Suggestion Array is used for autoComplete Suggestions
4. @Input() public Suggestion:any;
## noSort Variable is used for disable Sorting on Specific Column
5. @Input() public noSort:any;
## noFilter is used for disable Filter on Specific Column
6. @Input() public noFilter:any;
## Primary key for distinguishing every row
7. @Input() public PrimaryKey:any;

## Supported to Angular version 2.0 and above

![Table Grid](https://raw.githubusercontent.com/rishabhjaishwal/Free-Angular-Table-Grid/master/Screenshot%20from%202019-07-02%2022-54-21.png
)

![Table Grid](https://raw.githubusercontent.com/rishabhjaishwal/Free-Angular-Table-Grid/master/Screenshot%20from%202019-07-02%2022-54-33.png)

#### If you need help ping me on my Email Id which is provided given below
## Developed by:- Rishabh Jaishwal
### Email Id:- rishabhjaishwal7@gmail.com
