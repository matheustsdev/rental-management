# Rental Management System - Project Overview
## 📋 Project Summary

This is a **Rental Management System** - a web application designed to help manage the rental of items (typically clothing and accessories like dresses, formwear, etc.). The system allows users to:

- **Manage Products**: Add, edit, and organize items available for rent
- **Create Rentals**: Book items for customers with specific dates and measurements
- **Track Availability**: Know which products are available or unavailable during specific periods
- **Generate Receipts**: Create professional PDF receipts for each rental
- **Manage Returns**: Track when customers return rented items
- **Contact Customers**: Send messages via WhatsApp to rental customers
- **Search & Filter**: Quickly find products and rentals

---

## 🎯 Main Objective

The primary goal is to provide a complete digital solution to manage a rental business without the need for manual paperwork or complicated spreadsheets. Everything is organized in a central database where you can:

1. See all available products and their prices
2. Create new rental bookings easily
3. Track the status of each rental (scheduled, finished, etc.)
4. Know when items need to be returned
5. Generate professional receipts for customers

---

## 🏗️ Project Architecture

This project follows **Clean Architecture** principles, which means the code is organized in layers:

### **Layer 1: Domain Layer** (`src/core/domain/`)
The heart of the application. Contains:
- **Entities**: Definitions of what the app works with (Products, Rentals, Categories)
- **Repositories**: Interfaces that define how to access data (what methods are available)
- **Services**: Business rules and logic

### **Layer 2: Application Layer** (`src/core/application/`)
The use cases (actions) your app can perform:
- **Cases**: Things like "Create a new rental", "List all products", "Update a rental"
- **DTOs**: Data Transfer Objects that define how data moves between layers

### **Layer 3: Infrastructure Layer** (`src/core/infrastructure/`)
Technical implementation details:
- **Database**: Connects to PostgreSQL through Prisma
- **Repositories Factory**: Creates repository instances

### **Presentation Layer** (`src/app/` and `src/components/`)
What users see and interact with:
- **Pages**: Main screens (Home, Products, Rentals)
- **Components**: Reusable UI pieces organized as:
  - **Atoms**: Small building blocks (buttons, inputs, tags)
  - **Molecules**: Combinations of atoms (search bars, cards, tables)
  - **Organisms**: Complex sections (navigation, modals, forms)

---

## 🗄️ Database Structure

The database has 4 main tables:

### **1. Categories**
Groups products by type. Example: "Dresses", "Shoes", "Accessories"
- Each category has a custom measurement type (for products in that category)
- Has a buffer period (days after return before product can be rented again)

