// Trading Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initChart();
    initScrollEffects();
    initContactForm();
    initMarketUpdates();
});

// Initialize price chart
function initChart() {
    const canvas = document.getElementById('priceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Generate sample price data
    const data = generatePriceData();
    
    // Draw chart
    drawChart(ctx, data, canvas.width, canvas.height);
    
    // Update chart periodically
    setInterval(() => {
        const newData = generatePriceData();
        drawChart(ctx, newData, canvas.width, canvas.height);
    }, 3000);
}

// Generate sample price data
function generatePriceData() {
    const points = 50;
    const data = [];
    let price = 1.0850; // Starting EUR/USD price
    
    for (let i = 0; i < points; i++) {
        // Random walk with slight upward bias
        const change = (Math.random() - 0.48) * 0.002;
        price += change;
        data.push(price);
    }
    
    return data;
}

// Draw price chart
function drawChart(ctx, data, width, height) {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart styling
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Find min/max values
    const minPrice = Math.min(...data);
    const maxPrice = Math.max(...data);
    const priceRange = maxPrice - minPrice;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = padding + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Draw price line
    ctx.strokeStyle = '#00d4aa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        const y = height - padding - ((data[i] - minPrice) / priceRange) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
    
    // Add gradient fill
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(0, 212, 170, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 212, 170, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw current price
    const currentPrice = data[data.length - 1];
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(`EUR/USD: ${currentPrice.toFixed(4)}`, padding, padding - 10);
}

// Initialize scroll effects
function initScrollEffects() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.querySelector('.form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your interest! We will contact you soon to set up your trading account.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Initialize market data updates
function initMarketUpdates() {
    const marketItems = document.querySelectorAll('.market-item');
    
    // Update prices every 5 seconds
    setInterval(() => {
        marketItems.forEach(item => {
            const priceElement = item.querySelector('.price');
            const changeElement = item.querySelector('.change');
            
            if (priceElement && changeElement) {
                // Simulate price changes
                const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]/g, ''));
                const changePercent = (Math.random() - 0.5) * 2; // -1% to +1%
                const newPrice = currentPrice * (1 + changePercent / 100);
                
                // Update price
                if (priceElement.textContent.includes('$')) {
                    priceElement.textContent = `$${newPrice.toFixed(2)}`;
                } else {
                    priceElement.textContent = newPrice.toFixed(4);
                }
                
                // Update change indicator
                const absoluteChange = newPrice - currentPrice;
                const percentChange = (absoluteChange / currentPrice) * 100;
                
                changeElement.textContent = `${absoluteChange >= 0 ? '+' : ''}${absoluteChange.toFixed(4)} (${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%)`;
                
                // Update color
                changeElement.className = `change ${absoluteChange >= 0 ? 'positive' : 'negative'}`;
                
                // Add animation
                item.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }, 5000);
}

// Add some interactive button effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        // Add ripple effect
        const btn = e.target;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);