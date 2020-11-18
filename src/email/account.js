const mailjet = require('node-mailjet')
    .connect(process.env.MAILJET_API_KEY_1, process.env.MAILJET_API_KEY_2)
/**
 *
 * Run:
 *c8a2738b40e456315504cf19cb3b923d


 */
const sendWelcomeEmail = (email, name) => {
    // var name= 'Ravindra'
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'rbosamiya9@gmail.com'
                },
                To: [
                    {
                        Email: email

                    },
                ],
                Subject: 'Thank you for joining.',
                TextPart: `Hey Ravindra`,
                HTMLPart:`<table cellspacing="0" cellpadding="0" border="0" style="color:#333;background:#fff;padding:0;margin:0;width:100%;font:15px/1.25em 'Helvetica Neue',Arial,Helvetica"> <tbody><tr width="100%"> <td valign="top" align="left" style="background:#eef0f1;font:15px/1.25em 'Helvetica Neue',Arial,Helvetica"> <table style="border:none;padding:0 18px;margin:50px auto;width:500px"> <tbody> <tr width="100%" height="60"> <td valign="top" align="left" style="border-top-left-radius:4px;border-top-right-radius:4px;background:#27709b url(https://ci5.googleusercontent.com/proxy/EX6LlCnBPhQ65bTTC5U1NL6rTNHBCnZ9p-zGZG5JBvcmB5SubDn_4qMuoJ-shd76zpYkmhtdzDgcSArG=s0-d-e1-ft#https://trello.com/images/gradient.png) bottom left repeat-x;padding:10px 18px;text-align:center;color:white"> Ravindrabosamiya.tech</td> </tr> <tr width="100%"> <td valign="top" align="left" style="background:#fff;padding:18px">

                <h1 style="font-size:20px;margin:16px 0;color:#333;text-align:center"> Thank you for Joining</h1>
               
                <p style="font:15px/1.25em 'Helvetica Neue',Arial,Helvetica;color:#333;text-align:center"> Hello  ${name} Namste!<br> 
                Thank for joing this platform.
                  Stay safe!
                 </p>
               
                <div style="background:#f6f7f8;border-radius:3px"> <br>
               
                <p style="text-align:center"> <a  style="color:#306f9c;font:26px/1.25em 'Helvetica Neue',Arial,Helvetica;text-decoration:none;font-weight:bold" target="_blank">Ravindrabosamiya.tech</a> </p>
               
                <p style="font:15px/1.25em 'Helvetica Neue',Arial,Helvetica;margin-bottom:0;text-align:center"> <a href="www.thelyricals.com" style="border-radius:3px;background:#3aa54c;color:#fff;display:block;font-weight:700;font-size:16px;line-height:1.25em;margin:24px auto 6px;padding:10px 18px;text-decoration:none;width:180px" target="_blank"> View Portfolio</a> </p>
               
                <br><br> </div>
               
               
                </td>
               
                </tr>
               
                </tbody> </table> </td> </tr></tbody> </table>`
                    ,
            },
        ],
    })
request
    .then(result => {
        console.log("email sent successfully");
        console.log(result.body)
    })
    .catch(err => {
        console.log(err.statusCode)
    })
}
const cancellationEmail = (email, name) => {
    // var name= 'Ravindra'
    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'rbosamiya9@gmail.com'
                },
                To: [
                    {
                        Email: email

                    },
                ],
                Subject: 'Thank you for using our services',
                TextPart: `Hey Ravindra`,
                HTMLPart:`<table cellspacing="0" cellpadding="0" border="0" style="color:#333;background:#fff;padding:0;margin:0;width:100%;font:15px/1.25em 'Helvetica Neue',Arial,Helvetica">
                <tbody>
                  <tr width="100%">
                    <td valign="top" align="left" style="background:#eef0f1;font:15px/1.25em 'Helvetica Neue',Arial,Helvetica">
                      <table style="border:none;padding:0 18px;margin:50px auto;width:500px">
                        <tbody>
                          <tr width="100%" height="60">
                            <td valign="top" align="left" style="border-top-left-radius:4px;border-top-right-radius:4px;background:#27709b url(https://ci5.googleusercontent.com/proxy/EX6LlCnBPhQ65bTTC5U1NL6rTNHBCnZ9p-zGZG5JBvcmB5SubDn_4qMuoJ-shd76zpYkmhtdzDgcSArG=s0-d-e1-ft#https://trello.com/images/gradient.png) bottom left repeat-x;padding:10px 18px;text-align:center;color:white"> Ravindrabosamiya.tech</td>
                          </tr>
                          <tr width="100%">
                            <td valign="top" align="left" style="background:#fff;padding:18px">
              
                              <h1 style="font-size:20px;margin:16px 0;color:#333;text-align:center"> Your account is scheduled to be deleted in a day</h1>
              
                              <p style="font:15px/1.25em 'Helvetica Neue',Arial,Helvetica;color:#333;text-align:center"> Hello ${name} Namste!<br>
                                Thank for using our services.You can always create a fresh new account by going into signup section. 
                              <br><br>Let us know if you have any queries or question related to our services</p>
                              <center><p>
                                Namste! stay safe
                              </p></center>
              
                                <br><br>
                              </div>
              
                            </td>
              
                          </tr>
              
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>`
                    ,
            },
        ],
    })
request
    .then(result => {
        console.log("cancellation email sent successfully");
        console.log(result.body)
    })
    .catch(err => {
        console.log(err.statusCode)
    })
}

module.exports = {sendWelcomeEmail,cancellationEmail}