// Populate order modal
const orderButtons = document.querySelectorAll('.order-btn');
const orderItemName = document.getElementById('orderItemName');
const orderItemPrice = document.getElementById('orderItemPrice');
const inputItem = document.getElementById('inputItem');
const inputPrice = document.getElementById('inputPrice');

orderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.getAttribute('data-item');
    const price = button.getAttribute('data-price');

    orderItemName.textContent = item;
    orderItemPrice.textContent = price;
    inputItem.value = item;
    inputPrice.value = price;

    // Reset feedback and validation styles when modal opens
    const form = document.getElementById('orderForm');
    form.classList.remove('was-validated');
    document.getElementById('orderFeedback').textContent = '';
    form.reset();
  });
});

// Handle order form submit with AJAX
const orderForm = document.getElementById('orderForm');
const orderFeedback = document.getElementById('orderFeedback');

orderForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Bootstrap validation styles
  if (!orderForm.checkValidity()) {
    orderForm.classList.add('was-validated');
    return;
  }

  orderFeedback.textContent = 'Submitting your order...';

  const formData = new FormData(orderForm);

  fetch('order_submit.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.text())
    .then(data => {
      orderFeedback.textContent = data;
      if (data.toLowerCase().includes('thank')) {
        // Success: reset form and close modal after short delay
        setTimeout(() => {
          orderForm.reset();
          orderFeedback.textContent = '';
          // Close modal programmatically
          const modalElement = document.getElementById('orderModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }, 3000);
      }
    })
    .catch(() => {
      orderFeedback.textContent = 'Error submitting order. Please try again later.';
    });
});
