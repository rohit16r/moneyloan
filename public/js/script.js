 // Mobile Menu Toggle
 const hamburger = document.querySelector('.hamburger');
 const navMenu = document.querySelector('.nav-menu');
 
 hamburger.addEventListener('click', () => {
     navMenu.classList.toggle('active');
 });
 
 // Close menu when clicking on a link
 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', () => {
         navMenu.classList.remove('active');
     });
 });
 
 // Loan Calculator Functionality
 function calculateLoan() {
     const amount = parseFloat(document.getElementById('loan-amount').value);
     const term = parseInt(document.getElementById('loan-term').value);
     const rate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
     
     // Calculate monthly payment
     const x = Math.pow(1 + rate, term);
     const monthly = (amount * x * rate) / (x - 1);
     
     if (isFinite(monthly)) {
         const monthlyPayment = monthly.toFixed(2);
         const totalPayment = (monthly * term).toFixed(2);
         const totalInterest = (monthly * term - amount).toFixed(2);
         
         document.getElementById('monthly-payment').textContent = `₹${monthlyPayment}`;
         document.getElementById('total-payable').textContent = `₹${totalPayment}`;
         document.getElementById('total-interest').textContent = `₹¯${totalInterest}`;
     }
 }
 
 // Add event listeners to calculator inputs
 document.getElementById('loan-amount').addEventListener('input', calculateLoan);
 document.getElementById('loan-term').addEventListener('change', calculateLoan);
 document.getElementById('interest-rate').addEventListener('input', calculateLoan);
 document.getElementById('loan-type').addEventListener('change', calculateLoan);
 
 // Initialize calculator on page load
 calculateLoan();