import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access'

const statement = {
  ...defaultStatements,
} as const

const ac = createAccessControl(statement)

const admin = ac.newRole({
  ...adminAc.statements,
})

const user = ac.newRole({
  user: [],
  session: [],
})

const lawyer = ac.newRole({
  user: [],
  session: [],
})

export { admin, user, lawyer, ac }
