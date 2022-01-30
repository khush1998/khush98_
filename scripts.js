listofdep = []
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
    document.getElementById("depForm").style.display = "block"
}

function closeForm(){
    document.getElementById("depForm").style.display = "none"
}


function init(){
    document.getElementById("depRows").innerHTML=" ";
    if(localStorage.depRecord){
        listofdep = JSON.parse(localStorage.depRecord);
        for(i=0;i<5;i++){
            prepareTableCell(i,listofdep[i].depname, listofdep[i].depnumber);
        }
    }
}

function onsubmitPressed(){
    var Name = document.getElementById("depName").value;
    var Number = document.getElementById("depNumber").value;

    var depObj = {depname:Name, depnumber:Number};
    if(selectedId === -1){
        listofdep.push(depObj);
    }else{
        listofdep.splice(selectedId,1,depObj);
    }

    localStorage.depRecord = JSON.stringify(listofdep);

    init();
    clearRow();
}

function prepareTableCell(Id,Name,Number){
    var table = document.getElementById("depRows");
    var newCell = document.createElement('td');
    newCell.textContent = Id;
    newCell.className = "hidden";
    table.appendChild(newCell);
    var row = table.insertRow();
    //insert a hiddent cell or hidden contorl (input type - hidden) for id to be stored
    var NameCell = row.insertCell(0);
    var NumberCell = row.insertCell(1);
    var ActionCell = row.insertCell(2);
    var newCell = row.insertCell(3);

    NameCell.innerHTML = Name;
    NumberCell.innerHTML = Number;
    ActionCell.innerHTML = '<button class="clear" onclick="editRow('+Id+')">Edit</button> <button class="clear" onclick="deleteRow('+Id+')">Delete</button>';
}

function deleteRow(Id){
    if(confirm("Are you Sure?")){
        listofdep.splice(Id,1);
        localStorage.depRecord = JSON.stringify(listofdep);
        init();
    }
    
}

function editRow(Id){
    selectedId = Id;
    var depObj = listofdep[Id];
    document.getElementById("depName").value = depObj.depname;
    document.getElementById("depNumber").value = depObj.depnumber;
    document.getElementById("submits").innerHTML = "Update";
    openForm();
}

function clearRow(){
    selectedId = -1;
    document.getElementById("depName").value = "";
    document.getElementById("depNumber").value = "";
    document.getElementById("submits").innerHTML = "Submit";
}

function onSearch(){
    let input, filter, table, tr, td, txtValuee;
    input = document.getElementById("depSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("depList");
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
    document.getElementById("depRows").innerHTML=" ";
    if (PageNumber == 1) {
        currentPage = 1;
    
    }

    let collection = JSON.parse(localStorage.depRecord);
    for(i = (PageNumber-1)*PageSizee; i < (PageNumber*PageSizee); i++) {
        prepareTableCell(i, collection[i].depname, collection[i].depnumber);
    }
}


function nextMove(){
    document.getElementById("depRows").innerHTML=" ";
    currentPage = currentPage + 1
    firstMove(currentPage);    
}
function previous(){
    document.getElementById("depRows").innerHTML=" ";
    if(currentPage>1){
        currentPage = currentPage - 1
        firstMove(currentPage);    
    }
}

function lastMove(){
    var arr_json = JSON.parse(localStorage.getItem("depRecord"));
    var total_length = arr_json.length;
    console.log(total_length)
    currentPage = Math.floor(total_length/PageSizee);
    console.log(currentPage);
    currentPage = currentPage + 1;
    firstMove(currentPage);
}