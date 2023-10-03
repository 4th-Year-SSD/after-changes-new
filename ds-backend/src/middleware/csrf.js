require("dotenv").config();
import { doubleCsrf } from "csrf-csrf";

export const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
  doubleCsrf({
    getSecret: () => {
      return `${process.env.CSRF_COOKIE_SECRET}`;
    },
    cookieName: `${process.env.CSRF_COOKIE_NAME}`,
    getTokenFromRequest: (req) => {
      // Get the CSRF token from the header.
      let csrfToken = req.headers["x-csrf-token"];

      // If the CSRF token is not in the header, check the body.
      if (csrfToken === undefined) {
        csrfToken = req.body?.csrf_token?.token;
      }

      // Return the CSRF token.
      return csrfToken;
    },
  });

// Error handling, validation error interception
export const csrfErrorHandler = (error, req, res, next) => {
  if (error === invalidCsrfTokenError) {
    res.status(403).json({
      error: "csrf validation error",
    });
  } else {
    next();
  }
};
