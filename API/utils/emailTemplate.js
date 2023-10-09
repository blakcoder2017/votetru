const HTML_TEMPLATE = (text) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          button {
            display: inline-block;
            background-color: #F5D7DB;
            padding: 20px;
            width: 800px;
            color: #ffffff;
            text-align: center;
            border: 4px double #cccccc;
            border-radius: 10px;
            font-size: 28px;
            cursor: pointer;
            margin: 5px;
            -webkit-transition: all 0.5s; /* add this line, chrome, safari, etc */
            -moz-transition: all 0.5s; /* add this line, firefox */
            -o-transition: all 0.5s; /* add this line, opera */
            transition: all 0.5s; /* add this line */
          }
          button:hover {
            background-color: #F1916D;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>VoteTrue - Reset Password</h1>
            </div>
            <div class="email-body">
              <a href="${text}" target="_blank>Link</a>
            </div>
            <div class="email-footer">
              <p><button>Click here to reset your password</button></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = HTML_TEMPLATE;
