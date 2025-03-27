fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
.then(response => response.json())
.then(data => {
    const rates = {};
    data.forEach(currency => {
        rates[currency.Ccy] = parseFloat(currency.Rate);
    });

    document.getElementById('convert').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('input').value);
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;
        
        if (!amount || isNaN(amount)) {
            alert('Iltimos, miqdorni kiriting!');
            return;
        }

        let convertedAmount;
        if (fromCurrency === 'UZS') {
            convertedAmount = amount / rates[toCurrency];
        } else if (toCurrency === 'UZS') {
            convertedAmount = amount * rates[fromCurrency];
        } else {
            convertedAmount = (amount * rates[fromCurrency]) / rates[toCurrency];
        }

        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    });
})
.catch(error => console.error('Xatolik yuz berdi:', error));