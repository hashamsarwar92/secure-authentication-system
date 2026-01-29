# Firebase Authentication System for Next.js

A complete, production-ready authentication system built with Next.js 16, Firebase (client & admin), and TypeScript. This system provides secure user authentication with protected routes, session management, and password reset functionality.

---

## 📋 Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Required Files & Folder Structure](#required-files--folder-structure)
5. [Environment Configuration](#environment-configuration)
6. [How It Works](#how-it-works)
7. [Usage Guide](#usage-guide)
8. [Customization](#customization)
9. [Security Best Practices](#security-best-practices)

---

## ✨ Features

- ✅ **User Sign Up & Sign In** with Firebase Authentication
- ✅ **Password Reset** functionality
- ✅ **Protected Routes** with middleware
- ✅ **Secure Session Management** using HttpOnly cookies
- ✅ **Server-Side & Client-Side** Firebase integration
- ✅ **Type-Safe Forms** with Zod validation
- ✅ **Modern UI Components** with Shadcn/ui
- ✅ **Role-Based Access** (User/Admin support)

---

## 🔧 Prerequisites

Before integrating this authentication system, ensure you have:

1. **Next.js 15+** project (App Router)
2. **TypeScript** configured
3. **Tailwind CSS** installed
4. **Firebase Project** created at [Firebase Console](https://console.firebase.google.com/)

---

## 📦 Installation & Setup

### Step 1: Install Dependencies

Install all required packages with a single command:

```bash
npm install firebase-admin
```
It is used for server-side use only, giving full control over your Firebase project.
It’s needed to create/verify tokens, manage users, and set roles securely in production


```bash
npm install firebase
```
It is the client-side SDK for frontend apps, letting you sign in users, get ID tokens, and access Firestore/Realtime DB. You need it so the frontend can securely use Firebase after the backend issues a custom token.

```bash
npm install zod
```
# Purpose: 
Type-safe schema validation library.
# Use cases: 
Validate frontend forms or backend API requests, ensures consistent and safe data handling.


```bash
npx shadcn@latest init
npx shadcn@latest add button
npx shadcn@latest add form
npx shadcn@latest add input
```
# Purpose: 
Tailwind CSS-based component library.
# Use cases: 
Pre-built, accessible UI components like buttons, modals, and forms for faster UI


```bash
npm install axios
```
# Purpose: 
Promise-based HTTP client for making API requests.
# Use cases: 
Fetching data from your backend, calling external APIs, or sending form data from frontend.


```bash
npm install lucide-react
```
# Purpose: 
React icon library.
# Use cases: 
Easily add scalable SVG icons to your app with full React support.


```bash
npm install usehooks-ts
```
# Purpose: 
Collection of reusable React hooks written in TypeScript.
# Use cases: 
Simplify common frontend logic like window size, local storage, media queries, and more.


```bash
npm install react-hook-form
```
# Purpose: 
Type-safe, performant form library for React.
# Use cases: 
Handle form state, validation, and submission efficiently with minimal re-renders. Can be combined with Zod for schema-based validation.

```bash
npm install @hookform/resolvers
```
# Purpose: 
Integrates react-hook-form with validation libraries like Zod, Yup, Joi, etc.
# Use case: 
Allows you to do schema-based validation using zodResolver.

# Single Command to install all dependency

```bash 
npm install firebase-admin firebase zod axios lucide-react usehooks-ts react-hook-form @hookform/resolvers 
```
## Step 2

Setup your .env.local
```bash
# --- PUBLIC CLIENT SDK (Safe for browser) ---
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"

# --- PRIVATE ADMIN SDK (Server-side only) ---
# Get these from: Project Settings -> Service Accounts -> Generate New Private Key
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="firebase-client-email"
# Note: Ensure the private key is wrapped in quotes and includes the \n characters
FIREBASE_PRIVATE_KEY="firebase-private-key"
```

# Firebase Client Initialization firebase/firebase-client.ts 
Go to your firebase project setting -> General and get client keys
# Firebase Admin Initialization firebase/firebase-admin.ts 
Go to your firebase project setting -> sevice account and download privatekey.json and then copy admin keys from it and paste in .env.local

**❗ NOTE:** Keep you admin key secure and private



