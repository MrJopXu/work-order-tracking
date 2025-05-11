// Sample users data for demo purposes
const users = [
    {
        username: "manager1",
        password: "pass123", // Dalam aplikasi nyata, password harus di-hash
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
    }
];

// Function to check login
function checkLogin(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}
