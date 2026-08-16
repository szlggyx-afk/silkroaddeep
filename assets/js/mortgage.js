// ===== Mortgage Calculator =====
let paymentChart = null;

function calculateMortgage() {
  const homePrice = parseInput(document.getElementById('homePrice').value);
  const downPayment = parseInput(document.getElementById('downPayment').value);
  const annualRate = parseInput(document.getElementById('interestRate').value);
  const loanTermYears = parseInt(document.getElementById('loanTerm').value);
  const annualTax = parseInput(document.getElementById('propertyTax').value);
  const annualInsurance = parseInput(document.getElementById('homeInsurance').value);

  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = loanTermYears * 12;

  // Principal & Interest (standard amortization formula)
  let piPayment;
  if (monthlyRate === 0) {
    piPayment = loanAmount / numPayments;
  } else {
    piPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  const taxMonthly = annualTax / 12;
  const insMonthly = annualInsurance / 12;

  // PMI: if down payment < 20%
  const downPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  let pmiMonthly = 0;
  if (downPct < 20 && loanAmount > 0) {
    const pmiAnnualRate = 0.0075; // 0.75% average
    pmiMonthly = loanAmount * pmiAnnualRate / 12;
  }

  const totalMonthly = piPayment + taxMonthly + insMonthly + pmiMonthly;
  const totalPaid = piPayment * numPayments;
  const totalInterest = totalPaid - loanAmount;

  // Update display
  document.getElementById('totalMonthly').textContent = formatCurrency(totalMonthly);
  document.getElementById('piMonthly').textContent = formatCurrency(piPayment);
  document.getElementById('taxMonthly').textContent = formatCurrency(taxMonthly);
  document.getElementById('insMonthly').textContent = formatCurrency(insMonthly);
  document.getElementById('pmiMonthly').textContent = pmiMonthly > 0 ? formatCurrency(pmiMonthly) : '$0 (none)';
  document.getElementById('loanAmount').textContent = formatCurrency(loanAmount);
  document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);

  // Update chart
  updateChart(piPayment, taxMonthly, insMonthly, pmiMonthly);

  // Generate amortization table
  generateAmortization(loanAmount, monthlyRate, piPayment, numPayments);
}

function updateChart(pi, tax, ins, pmi) {
  const ctx = document.getElementById('paymentChart').getContext('2d');
  const data = {
    labels: ['Principal & Interest', 'Property Tax', 'Insurance', 'PMI'],
    datasets: [{
      data: [pi, tax, ins, pmi].filter(v => v > 0),
      backgroundColor: ['#1e3a5f', '#f97316', '#16a34a', '#a855f7'],
      borderWidth: 0
    }]
  };
  // Filter labels to match non-zero values
  const allLabels = ['Principal & Interest', 'Property Tax', 'Insurance', 'PMI'];
  const allVals = [pi, tax, ins, pmi];
  data.labels = allLabels.filter((_, i) => allVals[i] > 0);

  if (paymentChart) {
    paymentChart.data = data;
    paymentChart.update();
  } else {
    paymentChart = new Chart(ctx, {
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

function generateAmortization(loanAmount, monthlyRate, piPayment, numPayments) {
  const tbody = document.getElementById('amortBody');
  let balance = loanAmount;
  let html = '';
  const displayLimit = Math.min(numPayments, 360);

  for (let i = 1; i <= displayLimit; i++) {
    const interest = balance * monthlyRate;
    const principal = piPayment - interest;
    balance = Math.max(0, balance - principal);

    html += `<tr>
      <td>${i}</td>
      <td>${formatCurrency(piPayment)}</td>
      <td>${formatCurrency(principal)}</td>
      <td>${formatCurrency(interest)}</td>
      <td>${formatCurrency(balance)}</td>
    </tr>`;
  }
  tbody.innerHTML = html;
}

// Auto-calculate on input
document.addEventListener('DOMContentLoaded', function() {
  const inputs = ['homePrice', 'downPayment', 'interestRate', 'loanTerm', 'propertyTax', 'homeInsurance'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculateMortgage);
      el.addEventListener('change', calculateMortgage);
    }
  });
  calculateMortgage();
});
