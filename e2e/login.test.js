import {
	TEST_URL,
	newUsername,
	newEmail,
	registerUser,
	logUserOut,
	logUserIn,
	shouldDisplayAuthForm,
	rootPathDisplayedProperly,
	logOutPathDisplayProperly,
	validatePasswordField
} from './helpers'

const username = newUsername()
const email = newEmail(username)

fixture('/login').page(`${TEST_URL}/login`)

test(`should display the sign in form`, async t => {
	await shouldDisplayAuthForm(t, 'login', 'Login', 'Email must be greater than 5 characters.')
})

test(`should allow a user to sign in`, async t => {
	await registerUser(t, username, email)
	await logUserOut(t)
	await logUserIn(t, email)
	await rootPathDisplayedProperly(t, username, email)
	await logUserOut(t)
	await logOutPathDisplayProperly(t)
})

test(`should validate the password field`, async t => {
	await validatePasswordField(t)
})
