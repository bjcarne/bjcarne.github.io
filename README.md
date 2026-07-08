# Church Camp Cost Calculator

A simple, user-friendly website to calculate the total cost of attending church camp with various pricing tiers and a family discount.

## Features

- **Age-based Pricing**
  - Adults (19+): $180
  - Youth (12-18): $150
  - Children (6-11): $130
  - Children (3-5): $80
  - Children (0-2): Free

- **Automatic Family Discount**
  - Adults and oldest child: Full price
  - Second child: 50% off
  - Third child: 67% off
  - Fourth and subsequent children: Free

## Customization

You can easily customize the pricing by editing the `script.js` file:

```javascript
const PRICING = {
    adults: 180,
    youth12_18: 150,
    children6_11: 130,
    children3_5: 80,
    children0_2: 0
};
```

To modify the family discount logic, update the calculation in the `calculateTotal()` function.

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `script.js` - Calculator logic and interactivity
