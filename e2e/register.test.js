import { Selector } from 'testcafe'

import {
	TEST_URL,
	newUsername,
	newEmail,
	newPassword,
	shouldDisplayAuthForm,
	registerUser,
	rootPathDisplayedProperly,
	userRegistrationFailed,
	flashFailedMessage
} from './helpers'

const username = newUsername()
const email = newEmail(username)
const password = newPassword()

fixture('/register').page(`${TEST_URL}/register`)

test(`should display the registration form`, async t => {
	await shouldDisplayAuthForm(t, 'register', 'Register', 'Username must be greater than 5 characters.')
})

test(`should allow a user to register`, async t => {
	await registerUser(t, username, email, '', '', password)
	await rootPathDisplayedProperly(t, username, email)
})

test(`should throw an error if the username is taken`, async t => {
	await registerUser(t, username, email, '', 'unique', password)
	await userRegistrationFailed(t)
	await flashFailedMessage(t, 'That user already exists.')
})

test(`should throw an error if the email is taken`, async t => {
	await registerUser(t, username, email, 'unique', '', password)
	await userRegistrationFailed(t)
	await flashFailedMessage(t, 'That user already exists.')
})
