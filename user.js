// Fix Login System untuk Work Order Tracking

// 1. Inisialisasi Data User Default
function initializeDefaultUsers() {
  const users = localStorage.getItem('users');
  
  // Jika belum ada users, buat default users
  if (!users) {
    const defaultUsers = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User'
      },
      {
        id: 2,
        username: 'staff',
        password: 'staff123',
        role: 'staff',
        name: 'Staff User'
      },
      {
        id: 3,
        username: 'demo',
        password: 'demo123',
        role: 'user',
        name: 'Demo User'
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    console.log('Default users initialized:', defaultUsers);
  }
}

// 2. Handle Login Function
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Validasi input
  if (!username || !password) {
    showError('Please enter both username and password');
    return;
  }
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Find user
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Login success
    const sessionData = {
      userId: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      loginTime: new Date().toISOString()
    };
    
    // Save session
    localStorage.setItem('currentUser', JSON.stringify(sessionData));
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Show success message
    showSuccess('Login successful! Redirecting...');
    
    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = './dashboard.html';
    }, 1000);
    
  } else {
    // Login failed
    showError('Invalid username or password');
    
    // Show hint for demo
    showHint();
  }
}

// 3. Show Error Message
function showError(message) {
  const errorDiv = document.getElementById('error-message') || createErrorDiv();
  errorDiv.className = 'alert alert-danger';
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  
  // Hide after 5 seconds
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

// 4. Show Success Message
function showSuccess(message) {
  const messageDiv = document.getElementById('error-message') || createErrorDiv();
  messageDiv.className = 'alert alert-success';
  messageDiv.textContent = message;
  messageDiv.style.display = 'block';
}

// 5. Create Error/Message Div
function createErrorDiv() {
  const div = document.createElement('div');
  div.id = 'error-message';
  div.style.cssText = 'margin-top: 10px; display: none;';
  
  const form = document.querySelector('form');
  if (form) {
    form.appendChild(div);
  }
  
  return div;
}

// 6. Show Login Hint
function showHint() {
  const hintDiv = document.getElementById('login-hint') || createHintDiv();
  hintDiv.innerHTML = `
    <div class="alert alert-info" style="margin-top: 20px;">
      <h5>Demo Credentials:</h5>
      <ul>
        <li>Admin: username: <strong>admin</strong>, password: <strong>admin123</strong></li>
        <li>Staff: username: <strong>staff</strong>, password: <strong>staff123</strong></li>
        <li>Demo: username: <strong>demo</strong>, password: <strong>demo123</strong></li>
      </ul>
    </div>
  `;
  hintDiv.style.display = 'block';
}

// 7. Create Hint Div
function createHintDiv() {
  const div = document.createElement('div');
  div.id = 'login-hint';
  
  const form = document.querySelector('form');
  if (form && form.parentNode) {
    form.parentNode.appendChild(div);
  }
  
  return div;
}

// 8. Check Login Status
function checkLoginStatus() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');
  
  if (isLoggedIn && currentUser) {
    // Already logged in, redirect to dashboard
    window.location.href = './dashboard.html';
  }
}

// 9. Handle Logout
function handleLogout() {
  // Clear session
  sessionStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
  
  // Redirect to login
  window.location.href = './login.html';
}

// 10. Initialize Login Page
function initializeLoginPage() {
  console.log('Initializing login page...');
  
  // Initialize default users
  initializeDefaultUsers();
  
  // Check if already logged in
  checkLoginStatus();
  
  // Attach login handler
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Add login button handler if button exists
  const loginButton = document.getElementById('loginButton') || 
                     document.querySelector('button[type="submit"]');
  if (loginButton && !loginForm) {
    loginButton.addEventListener('click', function(e) {
      e.preventDefault();
      handleLogin(e);
    });
  }
  
  // Show hint by default
  showHint();
  
  console.log('Login page initialized');
}

// 11. Protected Page Check
function checkAuthentication() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const currentUser = localStorage.getItem('currentUser');
  
  if (!isLoggedIn || !currentUser) {
    // Not logged in, redirect to login
    alert('Please login first');
    window.location.href = './login.html';
    return false;
  }
  
  return JSON.parse(currentUser);
}

// 12. Initialize Dashboard/Protected Pages
function initializeProtectedPage() {
  const user = checkAuthentication();
  
  if (user) {
    // Display user info
    const userDisplay = document.getElementById('username-display') || 
                       document.querySelector('.username');
    if (userDisplay) {
      userDisplay.textContent = user.name || user.username;
    }
    
    // Add logout handler
    const logoutBtn = document.getElementById('logout-btn') || 
                     document.querySelector('[onclick*="logout"]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  }
}

// 13. Auto-initialize based on page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('login.html')) {
    initializeLoginPage();
  } else if (currentPage.includes('dashboard.html') || 
             currentPage.includes('stock') || 
             currentPage.includes('order')) {
    initializeProtectedPage();
  }
});

// 14. Debug Helper
function debugLogin() {
  console.log('=== Login Debug Info ===');
  console.log('Users:', JSON.parse(localStorage.getItem('users') || '[]'));
  console.log('Current User:', JSON.parse(localStorage.getItem('currentUser') || 'null'));
  console.log('Is Logged In:', sessionStorage.getItem('isLoggedIn'));
  console.log('======================');
}

// 15. Reset All Data (for testing)
function resetAllData() {
  localStorage.clear();
  sessionStorage.clear();
  console.log('All data cleared. Refreshing page...');
  location.reload();
}

// Export untuk testing
window.debugLogin = debugLogin;
window.resetAllData = resetAllData;

// CSS untuk styling messages
const loginStyles = `
<style>
.alert {
  padding: 12px 20px;
  margin: 10px 0;
  border-radius: 4px;
  font-size: 14px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.login-hint {
  margin-top: 20px;
}

.login-hint ul {
  list-style-type: none;
  padding-left: 0;
}

.login-hint li {
  margin-bottom: 8px;
}
</style>
`;

// Inject styles if not exists
if (!document.getElementById('login-styles')) {
  const styleElement = document.createElement('div');
  styleElement.id = 'login-styles';
  styleElement.innerHTML = loginStyles;
  document.head.appendChild(styleElement);
}
