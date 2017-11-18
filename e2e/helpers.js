import { Selector } from 'testcafe'
import randomstring from 'randomstring'

export const newUsername = () => {
	return randomstring.generate()
}

export const newEmail = username => {
	return `${username}@test.com`
}

export const TEST_URL = process.env.TEST_URL

export const shouldDisplayForm = async (t, path, title) => {
	await t
		.navigateTo(`${TEST_URL}/${path}`)
		.expect(Selector('H1').withText(title).exists)
		.ok()
		.expect(Selector('form').exists)
		.ok()
}

export const registerUser = async (t, username, email) => {
	await t
		.navigateTo(`${TEST_URL}/register`)
		.typeText('input[name="username"]', username)
		.typeText('input[name="email"]', email)
		.typeText('input[name="password"]', 'test')
		.click(Selector('input[type="submit"]'))
}

export const logUserOut = async t => {
	await t.click(Selector('a').withText('Log Out'))
}

export const logUserIn = async (t, email) => {
	await t
		.navigateTo(`${TEST_URL}/login`)
		.typeText('input[name="email"]', email)
		.typeText('input[name="password"]', 'test')
		.click(Selector('input[type="submit"]'))
}

export const rootPathDisplayedProperly = async (t, username, email) => {
	const tableRow = Selector('td')
		.withText(username)
		.parent()
	await t
		.expect(Selector('H1').withText('All Users').exists)
		.ok()
		.expect(tableRow.child().withText(username).exists)
		.ok()
		.expect(tableRow.child().withText(email).exists)
		.ok()
		.expect(Selector('a').withText('User Status').exists)
		.ok()
		.expect(Selector('a').withText('Log Out').exists)
		.ok()
		.expect(Selector('a').withText('Register').exists)
		.notOk()
		.expect(Selector('a').withText('Log In').exists)
		.notOk()
}

export const logOutPathDisplayProperly = async t => {
	await t
		.expect(Selector('p').withText('You are now logged out').exists)
		.ok()
		.expect(Selector('a').withText('User Status').exists)
		.notOk()
		.expect(Selector('a').withText('Log Out').exists)
		.notOk()
		.expect(Selector('a').withText('Register').exists)
		.ok()
		.expect(Selector('a').withText('Log In').exists)
		.ok()
}

export const userStatusPageNotLoggedInDisplayedProperly = async t => {
	await t
		.navigateTo(`${TEST_URL}/status`)
		.expect(Selector('p').withText('You must be logged in to view this.').exists)
		.ok()
		.expect(Selector('a').withText('User Status').exists)
		.notOk()
		.expect(Selector('a').withText('Log Out').exists)
		.notOk()
		.expect(Selector('a').withText('Register').exists)
		.ok()
		.expect(Selector('a').withText('Log In').exists)
		.ok()
}

export const userStatusPageLoggedInDisplayedProperly = async (t, username, email) => {
	await t
		.navigateTo(`${TEST_URL}/status`)
		.expect(Selector('li > strong').withText('User ID:').exists)
		.ok()
		.expect(Selector('li > strong').withText('Email:').exists)
		.ok()
		.expect(Selector('li').withText(email).exists)
		.ok()
		.expect(Selector('li > strong').withText('Username:').exists)
		.ok()
		.expect(Selector('li').withText(username).exists)
		.ok()
		.expect(Selector('a').withText('User Status').exists)
		.ok()
		.expect(Selector('a').withText('Log Out').exists)
		.ok()
		.expect(Selector('a').withText('Register').exists)
		.notOk()
		.expect(Selector('a').withText('Log In').exists)
		.notOk()
}