### **2. Products**
Items available for rent
- Reference code (unique identifier)
- Description (what it's for)
- Price (rental cost)
- Category (which group it belongs to)
- Receipt description (custom text shown on receipts)

### **3. Rents**
A specific rental booking
- Rental date and return date
- Customer information (name, address, phone)
- Total cost, discounts, and signals (deposits)
- Status: SCHEDULED (waiting), FINISHED (completed)
- Code: Auto-numbered receipt number
- Files can be marked as deleted (soft delete)

### **4. Rent Products**
Links products to rentals with specific details
- Which product is in which rental
- Custom measurements (bust, waist, hip, shoulder, sleeve, height, back)
- Price at time of rental (in case product price changes later)
- Real return date (when customer actually returned it)
- Buffer days before product is available again

---

## 🖥️ User Interface Pages

### **Home Page** (`/`)
Landing page - currently empty, you can add dashboard summaries here

### **Rentals Page** (`/rents`)
Main page for managing rental bookings
- Search and filter rentals by customer name or code
- View rental cards showing details
- **Actions available**:
  - View receipt as PDF
  - Edit rental details
  - Delete rental
  - Mark as returned/finished
  - Contact customer via WhatsApp

### **Products Page** (`/products`)
Manage the inventory of items
- Table view of all products
- Search by reference or description
- Pagination to handle many products
- Edit product details

---

## 🔧 Technology Stack

### **Frontend**
- **Next.js 15**: React framework with built-in server capabilities
- **React 19**: UI library for building interactive components
- **Chakra UI**: Pre-built accessible UI components (buttons, forms, modals, drawers)
- **React Hook Form**: Efficient form handling and validation
- **Zod**: TypeScript-first validation library

### **Backend**
- **Next.js API Routes**: Built-in API server (no separate backend needed)
- **Use Cases**: Business logic using the clean architecture pattern
- **Repository Pattern**: Abstraction for database operations

### **Database**
- **PostgreSQL**: Powerful relational database
- **Prisma ORM**: Easy way to work with the database from JavaScript/TypeScript
- **Migrations**: Version control for database schema changes

### **Authentication & Storage**
- **Supabase**: Authentication system (login/signup)

### **Additional Tools**
- **React PDF**: Generate PDF files (for receipts)
- **Axios**: Make HTTP requests to API
- **Date-fns**: Date formatting and manipulation
- **React Icons**: Icon library for UI elements
- **Next Themes**: Light/dark mode support

---

## 📱 Component Structure

Components are organized using **Atomic Design** principles:

### **Atoms** (`src/components/atoms/`)
Small, reusable elements:
- `ButtonMenu.tsx` - Button with dropdown options
- `ComboBox.tsx` - Searchable dropdown
- `DefaultInput.tsx` - Standard text input
- `PrimaryButton.tsx` - Main action button
- `SearchBar.tsx` - Search input with icon
- `Select.tsx` - Selection dropdown
- `Tag.tsx` - Label/badge component
- `Toaster.tsx` - Notifications system

### **Molecules** (`src/components/molecules/`)
Combinations of atoms:
- `DataTable.tsx` - Reusable table component
- `ProductCard.tsx` - Card showing product info
- `RentCard.tsx` - Card showing rental info
- `AddProductModal.tsx` - Form to add new product
- `AddRentModal.tsx` - Form to create new rental
- `ProductSearchInput.tsx` - Search box for products
- `ReceiptView.tsx` - PDF receipt display

### **Organisms** (`src/components/organisms/`)
Complex, feature-rich sections:
- `AddRentModal.tsx` - Complete rental creation form
- `RentReturnModal.tsx` - Mark item as returned
- `AddProductModal.tsx` - Complete product creation form
- `Navbar.tsx` - Navigation menu

---

## 🚀 API Endpoints

The application provides REST API endpoints for all operations:

### **Rentals** (`/api/rents`)
- `GET /api/rents` - List all rentals (with search, pagination, sorting)
- `POST /api/rents` - Create a new rental
- `PUT /api/rents` - Update a rental
- `GET /api/rents/[id]` - Get rental details
- `DELETE /api/rents/[id]` - Delete a rental
- `POST /api/rents/return` - Mark rental as returned

### **Products** (`/api/products`)
- `GET /api/products` - List all products (with search, pagination)
- `POST /api/products` - Create a new product
- `PUT /api/products` - Update a product
- `DELETE /api/products/[id]` - Delete a product

### **Categories** (`/api/categories`)
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create a category

### **Availability** (`/api/availability`)
- Checks if a product is available during a specific date range

---

## 📊 Key Features Explained

### **Search & Filtering**
- Products can be searched by reference or description
- Rentals can be searched by customer name or code
- Results are paginated for better performance

### **Measurements**
Each rental can store custom measurements for items (especially important for clothing):
- Bust, Waist, Hip (for dresses)
- Shoulder, Sleeve (for jackets)
- Height, Back (for proper fit)

### **Rental Status**
- **SCHEDULED**: Booking is confirmed, customer will pick up items
- **FINISHED**: Customer has returned all items

### **Discounts**
Rentals can have discounts applied:
- **PERCENTAGE**: Discount as percentage of total (e.g., 10%)
- **FIXED**: Discount as fixed amount (e.g., R$ 50)

### **Signals (Deposits)**
An optional deposit customers pay on rental, which is tracked separately from the rental fee

### **Buffer Dates**
After a product is returned, there's a buffer period before it can be rented again (to allow for cleaning/inspection)

### **Soft Deletes**
Items aren't permanently deleted - they're marked as deleted with a timestamp, so you can recover them if needed

---

## 🔄 How Data Flows

### **Creating a Rental** (Example)
1. User fills out form on `/rents` page with:
   - Customer details (name, phone, address)
   - Rental dates
   - Products to rent
   - Measurements for each product
   - Discount (if any)
   - Signal amount

2. Frontend sends data to `POST /api/rents`

3. API uses `CreateRentUseCase` which:
   - Validates all data (using Zod)
   - Checks if products are available for those dates
   - Creates rental record in database
   - Creates rent_products records for each item

4. Database saves everything
5. Frontend shows success message and refreshes list

### **Generating Receipt**
1. User clicks "See Receipt" on a rental card
2. Frontend loads rental details
3. React PDF renders a formatted receipt
4. User can view or download as PDF

---

## 🛠️ How to Run Locally

### **Setup**
```bash
# Install dependencies
npm install

# Set up database (create .env.local file with database URL)
npx prisma migrate dev

# Start development server
npm run dev
```

The app runs on `http://localhost:3000`

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production build
- `npm run lint` - Check code quality
- `npm run typegen` - Generate Supabase types

---

## 📁 Project Structure Summary

```
rental-management/
├── src/
│   ├── app/                    # Next.js pages and API routes
│   │   ├── api/                # REST API endpoints
│   │   ├── rents/              # Rentals page
│   │   ├── products/           # Products page
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── atoms/              # Small components
│   │   ├── molecules/          # Medium components
│   │   └── organisms/          # Large components
│   ├── core/                   # Business logic (clean architecture)
│   │   ├── application/        # Use cases
│   │   ├── domain/             # Entities & repositories
│   │   └── infrastructure/     # Database implementation
│   ├── services/               # API client, database client
│   ├── hooks/                  # React hooks (custom logic)
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── styles/                 # CSS and theme
├── prisma/
│   ├── schema.prisma           # Database schema definition
│   └── migrations/             # Database migration history
└── public/                     # Static files
└── tests/                      # Tests files
```

---

## 🔐 Key Patterns Used

### **Repository Pattern**
Database operations are abstracted behind repository interfaces, making it easy to change the data source

### **Use Cases**
All business operations are separate classes (CreateRent, ListRent, UpdateRent, etc.) making code organized and testable

### **DTOs (Data Transfer Objects)**
Data is transformed to match what each layer needs, preventing exposure of internal details

### **Type Safety**
Everything is written in TypeScript, catching errors during development instead of runtime

### **Soft Deletes**
Items marked as deleted remain in the database (with a deleted_at timestamp) for audit trails and recovery

---

## 💡 For AI Agents and Developers

**When working on this project, remember:**

1. **Always follow the clean architecture layers** - Don't put business logic in components
2. **Use the repository pattern** - Access data through repositories, not directly from components
3. **Add use cases for new features** - Keep business logic in the application layer
4. **Reuse components** - Use atomic design to build pages from existing components
5. **Type everything** - Use TypeScript types to prevent bugs, do not use any or unknown
6. **Database migrations** - Always create migrations for schema changes, don't modify schema directly
7. **API routes handle validation** - Use Zod to validate incoming data
8. **Pagination** - Use pagination for lists to handle large datasets
9. **Search is debounced** - To improve performance, search waits 300ms before making requests
10. **Soft deletes** - Check the `deleted` field when querying to exclude deleted items

---

## 🎓 Learning the Codebase

Start with understanding these files in this order:

1. `prisma/schema.prisma` - Understand the data model
2. `src/types/entities/` - Understand the TypeScript types
3. `src/core/domain/repositories/` - Understand repository interfaces
4. `src/core/application/cases/` - Understand use cases (business logic)
5. `src/app/api/rents/route.ts` - Understand how API routes use use cases
6. `src/app/rents/page.tsx` - Understand how frontend calls API
7. `src/components/` - Understand component structure

This project demonstrates real-world best practices for building scalable React applications!
