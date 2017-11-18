import {
	TEST_URL,
	newUsername,
	newEmail,
	newPassword,
	registerUser,
	logUserOut,
	logUserIn,
	shouldDisplayAuthForm,
	rootPathDisplayedProperly,
	logOutPathDisplayProperly,
	validatePasswordField,
	rootPathDisplaySuccessMessage,
	userLoginFailed,
	flashFailedMessage
} from './helpers'

const username = newUsername()
const email = newEmail(username)
const password = newPassword()

fixture('/login').page(`${TEST_URL}/login`)

test(`should display the sign in form`, async t => {
	await shouldDisplayAuthForm(t, 'login', 'Login', 'Email must be greater than 5 characters.')
})

test(`should allow a user to sign in`, async t => {
	await registerUser(t, username, email, '', '', password)
	await logUserOut(t)
	await logUserIn(t, email, password)
	await rootPathDisplayedProperly(t, username, email)
	await rootPathDisplaySuccessMessage(t)
	await logUserOut(t)
	await logOutPathDisplayProperly(t)
})

test(`should validate the password field`, async t => {
	await validatePasswordField(t)
})

test(`should throw an error if the email is incorrect`, async t => {
	await logUserIn(t, 'incorrect@email.com', password)
	await userLoginFailed(t)
	await flashFailedMessage(t, 'User does not exist.')
})

test(`should throw an error if the password is incorrect`, async t => {
	await logUserIn(t, email, 'incorrectpassword')
	await userLoginFailed(t)
	await flashFailedMessage(t, 'User does not exist.')
})
