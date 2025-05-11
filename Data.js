// Sample orders data for demo purposes
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

// Sample users data for demo purposes
const users = [
    {
        username: "manager1",
        password: "pass123", // In a real app, password would be hashed
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
