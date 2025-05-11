<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Work Order Tracking</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="#"><i class="fas fa-clipboard-list me-2"></i>Work Order Tracker</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Work Orders</a>
                    </li>
                </ul>
                <span class="navbar-text me-3" id="user-info">
                    Welcome, <span id="user-name">User</span>
                </span>
                <button class="btn btn-outline-light" id="logout-btn">Logout</button>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                <div class="alert alert-success" id="welcome-message">
                    Welcome to the dashboard!
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">User Information</div>
                    <div class="card-body">
                        <p><strong>Name:</strong> <span id="display-name">-</span></p>
                        <p><strong>Role:</strong> <span id="display-role">-</span></p>
                        <p><strong>Email:</strong> <span id="display-email">-</span></p>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Quick Actions</div>
                    <div class="card-body" id="actions-container">
                        Loading actions...
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Sample Work Orders</div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Tracking Code</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="orders-list">
                                    <!-- Orders will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Simple dashboard script
        document.addEventListener('DOMContentLoaded', function() {
            // Check login status
            const userString = localStorage.getItem('currentUser');
            if (!userString) {
                alert('Anda belum login. Silakan login terlebih dahulu.');
                window.location.href = 'login.html';
                return;
            }
            
            // Parse user data
            const user = JSON.parse(userString);
            console.log("User data:", user);
            
            // Display user info
            document.getElementById('user-name').textContent = user.name || 'Unknown';
            document.getElementById('display-name').textContent = user.name || 'Unknown';
            document.getElementById('display-role').textContent = user.role || 'Unknown';
            document.getElementById('display-email').textContent = user.email || 'Unknown';
            
            // Show welcome message
            document.getElementById('welcome-message').textContent = 
                `Welcome to your dashboard, ${user.name}! You are logged in as ${user.role}.`;
            
            // Add sample orders (hardcoded for simplicity)
            const sampleOrders = [
                { code: "TR20250511A", status: "Production", date: "May 11, 2025" },
                { code: "TR20250510B", status: "Layout", date: "May 10, 2025" },
                { code: "TR20250505C", status: "Completed", date: "May 5, 2025" }
            ];
            
            const ordersList = document.getElementById('orders-list');
            sampleOrders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.code}</td>
                    <td>${order.status}</td>
                    <td>${order.date}</td>
                    <td><button class="btn btn-sm btn-primary">View</button></td>
                `;
                ordersList.appendChild(row);
            });
            
            // Add role-specific actions
            let actionButtons = '';
            switch(user.role) {
                case 'manager':
                    actionButtons = `
                        <button class="btn btn-primary mb-2 w-100">New Order</button>
                        <button class="btn btn-success mb-2 w-100">View Reports</button>
                    `;
                    break;
                case 'admin':
                    actionButtons = `
                        <button class="btn btn-primary mb-2 w-100">New Order</button>
                        <button class="btn btn-success mb-2 w-100">Update Shipping</button>
                    `;
                    break;
                case 'designer':
                    actionButtons = `
                        <button class="btn btn-primary mb-2 w-100">Layout Tasks</button>
                        <button class="btn btn-success mb-2 w-100">Film Tasks</button>
                    `;
                    break;
                case 'production':
                    actionButtons = `
                        <button class="btn btn-primary mb-2 w-100">Production Tasks</button>
                    `;
                    break;
                default:
                    actionButtons = `
                        <button class="btn btn-primary mb-2 w-100">View Tasks</button>
                    `;
            }
            
            document.getElementById('actions-container').innerHTML = actionButtons;
            
            // Handle logout
            document.getElementById('logout-btn').addEventListener('click', function() {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        });
    </script>
</body>
</html>
