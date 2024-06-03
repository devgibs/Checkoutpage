const paymentForm = document.getElementById('paymentform');
const cvvInput = document.getElementById('cvc');
const cardNumberInput = document.getElementById('cardNumber');

cvvInput.addEventListener('input', function(event) {
  const cvv = event.target.value;
  event.target.value = cvv.slice(0, 3); // Limit input to 3 characters
});

cardNumberInput.addEventListener('input', function(event) {
  const cardNumber = event.target.value;
  event.target.value = cardNumber.slice(0, 16); // Limit input to 16 characters

  const cardType = detectCardType(cardNumber);
  updateCardTypePlaceholder(cardType);
});

paymentForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const cardNumber = cardNumberInput.value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvc').value;

  if (!isValidCardNumber(cardNumber)) {
    alert('Invalid card number!');
    return;
  }

  if (!isValidExpiryDate(expiryDate)) {
    alert('Invalid expiry date! Must be in format MM/YY.');
    return;
  }

  if (!isValidCVV(cvv)) {
    alert('Invalid CVV! Must be 3 digits.');
    return;
  }

  alert('Payment processed successfully! Card type: ' + detectCardType(cardNumber));
});

function isValidCardNumber(cardNumber) {
  return /^\d{16}$/.test(cardNumber); // Basic validation: 16 digits
}

function isValidExpiryDate(expiryDate) {
  return /^\d{2}\/\d{2}$/.test(expiryDate); // Basic validation: MM/YY format
}

function isValidCVV(cvv) {
  return /^\d{3}$/.test(cvv); // Basic validation: 3 digits
}

function detectCardType(cardNumber) {
  const firstDigit = cardNumber.charAt(0);
  switch (firstDigit) {
    case '4':
      return 'Visa';
    case '5':
      return 'Mastercard';
    case '3':
      return 'American Express';
    default:
      return 'Unknown';
  }
}

function updateCardTypePlaceholder(cardType) {
  cardNumberInput.placeholder = `Card Number (${cardType})`;
}
