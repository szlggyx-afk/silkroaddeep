// ===== Loan Calculator =====
let loanChart = null;

function calculateLoan() {
  const principal = parseInput(document.getElementById('loanAmount').value);
  const annualRate = parseInput(document.getElementById('interestRate').value);
  const numPayments = parseInt(document.getElementById('loanTerm').value);

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = principal / numPayments;
  } else {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const totalRepayment = monthlyPayment * numPayments;
  const totalInterest = totalRepayment - principal;

  document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
  document.getElementById('resultPrincipal').textContent = formatCurrency(principal);
  document.getElementById('resultInterest').textContent = formatCurrency(totalInterest);
  document.getElementById('resultTotal').textContent = formatCurrency(totalRepayment);

  updateChart(principal, totalInterest);
  generateAmortization(principal, monthlyRate, monthlyPayment, numPayments);
}

function updateChart(principal, interest) {
  const ctx = document.getElementById('loanChart').getContext('2d');
  const data = {
    labels: ['Principal', 'Total Interest'],
    datasets: [{
      data: [principal, interest],
      backgroundColor: ['#1e3a5f', '#f97316'],
      borderWidth: 0
    }]
  };
  if (loanChart) {
    loanChart.data = data;
    loanChart.update();
  } else {
    loanChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: function(ctx) {
                return ctx.label + ': ' + formatCurrency(ctx.raw);
              }
            }
          }
        },
        cutout: '55%'
      }
    });
  }
}

function generateAmortization(principal, monthlyRate, monthlyPayment, numPayments) {
  const tbody = document.getElementById('amortBody');
  let balance = principal;
  let html = '';
  const limit = Math.min(numPayments, 120);

  for (let i = 1; i <= limit; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance = Math.max(0, balance - principalPaid);

    html += `<tr>
      <td>${i}</td>
      <td>${formatCurrency(monthlyPayment)}</td>
      <td>${formatCurrency(principalPaid)}</td>
      <td>${formatCurrency(interest)}</td>
      <td>${formatCurrency(balance)}</td>
    </tr>`;
  }
  tbody.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  ['loanAmount', 'interestRate', 'loanTerm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculateLoan);
      el.addEventListener('change', calculateLoan);
    }
  });
  calculateLoan();
});
