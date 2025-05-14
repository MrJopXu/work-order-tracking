
// Function to get users from localStorage
function getAllUsers() {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
}

// Function to check login from localStorage users
function checkLogin(username, password) {
    const users = getAllUsers();
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}

// Set up login form event listener
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const toggleBtn = document.getElementById('toggle-password');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const user = checkLogin(username, password);
            
            if (user) {
                // Store user data in local storage
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`Login berhasil! Selamat datang ${user.name}`);
                // Redirect to dashboard
                window.location.href = 'dashboard-simple.html';
            } else {
                alert('Username atau password salah. Silakan coba lagi.');
            }
        });
    }
});
// Sample users data for demo purposes
const users = [
    {
        username: "manager1",
        password: "pass123",
        name: "Manager Utama",
        role: "manager",
        email: "manager@company.com"
    },
    {
        username: "admin1",
        password: "pass123",
        name: "Admin Satu",
        role: "admin",
        email: "admin@company.com"
    },
    {
        username: "designer1",
        password: "pass123",
        name: "Designer Kreatif",
        role: "designer",
        email: "design@company.com"
    },
    {
        username: "prod1",
        password: "pass123",
        name: "Produksi Team",
        role: "production",
        email: "production@company.com"
    },
    {
        username: "qc1",
        password: "pass123",
        name: "Quality Control",
        role: "qc",
        email: "qc@company.com"
    },
    {
        username: "finance1",
        password: "pass123",
        name: "Finance Team",
        role: "finance",
        email: "finance@company.com"
    }
];

// Function to check login
function checkLogin(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}

// Set up login form event listener
document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const toggleBtn = document.getElementById('toggle-password');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const user = checkLogin(username, password);
            
            if (user) {
                // Store user data in local storage
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`Login berhasil! Selamat datang ${user.name}`);
                // Redirect to dashboard
                window.location.href = 'Dashboard.html';
            } else {
                alert('Username atau password salah. Silakan coba lagi.');
            }
        });
    }
});
