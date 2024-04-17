# Pixeluna - No-Code Website Builder

This document outlines the features and functionalities of Pixeluna, a no-code website builder application designed for agency owners. The application utilizes various technologies such as bun, Stripe Connect, Next.js, Shadcn, Tailwind CSS, Prisma, and Clerk for authentication.

## Introduction

Pixeluna offers a comprehensive solution for agency owners to manage their businesses efficiently, from subscription management to website creation and client management. With its user-friendly interface and powerful features, it simplifies the process of running an agency in the digital age.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

### 1. Landing Page
- Fully functional landing page for login and sign-up.

### 2. Agency Creation
- Agency owners can register on the platform and create their agency profiles.

### 3. Subscription Management
- Integration with Stripe Connect for monthly subscription charges.
- Platform fee deduction and commission management.
- Ability to import the user's Stripe account into the application.

### 4. Dashboard
- Performance metrics displayed on the dashboard.
- Upgrade options to premium plans.
- Transaction table for financial tracking.
- Creation of sub-accounts for client management.

### 5. Sub-Account Management
- Agency owners can create sub-accounts for multiple clients.
- Customizable features for each sub-account.
- Global state management for streamlined operations.

### 6. Staff Management
- Invite staff members to assist with business operations.
- Control access levels within sub-accounts.

### 7. User Access Control
- Agency owners can invite sub-account users to access their accounts.
- Unauthorized users are redirected to an unauthorized page.

### 8. Stripe Integration
- Sub-accounts connected to Stripe for functionality.

### 9. Sub-Account Features
- Media Bucket: Store images.
- Contacts: Manage leads.
- Pipelines: Create and manage tickets.

### 10. Website Building
- Sub-account users can create funnels and websites.
- Hosting within the custom domain in-app.

### 11. Funnel Management
- Create, edit, and manage funnels with customizable settings.
- Automatic redirection through funnel paths.

### 12. Stripe Product Linking
- Direct linking of sub-account Stripe products.
- Easy receiving of payments for sub-account users.

### 13. No-Code Website Editor
- Drag-and-drop feature for easy website and funnel creation.
- Responsive views for different devices.
- Undo and redo functionalities.
- Minimalistic sidebar for streamlined editing.
- Drag-and-drop integration of Stripe into websites.

### 14. Client Components
- Use media bucket assets directly to build websites.
- Notifications for sub-accounts.
- Light and dark mode options.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

