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
