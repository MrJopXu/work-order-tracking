// Sample data for demo purposes
const sampleOrders = {
    "TR20250511A": {
        trackingCode: "TR20250511A",
        orderDate: "May 11, 2025",
        status: "Production",
        completion: "May 20, 2025",
        progress: 50,
        stages: [
            { name: "PO Received", status: "Completed", date: "May 11, 2025" },
            { name: "Layout Design", status: "Completed", date: "May 12, 2025" },
            { name: "Film Printing", status: "Completed", date: "May 13, 2025" },
            { name: "Production", status: "In Progress", date: "May 14, 2025" },
            { name: "Quality Control", status: "Pending", date: null },
            { name: "Shipping", status: "Pending", date: null },
            { name: "Payment", status: "Pending", date: null }
        ]
    },
    "TR20250510B": {
        trackingCode: "TR20250510B",
        orderDate: "May 10, 2025",
        status: "Layout",
        completion: "May 25, 2025",
        progress: 25,
        stages: [
            { name: "PO Received", status: "Completed", date: "May 10, 2025" },
            { name: "Layout Design", status: "In Progress", date: "May 12, 2025" },
            { name: "Film Printing", status: "Pending", date: null },
            { name: "Production", status: "Pending", date: null },
            { name: "Quality Control", status: "Pending", date: null },
            { name: "Shipping", status: "Pending", date: null },
            { name: "Payment", status: "Pending", date: null }
        ]
    },
    "TR20250505C": {
        trackingCode: "TR20250505C",
        orderDate: "May 5, 2025",
        status: "Completed",
        completion: "May 15, 2025",
        progress: 100,
        stages: [
            { name: "PO Received", status: "Completed", date: "May 5, 2025" },
            { name: "Layout Design", status: "Completed", date: "May 7, 2025" },
            { name: "Film Printing", status: "Completed", date: "May 8, 2025" },
            { name: "Production", status: "Completed", date: "May 10, 2025" },
            { name: "Quality Control", status: "Completed", date: "May 12, 2025" },
            { name: "Shipping", status: "Completed", date: "May 14, 2025" },
            { name: "Payment", status: "Completed", date: "May 15, 2025" }
        ]
    }
};

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
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${order.progress}%`;
    progressBar.textContent = `${order.progress}%`;
    
    // Update timeline
    const timeline = document.querySelector('.list-group');
    if (timeline) {
        timeline.innerHTML = '';
        
        order.stages.forEach(stage => {
            const item = document.createElement('li');
            item.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = stage.name;
            if (stage.date) {
                nameSpan.textContent += ` (${stage.date})`;
            }
            
            const statusBadge = document.createElement('span');
            
            if (stage.status === 'Completed') {
                statusBadge.className = 'badge bg-success rounded-pill';
            } else if (stage.status === 'In Progress') {
                statusBadge.className = 'badge bg-warning rounded-pill';
            } else {
                statusBadge.className = 'badge bg-secondary rounded-pill';
            }
            
            statusBadge.textContent = stage.status;
            
            item.appendChild(nameSpan);
            item.appendChild(statusBadge);
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
    
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            
            alert(`In a real application, you would now be logged in as ${role} with email ${email}`);
        });
    }
});
