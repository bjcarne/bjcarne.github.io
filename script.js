// Pricing configuration
const PRICING = {
    adults: 180,
    youth12_18: 150,
    children6_11: 130,
    children3_5: 80,
    children0_2: 0
};

function calculateTotal() {
    // Get attendee counts
    const adults = parseInt(document.getElementById('adults').value) || 0;
    const youth12_18 = parseInt(document.getElementById('youth12-18').value) || 0;
    const children6_11 = parseInt(document.getElementById('children6-11').value) || 0;
    const children3_5 = parseInt(document.getElementById('children3-5').value) || 0;
    const children0_2 = parseInt(document.getElementById('children0-2').value) || 0;
    
    const totalPeople = adults + youth12_18 + children6_11 + children3_5 + children0_2;
    const totalChildren = youth12_18 + children6_11 + children3_5 + children0_2;
    
    if (totalPeople === 0) {
        alert('Please enter at least one attendee.');
        return;
    }
    
    // Create array of all children with their prices for family discount calculation
    const childrenArray = [];
    for (let i = 0; i < youth12_18; i++) childrenArray.push({ age: 'youth12_18', price: PRICING.youth12_18 });
    for (let i = 0; i < children6_11; i++) childrenArray.push({ age: 'children6_11', price: PRICING.children6_11 });
    for (let i = 0; i < children3_5; i++) childrenArray.push({ age: 'children3_5', price: PRICING.children3_5 });
    for (let i = 0; i < children0_2; i++) childrenArray.push({ age: 'children0_2', price: PRICING.children0_2 });
    
    // Sort children by price (highest to lowest) for family discount
    childrenArray.sort((a, b) => b.price - a.price);
    
    // Calculate base cost with family discount logic
    let baseCost = adults * PRICING.adults; // All adults full price
    let familyDiscount = 0;
    const breakdownItems = [];
    
    // Add adults to breakdown
    if (adults > 0) {
        breakdownItems.push({ name: `Adults (${adults} × $${PRICING.adults})`, cost: adults * PRICING.adults });
    }
    
    // Apply family discount to children
    childrenArray.forEach((child, index) => {
        let childCost = child.price;
        let discountPercent = 0;
        
        if (index === 0) {
            // First child: full price
            discountPercent = 0;
        } else if (index === 1) {
            // Second child: 50% off
            discountPercent = 50;
            const discount = child.price * 0.50;
            familyDiscount += discount;
            childCost = child.price * 0.50;
        } else if (index === 2) {
            // Third child: 67% off
            discountPercent = 67;
            const discount = child.price * 0.67;
            familyDiscount += discount;
            childCost = child.price * 0.33;
        } else {
            // Fourth and subsequent children: free
            discountPercent = 100;
            familyDiscount += child.price;
            childCost = 0;
        }
        
        baseCost += childCost;
    });
    
    // Count children by age group for breakdown
    const ageGroups = {
        youth12_18: { count: youth12_18, price: PRICING.youth12_18, label: 'Youth (12-18)' },
        children6_11: { count: children6_11, price: PRICING.children6_11, label: 'Children (6-11)' },
        children3_5: { count: children3_5, price: PRICING.children3_5, label: 'Children (3-5)' },
        children0_2: { count: children0_2, price: PRICING.children0_2, label: 'Children (0-2)' }
    };
    
    Object.values(ageGroups).forEach(group => {
        if (group.count > 0) {
            breakdownItems.push({ name: `${group.label} (${group.count} × $${group.price})`, cost: group.count * group.price });
        }
    });
    
    // Add family discount to discounts array if applicable
    const discounts = [];
    if (familyDiscount > 0) {
        discounts.push({ name: 'Family Discount (automatic)', amount: familyDiscount });
    }
    
    // Calculate final total
    const total = baseCost;
    
    // Display breakdown
    displayBreakdown(breakdownItems, baseCost, discounts, total);
}

function displayBreakdown(breakdownItems, baseCost, discounts, total) {
    const breakdownDiv = document.getElementById('breakdown');
    let html = '';
    
    // Display all attendee groups
    breakdownItems.forEach(item => {
        html += createBreakdownItem(item.name, item.cost);
    });
    
    html += '<hr style="margin: 15px 0; border: 1px solid #ddd;">';
    html += createBreakdownItem('Subtotal (with family discount)', baseCost, true);
    
    // Discounts
    if (discounts.length > 0) {
        html += '<hr style="margin: 15px 0; border: 1px solid #ddd;">';
        discounts.forEach(discount => {
            html += createBreakdownItem(discount.name, -discount.amount, false, true);
        });
    }
    
    breakdownDiv.innerHTML = html;
    document.getElementById('totalCost').textContent = `$${total.toFixed(2)}`;
    
    // Scroll to results
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function createBreakdownItem(label, amount, bold = false, isDiscount = false) {
    const style = bold ? 'font-weight: 600;' : '';
    const className = isDiscount ? 'breakdown-item discount' : 'breakdown-item';
    const prefix = isDiscount ? '-' : '';
    return `
        <div class="${className}" style="${style}">
            <span>${label}</span>
            <span>${prefix}$${Math.abs(amount).toFixed(2)}</span>
        </div>
    `;
}

// Auto-calculate on input change
document.getElementById('campForm').addEventListener('input', function(e) {
    if (e.target.type === 'number' || e.target.type === 'checkbox') {
        // Optional: Auto-calculate on every change
        // Uncomment the line below if you want automatic calculation
        // calculateTotal();
    }
});
