## Step 1

To setup Firebase in your project we need to install both server-side and client-side packages:

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

## Step 2

Go to firebase website and create new project or open existing project
in order to integrate firebase services into [project]
firebase console -> project settings -> service Account -> generate new key -> paste dowlaoded file in root directory of the project and name it serviceAccount.json

**❗ NOTE:** Your private key gives access to your project's Firebase services. Keep it confidential and never store it in a public repository so add firebase/serviceAccount.json in gitignore

Add "resolveJsonModule": true in your tsconfig.json if not already:
```bash
{
  "compilerOptions": 
  {
    ...,
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```
This allows TypeScript to import JSON files like modules.

## Step 3
Install zod

