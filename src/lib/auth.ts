import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { envVars } from "../config";
import { verificationEmailTemplate } from "../utilits/emailSenderTamplate";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },

});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    trustedOrigins: [envVars.appUrl!],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            try {
                const sendResetPasswordInfo = await transporter.sendMail({
                    from: `"Blog App" <${process.env.APP_USER}>`,
                    to: user.email,
                    subject: "Reset Your Password | Blog App",
                    html: `
                <p>Hi ${user.name},</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${url}">Reset Password</a>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best Regards,<br/>Blog App Team</p>
            `,
                    text: `
                Hi ${user.name},
                You requested a password reset. Use the link below to reset your password:
                ${url}
                If you didn't request this, please ignore this email.
                Best Regards,
                Blog App Team
            `,
                });

                console.log(
                    "Reset password email sent:",
                    sendResetPasswordInfo.messageId
                );


            } catch (error) {
                console.log("Error sending reset password email:", error);
            }
        },

        onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },

    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "active",
                required: false
            }
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,

        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const html = verificationEmailTemplate({
                    username: user.name,
                    verificationUrl: url,
                });

                const mailInfo = await transporter.sendMail({
                    from: `"Blog App" <${process.env.APP_USER}>`,
                    to: user.email,
                    subject: "Verify Your Email | Blog App",
                    html,
                    text: `
                Welcome to Blog App!

                Hi ${user.name},

                Thank you for joining Blog App.

                Please verify your email address using this link:

                ${url}

                If you didn't create this account, ignore this email.

                Best Regards,
                Blog App Team
            `,
                });

                console.log(
                    "Verification email sent:",
                    mailInfo.messageId
                );
                console.log("sendVerification documents", mailInfo);

            } catch (error) {
                console.error("Error sending verification email:", error);
                throw error;
            }
        },



    },


});