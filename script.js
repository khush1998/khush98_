listofemployees = []
selectedId = -1;
currentPage = 1;
PageSizee = 5;


function openFunction(){
    document.getElementById("menu").style.width = "300px"
}

function closeFunction(){
    document.getElementById("menu").style.width = "0px"
}

function openForm(){
    document.getElementById("myForm").style.display = "block"
}

function closeForm(){
    document.getElementById("myForm").style.display = "none"
}


function init(){
    document.getElementById("tablerows").innerHTML=" ";
    if(localStorage.employeesRecord){
        listofemployees = JSON.parse(localStorage.employeesRecord);
        for(i=0;i<5;i++){
            prepareTableCell(i,listofemployees[i].fullname, listofemployees[i].employeeage);
        }
    }
}

function onsubmitPressed(){
    var Name = document.getElementById("fullName").value;
    var Age = document.getElementById("employeeAge").value;

    var empObj = {fullname:Name, employeeage:Age};
    if(selectedId === -1){
        listofemployees.push(empObj);
    }else{
        listofemployees.splice(selectedId,1,empObj);
    }

    localStorage.employeesRecord = JSON.stringify(listofemployees);

    init();
    clearRow();
}

function prepareTableCell(Id,Name,Age){
    var table = document.getElementById("tablerows");
    var newCell = document.createElement('td');
    newCell.textContent = Id;
    newCell.className = "hidden";
    table.appendChild(newCell);
    var row = table.insertRow();
    //insert a hiddent cell or hidden contorl (input type - hidden) for id to be stored
    var NameCell = row.insertCell(0);
    var AgeCell = row.insertCell(1);
    var ActionCell = row.insertCell(2);
    var newCell = row.insertCell(3);

    NameCell.innerHTML = Name;
    AgeCell.innerHTML = Age;
    ActionCell.innerHTML = '<button class="clear" onclick="editRow('+Id+')">Edit</button> <button class="clear" onclick="deleteRow('+Id+')">Delete</button>';
}

function deleteRow(Id){
    if(confirm("Are you Sure?")){
        listofemployees.splice(Id,1);
        localStorage.employeesRecord = JSON.stringify(listofemployees);
        init();
    }
    
}

function editRow(Id){
    selectedId = Id;
    var empObj = listofemployees[Id];
    document.getElementById("fullName").value = empObj.fullname;
    document.getElementById("employeeAge").value = empObj.employeeage;
    document.getElementById("submit").innerHTML = "Update";
    openForm();
}

function clearRow(){
    selectedId = -1;
    document.getElementById("fullName").value = "";
    document.getElementById("employeeAge").value = "";
    document.getElementById("submit").innerHTML = "Submit";
}

function onSearch(){
    let input, filter, table, tr, td, txtValuee;
    input = document.getElementById("employeeSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
    tr = table.getElementsByTagName("tr");

    for(i = 0; i<tr.length;i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            txtValuee = td.textContent || td.innerText;
            if(txtValuee.toUpperCase().indexOf(filter) > - 1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }   
        }
    }
    
}


function firstMove(PageNumber) {
    document.getElementById("tablerows").innerHTML=" ";
    if (PageNumber == 1) {
        currentPage = 1;
    
    }

    let collection = JSON.parse(localStorage.employeesRecord);
    for(i = (PageNumber-1)*PageSizee; i < (PageNumber*PageSizee); i++) {
        prepareTableCell(i, collection[i].fullname, collection[i].employeeage);
    }
}


function nextMove(){
    document.getElementById("tablerows").innerHTML=" ";
    currentPage = currentPage + 1
    firstMove(currentPage);    
}
function previous(){
    document.getElementById("tablerows").innerHTML=" ";
    if(currentPage>1){
        currentPage = currentPage - 1
        firstMove(currentPage);    
    }
}

function lastMove(){
    var arr_json = JSON.parse(localStorage.getItem("employeesRecord"));
    var total_length = arr_json.length;
    console.log(total_length)
    currentPage = Math.floor(total_length/PageSizee);
    console.log(currentPage);
    currentPage = currentPage + 1;
    firstMove(currentPage);
}