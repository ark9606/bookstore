/**
 * Author: Arkady Zelensky
 */

module.exports = {
  config: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sendmail.bookstore@gmail.com',
        pass: 'a1s2d3f4g5h6j7'
    }
  },
  emails: {
    forgot: {
      content:{
        from: `${require('./site').name} <noreply@bookstore.com>`,
        to: '',
        subject: `Forgot Password`,  
        text: "",
        html: "",
      },
      getText: url => `Folow to change password: ${url}`,
      getHtml:url => `<b>Folow to change password:</b> <a href="${url}">Change password</a>`,
    }
  }

};