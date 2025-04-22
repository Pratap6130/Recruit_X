"use server";

import { db, auth } from "@/firebase/admin"; // Adjusted the path to match the correct location
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // One week in milliseconds

export async function signUp(params: SignUpParams){
    const {uid, name, email} = params;

    try{
         const userRecord = await db.collection('users').doc(uid).get()
   
         if (userRecord.exists) {
             
            return {
                success: false,
                message: 'User alreasdy exists.Please sign in instead.'
            }
         }

         await db.collection('users').doc(uid).set({

            name,
            email
         })
          
         return {
            success: true,
            message: "Account created successfully. Please sign in."

         }

   
        }  catch (e:any) {
        
        console.error("Error creating a user", e);

        if(e.code === 'auth/email-already-in-use'){

            return{
                success: false,
                message: "Email already in use."
            }
        }

        return{
            success: false,
            message: "Lodhe dusri id daal na ",
        }
        
    }
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params;

    try{
           
        const userRecord = await auth.getUserByEmail(email);
        
        if (!userRecord) {
            return {
                success: false,
                message: "User does not exist. Please sign up."
            };
        }

        await setSessionCookie(idToken);

    } catch(e){
        console.error("Sign in failed:", e);

    }

    return{
        success: false,
        message: "Failed to log in an account."
    }
}

export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000, })
    
    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK ,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })

} 

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
  
    const sessionCookie = cookieStore.get("session")?.value;
    if (!sessionCookie) return null;
  
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
  
      // get user info from db
      const userRecord = await db
        .collection("users")
        .doc(decodedClaims.uid)
        .get();
      if (!userRecord.exists) return null;
  
      return {
        ...userRecord.data(),
        id: userRecord.id,
      } as User;
    } catch (error) {
      console.log(error);
  
      // Invalid or expired session
      return null;
    }
  }
  
  // Check if user is authenticated
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user; 
  }

// "use server";

// import { auth, db } from "@/firebase/admin";
// import { cookies } from "next/headers";

// // Session duration (1 week)
// const SESSION_DURATION = 60 * 60 * 24 * 7;

// // Set session cookie
// export async function setSessionCookie(idToken: string) {
//   const cookieStore = await cookies();

//   // Create session cookie
//   const sessionCookie = await auth.createSessionCookie(idToken, {
//     expiresIn: SESSION_DURATION * 1000, // milliseconds
//   });

//   // Set cookie in the browser
//   cookieStore.set("session", sessionCookie, {
//     maxAge: SESSION_DURATION,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     sameSite: "lax",
//   });
// }

// export async function signUp(params: SignUpParams) {
//   const { uid, name, email } = params;

//   try {
//     // check if user exists in db
//     const userRecord = await db.collection("users").doc(uid).get();
//     if (userRecord.exists)
//       return {
//         success: false,
//         message: "User already exists. Please sign in.",
//       };

//     // save user to db
//     await db.collection("users").doc(uid).set({
//       name,
//       email,
//       // profileURL,
//       // resumeURL,
//     });

//     return {
//       success: true,
//       message: "Account created successfully. Please sign in.",
//     };
//   } catch (error: any) {
//     console.error("Error creating user:", error);

//     // Handle Firebase specific errors
//     if (error.code === "auth/email-already-exists") {
//       return {
//         success: false,
//         message: "This email is already in use",
//       };
//     }

//     return {
//       success: false,
//       message: "Failed to create account. Please try again.",
//     };
//   }
// }

// export async function signIn(params: SignInParams) {
//   const { email, idToken } = params;

//   try {
//     const userRecord = await auth.getUserByEmail(email);
//     if (!userRecord)
//       return {
//         success: false,
//         message: "User does not exist. Create an account.",
//       };

//     await setSessionCookie(idToken);
//   } catch (error: any) {
//     console.log("");

//     return {
//       success: false,
//       message: "Failed to log into account. Please try again.",
//     };
//   }
// }

// // Sign out user by clearing the session cookie
// export async function signOut() {
//   const cookieStore = await cookies();

//   cookieStore.delete("session");
// }

// // Get current user from session cookie
// export async function getCurrentUser(): Promise<User | null> {
//   const cookieStore = await cookies();

//   const sessionCookie = cookieStore.get("session")?.value;
//   if (!sessionCookie) return null;

//   try {
//     const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
// /**
//  * Sets a session cookie for the authenticated user.
//  *
//  * @param idToken - The Firebase ID token of the authenticated user.
//  *
//  * @remarks
//  * This function creates a session cookie using the Firebase Admin SDK's `createSessionCookie` method.
//  * The session cookie is then set in the browser's cookie store with appropriate security settings.
//  *
//  * @returns {Promise<void>} - A promise that resolves when the session cookie is set.
//  */
// export async function setSessionCookie(idToken: string) {
//   const cookieStore = await cookies();

//   // Create session cookie
//   const sessionCookie = await auth.createSessionCookie(idToken, {
//     expiresIn: SESSION_DURATION * 1000, // milliseconds
//   });

//   // Set cookie in the browser
//   cookieStore.set("session", sessionCookie, {
//     maxAge: SESSION_DURATION,
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//     sameSite: "lax",
//   });
// }

//     // get user info from db
//     const userRecord = await db
//       .collection("users")
//       .doc(decodedClaims.uid)
//       .get();
//     if (!userRecord.exists) return null;

//     return {
//       ...userRecord.data(),
//       id: userRecord.id,
//     } as User;
//   } catch (error) {
//     console.log(error);

//     // Invalid or expired session
//     return null;
//   }
// }

// // Check if user is authenticated
// export async function isAuthenticated() {
//   const user = await getCurrentUser();
//   return !!user;
// }