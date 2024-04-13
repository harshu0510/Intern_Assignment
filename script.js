const form = document.getElementById('tax-calculator');
const outputDiv = document.getElementById('output');
const errorIcons = document.querySelectorAll('.error-icon');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let hasErrors = false;

  // Validate gross income, extra income, and deductions
  const numberInputs = form.querySelectorAll('input[type="number"]');
  for (const input of numberInputs) {
    if (isNaN(input.value) || input.value === '') {
      hasErrors = true;
      input.nextElementSibling.style.display = 'block';
    } else {
      input.nextElementSibling.style.display = 'none';
    }
  }

  // Validate age group
  if (form.ageGroup.value === '') {
    hasErrors = true;
    errorIcons[3].style.display = 'block';
  } else {
    errorIcons[3].style.display = 'none';
  }

  if (!hasErrors) {
    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    const extraIncome = parseFloat(document.getElementById('extra-income').value);
    const ageGroup = document.getElementById('ageGroup').value;
    const deductions = parseFloat(document.getElementById('deductions').value);

    let taxRate = 0;

    if (ageGroup === '<40') {
      taxRate = 0.3;
    } else if (ageGroup === '40-60') {
      taxRate = 0.4;
    } else {
      taxRate = 0.1;
    }

    const taxableIncome = grossIncome + extraIncome + parseFloat(ageGroup.slice(1)) - deductions;

    if (taxableIncome > 800000) {
      const taxAmount = (taxableIncome - 800000) * taxRate;

      // Display the calculated tax amount in a modal
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class = container style="background-color: beige; text-align: center;">
        <h1>Tax Calculation Result</h1>
        <h2> Your overall income will be<h2>
        <h4>₹${taxAmount.toFixed(2)}</h4>
        <p>after tax deductions</p>
        <button id="close-modal">Close</button>
        </div>
      `;
      document.body.appendChild(modal);

      const closeModalButton = document.getElementById('close-modal');
      closeModalButton.addEventListener('click', function() {
        modal.remove();
      });
    } else {
      outputDiv.textContent = 'Your income is not taxable.';
    }
  }
});

  $('[data-bs-toggle="tooltip"]').tooltip();

