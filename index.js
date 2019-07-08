const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: functions.config().juen.user,
        pass: functions.config().juen.pass
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const sender = req.query.sender;
        const contact = req.query.contact;
        const message = req.query.message;
        const email = req.query.email;

        const mailOptions = {
            from: email, // Something like: Jane Doe <janedoe@gmail.com>
            to: 'doohl2@naver.com',
            subject: '주은단조 홈페이지로부터 새로운 문의가 왔습니다.', // email subject
            html: `
            <table cellpadding="0" cellspacing="0" style="width:100%;margin:0;padding:0">
                <tbody>
                    <tr>
                        <td height="23"
                            style="font-weight:bold;color:#000;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                            문의 정보? </td>
                    </tr>
                    <tr>
                        <td height="2" style="background:#424240"></td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr>
                        <td>
                            <table cellpadding="0" cellspacing="0" style="width:100%;margin:0;padding:0">
                                <tbody>
                                    <tr>
                                        <td width="110"
                                            style="padding-bottom:5px;color:#696969;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            이름 </td>
                                        <td
                                            style="padding-bottom:5px;color:#000;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            ${sender} </td>
                                    </tr>
                                    <tr>
                                        <td width="110"
                                            style="padding-bottom:5px;color:#696969;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            연락처 </td>
                                        <td
                                            style="padding-bottom:5px;;color:#000;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            ${contact} </td>
                                    </tr>
                                    <tr>
                                        <td width="110"
                                            style="padding-bottom:5px;color:#696969;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            이메일 </td>
                                        <td
                                            style="padding-bottom:5px;;color:#000;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            ${email} </td>
                                    </tr>
                                    <tr>
                                        <td width="110"
                                            style="padding-bottom:5px;color:#696969;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            내용 </td>
                                        <td
                                            style="padding-bottom:5px;;color:#000;line-height:23px;vertical-align:top;font-family:'나눔고딕',NanumGothic,'맑은고딕',Malgun Gothic,'돋움',Dotum,Helvetica,'Apple SD Gothic Neo',Sans-serif;">
                                            ${message} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr>
                        <td height="1" style="background:#d5d5d5"></td>
                    </tr>
                </tbody>
            </table>
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});