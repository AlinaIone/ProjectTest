const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const table = document.querySelector(".table");

// Submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = form[0].value;
  const lastName = form[1].value;
  const email = form[2].value;
  const value = form[3].value;

  if (firstName !== "" && lastName !== "" && email !== "" && value > 0) {
    const trElement = document.createElement("tr");
    const tdFirstname = document.createElement("td");
    const tdLastname = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdValue = document.createElement("td");
    tdFirstname.innerHTML = firstName;
    tdLastname.innerHTML = lastName;
    tdEmail.innerHTML = email;
    tdValue.innerHTML = value;

    trElement.append(tdFirstname, tdLastname, tdEmail, tdValue);
    tbody.appendChild(trElement);
  } else {
    const error = document.querySelector("#error");
    error.style.color = "red";
    error.innerHTML = " Please complete all fields!";
  }
  form.reset();
});

// Value input only positive nr
form[3].addEventListener("input", (e) => {
  const valueError = document.querySelector("#value-error");
  valueError.style.color = "red";
  e.target.value < 1
    ? (valueError.innerHTML = "Positive numbers only")
    : (valueError.innerHTML = "");
});

// Clear fields onclick - first field
form[0].addEventListener("click", () => {
  form.reset();
});

// Sort Button
const sortValueBtn = document.querySelector(".sort");

sortValueBtn.addEventListener("click", () => {
  sortTableByValue(table, 4);
});

function sortTableByValue(table, column) {
  const tBodySort = table.tBodies[0];
  const rows = Array.from(tBodySort.querySelectorAll("tr"));
  console.log(rows);
  const sortRows = rows.sort((a, b) => {
    const aCloText = a
      .querySelector(`td:nth-child(${column})`)
      .textContent.trim();
    const bCloText = b
      .querySelector(`td:nth-child(${column})`)
      .textContent.trim();

    return aCloText - bCloText;
  });

  while (tBodySort.firstChild) {
    tBodySort.removeChild(tBodySort.firstChild);
  }
  tBodySort.append(...sortRows);
}

// Average Button
const tableAverage = document.querySelector(".table-average");
const averageBtn = document.querySelector(".average");
averageBtn.addEventListener("click", () => {
  let sum = 0;
  const rowCount = table.rows.length - 1;

  for (let i = 1; i < table.rows.length; i++) {
    sum = sum + parseInt(table.rows[i].cells[3].innerHTML);
  }

  const tbodyEl = document.createElement("tbody");
  const trEl = document.createElement("tr");
  const tdID = document.createElement("td");
  const tdResult = document.createElement("td");
  tdID.innerHTML = tableAverage.rows.length;
  tdResult.innerHTML = parseInt(sum / rowCount);

  trEl.append(tdID, tdResult);
  tbodyEl.appendChild(trEl);
  tableAverage.appendChild(tbodyEl);
});

// Highlight Button
const highlightBtn = document.querySelector(".highlight");
highlightBtn.addEventListener("click", () => {
  let rows = table.tBodies[0].querySelectorAll("tr");
  let rowsAverage = tableAverage.tBodies[0].querySelectorAll("tr");
  let columnAverage = rowsAverage[0].querySelectorAll("td");
  let average = columnAverage[1].innerHTML;

  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[3].innerHTML < Number(average) &&
      (rows[i].style.backgroundColor = "red");
  }
});
