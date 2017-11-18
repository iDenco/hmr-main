import {
	TEST_URL,
	newUsername,
	newEmail,
	registerUser,
	userStatusPageNotLoggedInDisplayedProperly,
	userStatusPageLoggedInDisplayedProperly
} from './helpers'

const currentDate = new Date()
const username = newUsername()
const email = newEmail(username)

fixture('/status').page(`${TEST_URL}/status`)

test(`should display the page if user is not logged in`, async t => {
	await userStatusPageNotLoggedInDisplayedProperly(t)
})

test(`should display user info if user is logged in`, async t => {
	await registerUser(t, username, email)
	await userStatusPageLoggedInDisplayedProperly(t, username, email)
})
