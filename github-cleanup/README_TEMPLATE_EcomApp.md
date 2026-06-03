# E-commerce Application

A production-ready full-stack e-commerce platform with modern UI, secure payments, and comprehensive inventory management.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-PulseBay%20Store-blue?style=flat-square&logo=vercel)](https://pulsebay-store.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Overview

A complete e-commerce solution featuring product catalog management, shopping cart functionality, secure checkout flow, and an admin dashboard for inventory management.

## Key Features

### Customer Features
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add/remove items with persistent cart state
- **Secure Checkout**: Integrated payment processing with Stripe
- **Order Tracking**: View order history and track shipments
- **User Profiles**: Manage addresses, payment methods, and preferences

### Admin Features
- **Inventory Management**: Add, edit, and remove products
- **Order Management**: Process and fulfill customer orders
- **Analytics Dashboard**: Sales reports and performance metrics
- **User Management**: Manage customer accounts and permissions

## Tech Stack

### Frontend
- Next.js 14+ (App Router)
- React Server Components
- TypeScript
- TailwindCSS
- Framer Motion for animations
- React Query for data fetching

### Backend & Database
- Next.js API Routes
- PostgreSQL with Prisma ORM
- Redis for caching
- NextAuth.js for authentication

### Payment & Services
- Stripe Payment Intents
- Stripe Webhooks
- Cloudinary for image hosting
- Resend for email notifications

### Deployment
- Vercel (Frontend + Serverless Functions)
- PostgreSQL on Railway/Supabase
- Redis on Upstash

## Architecture

```
EcomApp/
├── app/                    # Next.js 14 app directory
│   ├── (shop)/            # Shop routes
│   ├── (admin)/           # Admin routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── layouts/          # Layout components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── prisma/               # Database schema
```

## Database Schema

### Products
- id, name, description, price, images, category, stock, createdAt, updatedAt

### Orders
- id, userId, items, total, status, paymentStatus, createdAt

### Users
- id, email, name, role, addresses, createdAt

### Categories
- id, name, slug, description

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account
- Cloudinary account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abhishek-Gharat/EcomApp.git
cd EcomApp
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
```bash
cp .env.example .env.local
```

Required environment variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

4. Database Setup
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run development server
```bash
npm run dev
```

## API Routes

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/webhooks/stripe` - Stripe webhook handler

## Performance Optimizations

- Image optimization with Next.js Image component
- Static generation for product pages
- Incremental Static Regeneration for dynamic content
- Edge functions for API routes
- Redis caching for frequently accessed data

## Security Measures

- Input validation with Zod
- CSRF protection
- Rate limiting on API routes
- Secure session management
- XSS protection headers

## Screenshots

[Add screenshots of key features here]

## Future Roadmap

- [ ] Multi-vendor support
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- LinkedIn: [Abhishek Gharat](https://linkedin.com/in/abhishek-gharat)
- Project Link: [https://github.com/Abhishek-Gharat/EcomApp](https://github.com/Abhishek-Gharat/EcomApp)

---

Built with Next.js, React, and PostgreSQL
