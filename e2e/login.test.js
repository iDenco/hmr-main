import {
	TEST_URL,
	newUsername,
	newEmail,
	registerUser,
	logUserOut,
	logUserIn,
	shouldDisplayForm,
	rootPathDisplayedProperly,
	logOutPathDisplayProperly
} from './helpers'

const username = newUsername()
const email = newEmail(username)

fixture('/login').page(`${TEST_URL}/login`)

test(`should display the sign in form`, async t => {
	await shouldDisplayForm(t, 'login', 'Login')
})

test(`should allow a user to sign in`, async t => {
	await registerUser(t, username, email)
	await logUserOut(t)
	await logUserIn(t, email)
	await rootPathDisplayedProperly(t, username, email)
	await logUserOut(t)
	await logOutPathDisplayProperly(t)
})
