document.getElementById('payButton').addEventListener('click', async () => {
  try {
    const response = await fetch('/api/getPaymentAmount');
    const { amount } = await response.json();

    const paymentResponse = await fetch('/api/createPaymentRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });

    const { paymentRequest } = await paymentResponse.json();
    window.location.href = paymentRequest.longurl;
  } catch (error) {
    console.error('Error initiating payment:', error);
  }
});