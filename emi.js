const cars = {
    toyota: [
        { model: 'Camry', price: 2500000, details: 'Luxury Sedan with premium features' },
        { model: 'Corolla', price: 2000000, details: 'Compact Sedan with great fuel efficiency' },
        { model: 'Prius', price: 3000000, details: 'Hybrid car with excellent mileage' }
    ],
    honda: [
        { model: 'Civic', price: 2200000, details: 'Stylish sedan with a sporty feel' },
        { model: 'Accord', price: 2800000, details: 'Spacious and comfortable sedan' },
        { model: 'Fit', price: 1500000, details: 'Compact car with a small footprint' }
    ],
    ford: [
        { model: 'Fiesta', price: 1600000, details: 'Compact car with a lively performance' },
        { model: 'Focus', price: 1900000, details: 'Practical car with advanced features' },
        { model: 'Mustang', price: 4000000, details: 'Iconic sports car with powerful performance' }
    ]
};

document.getElementById('brand').addEventListener('change', function() {
    const brand = this.value;
    const models = cars[brand] || [];
    const modelSelect = document.getElementById('model');
    modelSelect.innerHTML = '<option value="">--Select Model--</option>';
    models.forEach(car => {
        const option = document.createElement('option');
        option.value = car.model.toLowerCase();
        option.textContent = car.model;
        modelSelect.appendChild(option);
    });
    document.getElementById('modelDetails').innerHTML = '';
});

document.getElementById('model').addEventListener('change', function() {
    const brand = document.getElementById('brand').value;
    const selectedModel = this.value;
    const car = (cars[brand] || []).find(car => car.model.toLowerCase() === selectedModel);
    if (car) {
        document.getElementById('modelDetails').innerHTML = `
            <p>Price: ₹${car.price.toLocaleString()}</p>
            <p>Details: ${car.details}</p>
        `;
        document.getElementById('downPayment').max = car.price;
        document.getElementById('downPaymentValue').textContent = `₹${car.price * 0.2}`;
        document.getElementById('downPayment').value = car.price * 0.2;
    } else {
        document.getElementById('modelDetails').innerHTML = '';
    }
});

document.getElementById('downPayment').addEventListener('input', function() {
    document.getElementById('downPaymentValue').textContent = `₹${parseFloat(this.value).toLocaleString()}`;
});

document.getElementById('interestRate').addEventListener('input', function() {
    document.getElementById('interestRateValue').textContent = `${parseFloat(this.value).toFixed(2)}%`;
});

document.getElementById('termPeriod').addEventListener('input', function() {
    document.getElementById('termPeriodValue').textContent = this.value;
});

function calculateEMI() {
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const termPeriod = parseInt(document.getElementById('termPeriod').value);
    const modelSelect = document.getElementById('model');
    const brand = document.getElementById('brand').value;
    const selectedModel = modelSelect.value;
    const car = (cars[brand] || []).find(car => car.model.toLowerCase() === selectedModel);
    
    if (!car || isNaN(downPayment) || isNaN(interestRate) || isNaN(termPeriod)) {
        alert('Please fill out all fields correctly.');
        return;
    }
    
    const principal = car.price - downPayment;
    const emi = (principal * interestRate * Math.pow(1 + interestRate, termPeriod)) / (Math.pow(1 + interestRate, termPeriod) - 1);
    const totalAmount = emi * termPeriod;
    const totalInterest = totalAmount - principal;

    document.getElementById('output').innerHTML = `
        <h3>EMI Details</h3>
        <p>Car Model: ${car.model}</p>
        <p>Down Payment: ₹${downPayment.toFixed(2)}</p>
        <p>Annual Interest Rate: ${(interestRate * 12 * 100).toFixed(2)}%</p>
        <p>Term Period: ${termPeriod} months</p>
        <p>Monthly EMI: ₹${emi.toFixed(2)}</p>
        <p>Total Amount Payable: ₹${totalAmount.toFixed(2)}</p>
        <p>Total Interest Payment: ₹${totalInterest.toFixed(2)}</p>
    `;
}
