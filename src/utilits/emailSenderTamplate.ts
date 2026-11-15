
interface VerificationEmailProps {
    username: string;
    verificationUrl: string;
}

export const verificationEmailTemplate = ({
    username,
    verificationUrl,
}: VerificationEmailProps) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f5;
        font-family: Arial, Helvetica, sans-serif;
    ">
        <table width="100%" cellpadding="0" cellspacing="0"
            style="padding: 40px 15px;">
            <tr>
                <td align="center">

                    <table width="100%" cellpadding="0" cellspacing="0"
                        style="
                            max-width: 560px;
                            background-color: #ffffff;
                            border-radius: 12px;
                            overflow: hidden;
                        ">

                        <!-- Header -->
                        <tr>
                            <td align="center"
                                style="
                                    background-color: #18181b;
                                    padding: 30px 20px;
                                ">
                                <h1 style="
                                    color: #ffffff;
                                    margin: 0;
                                    font-size: 28px;
                                ">
                                    Blog<span style="color: #a78bfa;">App</span>
                                </h1>

                                <p style="
                                    color: #d4d4d8;
                                    margin: 10px 0 0;
                                    font-size: 14px;
                                ">
                                    Your ideas deserve to be shared.
                                </p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px 30px;">

                                <h2 style="
                                    color: #18181b;
                                    font-size: 24px;
                                    margin-top: 0;
                                ">
                                    Welcome to Blog App!
                                </h2>

                                <p style="
                                    color: #52525b;
                                    font-size: 15px;
                                    line-height: 1.7;
                                ">
                                    Hi ${username || "there"},
                                </p>

                                <p style="
                                    color: #52525b;
                                    font-size: 15px;
                                    line-height: 1.7;
                                ">
                                    Thank you for creating an account with
                                    Blog App. We're excited to have you
                                    as part of our community!
                                </p>

                                <p style="
                                    color: #52525b;
                                    font-size: 15px;
                                    line-height: 1.7;
                                ">
                                    To get started, please verify your
                                    email address by clicking the button below.
                                </p>

                                <!-- Verification Button -->
                                <table cellpadding="0" cellspacing="0"
                                    style="margin: 30px auto;">
                                    <tr>
                                        <td align="center"
                                            style="
                                                background-color: #7c3aed;
                                                border-radius: 8px;
                                            ">
                                            <a href="${verificationUrl}"
                                                target="_blank"
                                                style="
                                                    display: inline-block;
                                                    padding: 15px 30px;
                                                    color: #ffffff;
                                                    text-decoration: none;
                                                    font-size: 15px;
                                                    font-weight: bold;
                                                ">
                                                Verify My Email
                                            </a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="
                                    color: #71717a;
                                    font-size: 13px;
                                    line-height: 1.7;
                                ">
                                    If the button doesn't work, copy and
                                    paste the following link into your browser:
                                </p>

                                <p style="
                                    word-break: break-all;
                                    font-size: 13px;
                                    line-height: 1.6;
                                ">
                                    <a href="${verificationUrl}"
                                        style="color: #7c3aed;">
                                        ${verificationUrl}
                                    </a>
                                </p>

                                <hr style="
                                    border: none;
                                    border-top: 1px solid #e4e4e7;
                                    margin: 30px 0;
                                " />

                                <p style="
                                    color: #71717a;
                                    font-size: 13px;
                                    line-height: 1.7;
                                ">
                                    <strong>Security Notice:</strong>
                                    If you didn't create an account with
                                    Blog App, you can safely ignore this email.
                                    Do not share this verification link with anyone.
                                </p>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center"
                                style="
                                    background-color: #fafafa;
                                    padding: 25px 20px;
                                ">
                                <p style="
                                    color: #71717a;
                                    font-size: 12px;
                                    margin: 0 0 8px;
                                ">
                                    © ${new Date().getFullYear()} Blog App.
                                    All rights reserved.
                                </p>

                                <p style="
                                    color: #a1a1aa;
                                    font-size: 12px;
                                    margin: 0;
                                ">
                                    This is an automated email.
                                    Please do not reply.
                                </p>
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
