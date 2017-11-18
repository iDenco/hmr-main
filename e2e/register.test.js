import { Selector } from 'testcafe'

import { TEST_URL, newUsername, newEmail, shouldDisplayForm, registerUser, rootPathDisplayedProperly } from './helpers'

const username = newUsername()
const email = newEmail(username)

fixture('/register').page(`${TEST_URL}/register`)

test(`should display the registration form`, async t => {
	await shouldDisplayForm(t, 'register', 'Register')
})

test(`should allow a user to register`, async t => {
	await registerUser(t, username, email)
	await rootPathDisplayedProperly(t, username, email)
})
