# SWE30003_Assignment3
Assignment 3 - Object Oriented Design - Electronics Ecommerce Website

# AWE Electronics E-commerce System

## Project Overview
AWE Electronics is a comprehensive e-commerce system that implements core business operations including User Management, Product Catalog, Shopping Cart, and Order Management. The system is built with a focus on user experience, security, and maintainability.

## Technical Stack
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON files (for development)
- **Authentication**: Session-based with bcrypt password hashing
- **Security**: Helmet.js for security headers, CORS protection

## Project Structure
```
awe-electronics/
├── backend/
│   ├── data/           # JSON data files
│   ├── routes/         # API route handlers
│   ├── images/         # Product images
│   └── server.js       # Main server file
├── frontend/
│   ├── js/            # JavaScript files
│   ├── css/           # Stylesheets
│   ├── images/        # Frontend images
│   └── *.html         # HTML pages
└── public/            # Static files
```

## Features Implemented

### 1. User Management
- **Authentication**
  - Secure login/signup system
  - Session-based authentication
  - Password hashing with bcrypt
  - Role-based access control (Admin/Customer)

- **User Interface**
  - Dynamic navigation bar with user menu
  - Welcome message with user's name
  - Dropdown menu for user actions
  - Responsive design for all screen sizes

- **User Features**
  - Profile management
  - Order history
  - Admin dashboard access (for admin users)
  - Secure logout functionality

### 2. Product Catalog
- Product listing with pagination
- Search functionality
- Category filtering
- Product details view
- Image handling

### 3. Shopping Cart
- Add/remove items
- Update quantities
- Calculate totals
- Save cart for logged-in users

### 4. Order Management
- Order creation
- Order status tracking
- Order history
- Admin order management

## Setup and Installation

1. **Prerequisites**
   - Node.js (v14.0.0 or higher)
   - npm (comes with Node.js)

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Navigate to project directory
   cd awe-electronics

   # Install dependencies
   npm install

   # Start the server
   npm start
   ```

3. **Access the Application**
   - Open your browser and go to: http://localhost:3000
   - Login credentials:
     - Admin: admin@awe.com / password123
     - Customer: customer@example.com / password123
     - Test: test@awe.com / password123

## Security Considerations
- Password hashing using bcrypt
- Session-based authentication
- Protection against XSS and CSRF
- Secure password storage
- Input validation and sanitization
- Role-based access control

## User Interface Features
- **Navigation**
  - Dynamic user menu
  - Role-based menu items
  - Responsive design
  - Smooth transitions

- **Authentication**
  - Clean login/signup forms
  - Form validation
  - Error handling
  - Success messages

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interfaces
  - Consistent styling

## Future Improvements
1. **Database Integration**
   - Replace JSON files with a proper database
   - Implement data relationships
   - Add data validation

2. **Enhanced Security**
   - Implement JWT authentication
   - Add rate limiting
   - Enable HTTPS
   - Add two-factor authentication

3. **Additional Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Social media integration
   - Email notifications

4. **Performance Optimization**
   - Image optimization
   - Code minification
   - Caching implementation
   - Load balancing

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the ISC License. 
