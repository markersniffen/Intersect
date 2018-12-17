var add = document.getElementByName("add");

function add() {
  var l = document.getElementById("list");
  console.log("TEST");
  var row = l.insertRow(1);
  row.className = "body";
  var c1 = row.insertCell(0);
  var c2 = row.insertCell(1);
  var c3 = row.insertCell(2);
  var c4 = row.insertCell(3);
  var c5 = row.insertCell(4);
  var c6 = row.insertCell(5);

  var b1 = document.createElement("button");
  c4.appendChild(b1);

  c1.innerHTML = "One";
  c2.innerHTML = "Two";


}