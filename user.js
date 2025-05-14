
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
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            const user = checkLogin(username, password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert(`Login berhasil! Selamat datang ${user.name}`);
                window.location.href = 'dashboard-simple.html';
            } else {
                alert('Username atau password salah. Silakan coba lagi.');
            }
        });
    }
});
