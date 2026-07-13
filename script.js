// Switch between tabs
function switchTab(tabId) {
    // Hide all cards
    document.querySelectorAll('.calc-card').forEach(card => card.classList.add('hidden'));
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    // Set active button
    const btnIndex = { 'percent-of': 0, 'what-percent': 1, 'percent-change': 2, 'discount': 3 };
    document.querySelectorAll('.tab-btn')[btnIndex[tabId]].classList.add('active');
}

// ---- Tab 1: What is X% of Y ----
function calcPercentOf() {
    clearResults();
    const percent = parseFloat(document.getElementById('po-percent').value);
    const number = parseFloat(document.getElementById('po-number').value);

    if (isNaN(percent) || isNaN(number)) {
        showError('err-po', 'Please enter both values');
        return;
    }
    if (percent < 0) {
        showError('err-po', 'Percentage cannot be negative');
        return;
    }

    const result = (percent / 100) * number;
    const complement = number - result;

    document.getElementById('res-percent-of').innerHTML = `
        <div class="result-main">
            <div class="result-label">${percent}% of ${formatNum(number)} is</div>
            <div class="result-value">${formatNum(result)}</div>
        </div>
        <div class="result-details">
            <div class="result-row"><span>Calculation</span><span>(${percent} ÷ 100) × ${formatNum(number)}</span></div>
            <div class="result-row"><span>Result</span><span>${formatNum(result)}</span></div>
            <div class="result-row"><span>Remainder (${100 - percent}%)</span><span>${formatNum(complement)}</span></div>
        </div>
    `;
}

// ---- Tab 2: X is what % of Y ----
function calcWhatPercent() {
    clearResults();
    const value = parseFloat(document.getElementById('wp-value').value);
    const total = parseFloat(document.getElementById('wp-total').value);

    if (isNaN(value) || isNaN(total)) {
        showError('err-wp', 'Please enter both values');
        return;
    }
    if (total === 0) {
        showError('err-wp', 'Total cannot be zero');
        return;
    }

    const result = (value / total) * 100;
    const remaining = 100 - result;

    document.getElementById('res-what-percent').innerHTML = `
        <div class="result-main">
            <div class="result-label">${formatNum(value)} is what % of ${formatNum(total)}?</div>
            <div class="result-value">${formatNum(result)}<span style="font-size:28px">%</span></div>
        </div>
        <div class="result-details">
            <div class="result-row"><span>Calculation</span><span>(${formatNum(value)} ÷ ${formatNum(total)}) × 100</span></div>
            <div class="result-row"><span>Result</span><span>${formatNum(result)}%</span></div>
            <div class="result-row"><span>Remaining</span><span>${formatNum(remaining)}%</span></div>
        </div>
    `;
}

// ---- Tab 3: Percentage Change ----
function calcPercentChange() {
    clearResults();
    const original = parseFloat(document.getElementById('pc-original').value);
    const newVal = parseFloat(document.getElementById('pc-new').value);

    if (isNaN(original) || isNaN(newVal)) {
        showError('err-pc', 'Please enter both values');
        return;
    }
    if (original === 0) {
        showError('err-pc', 'Original value cannot be zero');
        return;
    }

    const change = newVal - original;
    const percentChange = (change / Math.abs(original)) * 100;
    const isIncrease = change >= 0;
    const label = isIncrease ? 'Increase' : 'Decrease';
    const sign = isIncrease ? '+' : '';
    const color = isIncrease ? '#27ae60' : '#e74c3c';

    document.getElementById('res-percent-change').innerHTML = `
        <div class="result-main" style="background: ${isIncrease ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'}">
            <div class="result-label">Percentage ${label}</div>
            <div class="result-value">${sign}${formatNum(percentChange)}<span style="font-size:28px">%</span></div>
        </div>
        <div class="result-details">
            <div class="result-row"><span>Original Value</span><span>${formatNum(original)}</span></div>
            <div class="result-row"><span>New Value</span><span>${formatNum(newVal)}</span></div>
            <div class="result-row"><span>Absolute Change</span><span>${sign}${formatNum(change)}</span></div>
            <div class="result-row"><span>% Change</span><span style="color:${color}; font-weight:800">${sign}${formatNum(percentChange)}%</span></div>
        </div>
    `;
}

// ---- Tab 4: Discount Calculator ----
function calcDiscount() {
    clearResults();
    const price = parseFloat(document.getElementById('dc-price').value);
    const discount = parseFloat(document.getElementById('dc-discount').value);

    if (isNaN(price) || isNaN(discount)) {
        showError('err-dc', 'Please enter both values');
        return;
    }
    if (price < 0) {
        showError('err-dc', 'Price cannot be negative');
        return;
    }
    if (discount < 0 || discount > 100) {
        showError('err-dc', 'Discount must be between 0 and 100');
        return;
    }

    const savedAmount = (price * discount) / 100;
    const finalPrice = price - savedAmount;

    document.getElementById('res-discount').innerHTML = `
        <div class="result-main" style="background: linear-gradient(135deg, #f093fb, #f5576c)">
            <div class="result-label">You Pay</div>
            <div class="result-value">$${formatNum(finalPrice)}</div>
            <div class="result-unit">Save $${formatNum(savedAmount)} (${discount}% off)</div>
        </div>
        <div class="result-details">
            <div class="result-row"><span>Original Price</span><span>$${formatNum(price)}</span></div>
            <div class="result-row"><span>Discount (${discount}%)</span><span>-$${formatNum(savedAmount)}</span></div>
            <div class="result-row"><span>Final Price</span><span style="color:#27ae60; font-weight:800">$${formatNum(finalPrice)}</span></div>
            <div class="result-row"><span>You Save</span><span style="color:#e74c3c; font-weight:800">$${formatNum(savedAmount)}</span></div>
        </div>
    `;
}

// ---- Load Example ----
function loadExample(type, a, b) {
    if (type === 'po') {
        switchTab('percent-of');
        document.getElementById('po-percent').value = a;
        document.getElementById('po-number').value = b;
        calcPercentOf();
    } else if (type === 'wp') {
        switchTab('what-percent');
        document.getElementById('wp-value').value = a;
        document.getElementById('wp-total').value = b;
        calcWhatPercent();
    } else if (type === 'pc') {
        switchTab('percent-change');
        document.getElementById('pc-original').value = a;
        document.getElementById('pc-new').value = b;
        calcPercentChange();
    } else if (type === 'dc') {
        switchTab('discount');
        document.getElementById('dc-price').value = a;
        document.getElementById('dc-discount').value = b;
        calcDiscount();
    }
}

// ---- Helpers ----
function formatNum(n) {
    const rounded = Math.round(n * 10000) / 10000;
    return parseFloat(rounded.toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 4 });
}

function showError(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.classList.add('show');
}

function clearResults() {
    document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('show'));
}

// Enter key support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const active = document.querySelector('.calc-card:not(.hidden)');
        if (active) active.querySelector('.calculate-btn').click();
    }
});
