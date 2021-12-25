const jwt = require('jsonwebtoken');
const secret ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImsxMjM0NSJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vcnJpcyBUaGFua3MiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.QT9rT-Vao6kBcXpWk7P-PqDmQb-nx7PN2NvbwttMzEKJN8fUEneWVqvuqR8x0bttcYsJtviJJcJf8-Rm4cm3Bp8g4MDI9k_M_mRkk7ixW9pZUpYdcsJnfj7K-8KFEiDXnGSa9SjFzbA3wYRsvFZSy9M_3rP_tv4mpBCZFGmHsUFZyzEcrgoo3ZlADQu9uGHHY8lulO2Mkb5-eMBkUKBxLppQv7pEsTp3CZm3bN_iSNgXCPx2vA03TESwMb7Bip0V6MDsvDGbaCz6sSxKtusUCd8Nj9CtHNzPZRkjZm0ToJcYkB6OsCv_YzWZC_ncMDFlLC8SU2M6HSFG0UBWKEqaeA'
// const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    
    let token = req.body.token || req.query.token || req.headers.authorization;

   

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
      
    }
   
    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
  signToken: function ({ email, name, _id, level }) {
    const payload = { email, name, _id, level };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
