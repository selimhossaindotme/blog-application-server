import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { envVars } from "../config";
import {
    verificationEmailTemplate,
    resetPasswordEmailTemplate,
} from "../utilits/emailSenderTamplate";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: envVars.appUser,
        pass: envVars.appPass,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    secret: envVars.betterAuthSecret,
    baseUrl: envVars.betterAuthUrl!,
    trustedOrigins: [envVars.appUrl!],


    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
        minPasswordLength: 8,

        sendResetPassword: async ({ user, url }) => {
            try {
                const html = resetPasswordEmailTemplate({
                    username: user.name,
                    resetUrl: url,
                });

                const info = await transporter.sendMail({
                    from: `"Blog App" <${envVars.appUser}>`,
                    to: user.email,
                    subject: "Reset Your Password | Blog App",
                    html,
                    text: [
                        `Hi ${user.name},`,
                        ``,
                        `We received a request to reset your Blog App password.`,
                        `Use the link below to set a new password (expires in 1 hour):`,
                        ``,
                        url,
                        ``,
                        `If you didn't request this, you can safely ignore this email.`,
                        ``,
                        `Best Regards,`,
                        `Blog App Team`,
                    ].join("\n"),
                });

                console.log("✅ Reset-password email sent:", info.messageId);
            } catch (error) {
                console.error("❌ Error sending reset-password email:", error);
             
            }
        },

        onPasswordReset: async ({ user }) => {
            console.log(`🔑 Password reset successful for: ${user.email}`);
          
        },
    },


    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false,
            },
            phone: {
                type: "string",
                required: false,
            },
            status: {
                type: "string",
                defaultValue: "active",
                required: false,
            },
        },
    },

  
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,

        sendVerificationEmail: async ({ user, url }) => {
            try {
                const html = verificationEmailTemplate({
                    username: user.name,
                    verificationUrl: url,
                });

                const info = await transporter.sendMail({
                    from: `"Blog App" <${envVars.appUser}>`,
                    to: user.email,
                    subject: "Verify Your Email | Blog App",
                    html,
                    text: [
                        `Welcome to Blog App!`,
                        ``,
                        `Hi ${user.name},`,
                        ``,
                        `Thank you for joining Blog App.`,
                        `Please verify your email address using this link:`,
                        ``,
                        url,
                        ``,
                        `If you didn't create this account, ignore this email.`,
                        ``,
                        `Best Regards,`,
                        `Blog App Team`,
                    ].join("\n"),
                });

                console.log("✅ Verification email sent:", info.messageId);
            } catch (error) {
                console.error("❌ Error sending verification email:", error);
                throw error; 
            }
        },
    },

    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: envVars.googleClientId!,
            clientSecret: envVars.googleClientSecret!,
        },
    },
});