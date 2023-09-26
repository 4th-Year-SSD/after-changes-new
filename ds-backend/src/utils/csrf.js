import { doubleCsrf } from "csrf-csrf";
export const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
  doubleCsrf({
    // getSecret: () => process.env.CSRF_SECRET,
    // cookieName: process.env.CSRF_COOKIE_NAME,
    // cookieOptions: {
    //   httpOnly: true,
    //   sameSite: false,
    //   secure: false,
    //   maxAge: 3600,
    // },

    getSecret: () => {
      return "123456789";
    },
    cookieName: "x-csrf-token",
    getTokenFromRequest: (req) => {
      return req.headers["x-csrf-token"];
    },
  });

// Error handling, validation error interception
export const csrfErrorHandler = (error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: "csrf validation error",
    });
  } else {
    console.log("inside next");
    next();
  }
};
