"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
// import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
// import { workflowClient } from "@/lib/workflow";
// import config from "@/lib/config";

export const signInWithCredentials = async (
    params: Pick<AuthCredentials, "email" | "password">
) => {
    const { email, password } = params;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            return { success: false, error: result.error };
        }
    
        return { success: true };
    } catch (error) {
        console.log(error, "Sign in error");
        return { success: false, error: "" };
    }
}

export const signUp = async(params: AuthCredentials) => {
    const { fullName, email, universityId, universityCard, password } = params;

    //Check if the user already exists
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if(existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityId,
            universityCard,
            password: hashedPassword,
        })

        await signInWithCredentials({ email, password });

        return { success: true };

    } catch (error) {
        console.log(error , "Sign up error");
        return { success: false, error: "" };

    }
};