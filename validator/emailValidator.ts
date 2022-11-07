//TODO: Email validator needs to check SMTP email using Node mail server

import Validate from 'deep-email-validator';

async function isEmailValid(email: string) {
    await Validate ({
        email: email,
        // sender: email, // For testing SMTP node mail
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: false,
      })
}
export default isEmailValid;