import {
	TEST_URL,
	newUsername,
	newEmail,
	newPassword,
	registerUser,
	flashMessageRemovedManually,
	logUserOut,
	logUserIn,
	flashFailedMessage,
	flashMessageRemovedWhenNewMessage,
	flashMessageRemovedAfterThreeSecond
} from './helpers'

const username = newUsername()
const email = newEmail(username)
const password = newPassword()

fixture('/register').page(`${TEST_URL}/register`)

test(`should display flash messages correctly`, async t => {
	registerUser(t, username, email, '', '', password)
	flashMessageRemovedManually(t)
	logUserOut(t)
	logUserIn(t, 'incorrect@email.com', password)
	flashFailedMessage(t, 'User does not exist.')
	logUserIn(t, email, password)
	flashMessageRemovedWhenNewMessage(t, 'Welcome!', 'User does not exist.')
	logUserOut(t)
	logUserIn(t, email, password)
	flashMessageRemovedAfterThreeSecond(t, 'Welcome!')
})
