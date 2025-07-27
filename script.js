const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people");

const billError = document.getElementById("bill-error");
const peopleError = document.getElementById("people-error");

const inputRadio = document.querySelectorAll("input[type=radio]");

const tipAmountElement = document.getElementById("tip-amount");
const totalPerPersonElement = document.getElementById("person-amount");

function validateNumberInput(input, errorElement) {
  if (input.value === "" || input.value <= 0) {
    errorElement.textContent = "Can't be zero or empty";
    input.classList.add("error");
  } else {
    errorElement.textContent = "";
    input.classList.remove("error");
  }
}

billInput.addEventListener("blur", function () {
  validateNumberInput(this, billError);
});

peopleInput.addEventListener("blur", function () {
  validateNumberInput(this, peopleError);
  calculateTip();
  updateResults();
});

inputRadio.forEach((input) =>
  input.addEventListener("click", () => {
    input.classList.add("checked");
  })
);

function calculateTip() {
  const billValue = parseFloat(billInput?.value ?? 0);
  const peopleValue = parseInt(peopleInput?.value ?? 1);

  const selectedRadio = document.querySelector("input[type=radio]:checked");

  const customTipValue = document.getElementById("custom-tip");
  const tipPercentage = selectedRadio
    ? parseFloat(selectedRadio.value)
    : parseFloat(customTipValue.value);

  const tipAmount = billValue * (tipPercentage / 100);
  const totalAmount = billValue + tipAmount;
  const totalPerPerson = totalAmount / peopleValue;

  return { tipAmount, totalPerPerson };
}

function updateResults() {
  calculateTip();

  const { tipAmount, totalPerPerson } = calculateTip();
  if (!tipAmount || !totalPerPerson) {
    tipAmountElement.textContent = "$0.00";
    totalPerPersonElement.textContent = "$0.00";
    return;
  }
  tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
  totalPerPersonElement.textContent = `$${totalPerPerson.toFixed(2)}`;
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  billError.textContent = "";
  peopleError.textContent = "";
  billInput.classList.remove("error");
  peopleInput.classList.remove("error");
  inputRadio.forEach((input) => {
    input.checked = false;
    input.classList.remove("checked");
  });
  tipAmountElement.textContent = "$0.00";
  totalPerPersonElement.textContent = "$0.00";
});
