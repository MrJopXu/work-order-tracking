// Function to display order details
function displayOrderDetails(trackingCode) {
    const resultDiv = document.getElementById('result');
    const order = sampleOrders[trackingCode];
    
    if (!order) {
        alert('Order not found. Please check your tracking code.');
        return;
    }
    
    // Update order details
    document.getElementById('order-code').textContent = order.trackingCode;
    document.getElementById('order-date').textContent = order.orderDate;
    document.getElementById('order-status').textContent = order.status;
    document.getElementById('order-completion').textContent = order.completion;
    
    // Update progress bar
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${order.progress}%`;
    progressBar.textContent = `${order.progress}%`;
    
    // Set progress bar color based on progress
    if (order.progress < 30) {
        progressBar.classList.remove('bg-success', 'bg-warning');
        progressBar.classList.add('bg-primary');
    } else if (order.progress < 70) {
        progressBar.classList.remove('bg-success', 'bg-primary');
        progressBar.classList.add('bg-warning');
    } else {
        progressBar.classList.remove('bg-warning', 'bg-primary');
        progressBar.classList.add('bg-success');
    }
    
    // Update timeline
    const timeline = document.getElementById('status-timeline');
    if (timeline) {
        timeline.innerHTML = '';
        
        order.stages.forEach(stage => {
            const item = document.createElement('li');
            item.className = 'timeline-item';
            
            // Add class based on stage status
            if (stage.status === 'Completed') {
                item.classList.add('completed-stage');
            } else if (stage.status === 'In Progress') {
                item.classList.add('in-progress-stage');
            } else {
                item.classList.add('pending-stage');
            }
            
            const icon = document.createElement('div');
            icon.className = 'timeline-icon';
            
            // Icon based on stage status
            if (stage.status === 'Completed') {
                icon.innerHTML = '<i class="fas fa-check"></i>';
            } else if (stage.status === 'In Progress') {
                icon.innerHTML = '<i class="fas fa-spinner"></i>';
            } else {
                icon.innerHTML = '<i class="fas fa-clock"></i>';
            }
            
            const content = document.createElement('div');
            content.className = 'timeline-content';
            
            let badgeClass = 'bg-secondary';
            if (stage.status === 'Completed') {
                badgeClass = 'bg-success';
            } else if (stage.status === 'In Progress') {
                badgeClass = 'bg-warning text-dark';
            }
            
            content.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-1">${stage.name}</h5>
                    <span class="badge ${badgeClass}">${stage.status}</span>
                </div>
                ${stage.date ? `<p class="mb-0 text-muted"><i class="far fa-calendar-alt me-1"></i> ${stage.date}</p>` : ''}
            `;
            
            item.appendChild(icon);
            item.appendChild(content);
            timeline.appendChild(item);
        });
    }
    
    resultDiv.style.display = 'block';
}

// Add event listener when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const trackingForm = document.getElementById('tracking-form');
    
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const trackingCode = document.getElementById('tracking-code').value.trim().toUpperCase();
            displayOrderDetails(trackingCode);
        });
    }
});
