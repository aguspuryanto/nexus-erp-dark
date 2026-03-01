import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("erp.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    tax_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    name TEXT NOT NULL,
    location TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user',
    branch_id INTEGER,
    FOREIGN KEY(branch_id) REFERENCES branches(id)
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    unit TEXT,
    purchase_price REAL,
    sale_price REAL,
    stock_level INTEGER DEFAULT 0,
    warehouse_id INTEGER,
    FOREIGN KEY(warehouse_id) REFERENCES warehouses(id)
  );

  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT
  );

  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact_person TEXT,
    phone TEXT,
    address TEXT
  );

  CREATE TABLE IF NOT EXISTS warehouses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT
  );

  CREATE TABLE IF NOT EXISTS chart_of_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- Asset, Liability, Equity, Revenue, Expense
    balance REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS purchase_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    po_number TEXT UNIQUE NOT NULL,
    supplier_id INTEGER,
    status TEXT DEFAULT 'Draft', -- Draft, Ordered, Received, Invoiced
    total_amount REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(supplier_id) REFERENCES suppliers(id)
  );

  CREATE TABLE IF NOT EXISTS sale_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    so_number TEXT UNIQUE NOT NULL,
    customer_id INTEGER,
    status TEXT DEFAULT 'Draft', -- Quotation, SO, Shipped, Invoiced
    total_amount REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    position TEXT,
    department TEXT,
    salary REAL,
    join_date DATE,
    status TEXT DEFAULT 'Active'
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT,
    module TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed initial data if empty
const companyCount = db.prepare("SELECT COUNT(*) as count FROM companies").get() as { count: number };
if (companyCount.count === 0) {
  db.prepare("INSERT INTO companies (name, address) VALUES (?, ?)").run("Nexus Corp", "Main St 123");
  db.prepare("INSERT INTO branches (company_id, name, location) VALUES (?, ?, ?)").run(1, "Headquarters", "Jakarta");
  db.prepare("INSERT INTO users (username, password, full_name, role, branch_id) VALUES (?, ?, ?, ?, ?)").run("admin", "admin123", "Administrator", "admin", 1);
  
  // Seed some products
  db.prepare("INSERT INTO products (code, name, category, unit, purchase_price, sale_price, stock_level) VALUES (?, ?, ?, ?, ?, ?, ?)").run("P001", "MacBook Pro M3", "Electronics", "pcs", 25000000, 32000000, 10);
  db.prepare("INSERT INTO products (code, name, category, unit, purchase_price, sale_price, stock_level) VALUES (?, ?, ?, ?, ?, ?, ?)").run("P002", "Dell UltraSharp 27", "Electronics", "pcs", 5000000, 7500000, 25);
  
  // Seed COA
  db.prepare("INSERT INTO chart_of_accounts (code, name, type) VALUES (?, ?, ?)").run("1101", "Cash on Hand", "Asset");
  db.prepare("INSERT INTO chart_of_accounts (code, name, type) VALUES (?, ?, ?)").run("1102", "Bank Central", "Asset");
  db.prepare("INSERT INTO chart_of_accounts (code, name, type) VALUES (?, ?, ?)").run("4101", "Sales Revenue", "Revenue");

  // Seed Suppliers & Customers
  db.prepare("INSERT INTO suppliers (name, contact_person) VALUES (?, ?)").run("Tech Supply Co", "John Doe");
  db.prepare("INSERT INTO customers (name, email) VALUES (?, ?)").run("Global Solutions", "info@globalsolutions.com");

  // Seed PO & SO
  db.prepare("INSERT INTO purchase_orders (po_number, supplier_id, total_amount, status) VALUES (?, ?, ?, ?)").run("PO-2024-001", 1, 50000000, "Ordered");
  db.prepare("INSERT INTO sale_orders (so_number, customer_id, total_amount, status) VALUES (?, ?, ?, ?)").run("SO-2024-001", 1, 75000000, "Quotation");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Nexus ERP API is running" });
  });

  app.get("/api/stats", (req, res) => {
    // Mock stats for dashboard
    res.json({
      sales: 125000000,
      purchases: 85000000,
      inventory_value: 450000000,
      active_users: 12,
      recent_activities: db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 5").all()
    });
  });

  app.get("/api/purchasing", (req, res) => {
    const pos = db.prepare(`
      SELECT po.*, s.name as supplier_name 
      FROM purchase_orders po 
      JOIN suppliers s ON po.supplier_id = s.id
    `).all();
    res.json(pos);
  });

  app.get("/api/sales", (req, res) => {
    const sos = db.prepare(`
      SELECT so.*, c.name as customer_name 
      FROM sale_orders so 
      JOIN customers c ON so.customer_id = c.id
    `).all();
    res.json(sos);
  });

  app.get("/api/suppliers", (req, res) => {
    res.json(db.prepare("SELECT * FROM suppliers").all());
  });

  app.get("/api/inventory/transfers", (req, res) => {
    res.json([
      { id: 1, item: "MacBook Pro", from: "Main Warehouse", to: "Branch A", qty: 5, date: "2024-03-01" },
      { id: 2, item: "Dell Monitor", from: "Main Warehouse", to: "Branch B", qty: 10, date: "2024-03-02" },
    ]);
  });

  app.get("/api/recruitment/jobs", (req, res) => {
    res.json([
      { id: 1, title: "Senior Software Engineer", department: "IT", status: "Open", applicants: 12 },
      { id: 2, title: "HR Manager", department: "HR", status: "Closed", applicants: 45 },
    ]);
  });

  app.get("/api/cms/posts", (req, res) => {
    res.json([
      { id: 1, title: "Our New Office in Jakarta", date: "2024-02-15", author: "Admin" },
      { id: 2, title: "Nexus ERP v2.0 Released", date: "2024-01-10", author: "Tech Team" },
    ]);
  });

  app.get("/api/branches", (req, res) => {
    res.json(db.prepare("SELECT * FROM branches").all());
  });

  app.get("/api/employees", (req, res) => {
    const employees = db.prepare("SELECT * FROM employees").all();
    res.json(employees);
  });

  app.get("/api/crm/leads", (req, res) => {
    // Mock leads for CRM
    res.json([
      { id: 1, name: "Acme Corp", value: 50000000, stage: "Negotiation", probability: 70 },
      { id: 2, name: "Global Tech", value: 120000000, stage: "Proposal", probability: 40 },
      { id: 3, name: "Indo Jaya", value: 25000000, stage: "Closed Won", probability: 100 },
    ]);
  });

  app.post("/api/audit", (req, res) => {
    const { user_id, action, module, details } = req.body;
    db.prepare("INSERT INTO audit_logs (user_id, action, module, details) VALUES (?, ?, ?, ?)").run(user_id, action, module, details);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
