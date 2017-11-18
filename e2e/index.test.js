import { Selector } from 'testcafe'

import { TEST_URL } from './helpers'

fixture('/').page(`${TEST_URL}/`)

test(`users should be able to view the '/' page`, async t => {
	await t
		.navigateTo(TEST_URL)
		.expect(Selector('H1').withText('All Users').exists)
		.ok()
		.expect(Selector('a').withText('User Status').exists)
		.notOk()
		.expect(Selector('a').withText('Log Out').exists)
		.notOk()
		.expect(Selector('a').withText('Register').exists)
		.ok()
		.expect(Selector('a').withText('Log In').exists)
		.ok()
		.expect(Selector('.alert').exists)
		.notOk()
})
