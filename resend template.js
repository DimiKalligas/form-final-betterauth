import { Resend } from 'resend';

const resend = new Resend('re_N2rVMJPu_CwnUEjkYtKmQeNSenC7bsDNt');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'net.logix@yahoo.gr',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});