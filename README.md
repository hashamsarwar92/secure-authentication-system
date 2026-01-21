## Step 1

To setup firebase sdk we need to install firebase and firebase-admin.

```bash
npm install firebase-admin
```
It is used for server-side use only, giving full control over your Firebase project.
It’s needed to create/verify tokens, manage users, and set roles securely in production


```bash
npm install firebase
```
It is the client-side SDK for frontend apps, letting you sign in users, get ID tokens, and access Firestore/Realtime DB. You need it so the frontend can securely use Firebase after the backend issues a custom token.

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

