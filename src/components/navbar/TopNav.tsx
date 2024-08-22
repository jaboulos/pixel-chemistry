// import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
// import Link from 'next/link'
// import React from 'react'
// import { GiMatchTip } from 'react-icons/gi'
// import NavLink from './NavLink'
// import { auth } from '@/auth'
// import UserMenu from './UserMenu'
// import { getAuthUserId } from '@/app/actions/authActions'
// import { getMemberByUserId } from '@/app/actions/memberActions'

// export const TopNav = async () => {
//   // extract session from promise
//   // will be used to determine whether or not to show user menu or buttons
//   const session = await auth()
//   const userId = await getAuthUserId()
//   // optimization issue, calls in layout and page are duplicated.  According to next docs, this is normal
//   const member = await getMemberByUserId(userId)

//   return (
//     <Navbar
//       maxWidth="xl"
//       className="bg-gradient-to-r from-zinc-400 to-sky-200"
//       classNames={{
//         item: [
//           'text-xl',
//           'text-white',
//           'uppercase',
//           'data-[active=true]:text-green-200',
//         ],
//       }}
//     >
//       <NavbarBrand as={Link} href="/">
//         <GiMatchTip size={40} className="text-gray-200" />
//         <div className="font-bold text-3xl flex">
//           <span className="text-gray-900">Pixel</span>
//           <span className="text-gray-200">Chemistry</span>
//         </div>
//       </NavbarBrand>
//       <NavbarContent justify="center">
//         <NavLink label="Members" href="/members" />
//         <NavLink label="Lists" href="/lists" />
//         <NavLink label="Messages" href="/messages" />
//       </NavbarContent>
//       <NavbarContent justify="end">
//         {session?.user ? (
//           <UserMenu user={session.user} member={member} />
//         ) : (
//           <>
//             <Button
//               variant="bordered"
//               as={Link}
//               href="/login"
//               className="text-white"
//             >
//               Login
//             </Button>
//             <Button
//               variant="bordered"
//               as={Link}
//               href="/register"
//               className="text-white"
//             >
//               Register
//             </Button>
//           </>
//         )}
//       </NavbarContent>
//     </Navbar>
//   )
// }

// // export const TopNav = async () => {
// //   const session = await auth()

// //   if (!session?.user) {
// //     return (
// //       <Navbar>
// //         {/* Render non-authenticated UI */}
// //         <NavbarContent justify="end">
// //           <Button
// //             variant="bordered"
// //             as={Link}
// //             href="/login"
// //             className="text-white"
// //           >
// //             Login
// //           </Button>
// //           <Button
// //             variant="bordered"
// //             as={Link}
// //             href="/register"
// //             className="text-white"
// //           >
// //             Register
// //           </Button>
// //         </NavbarContent>
// //       </Navbar>
// //     )
// //   }

// //   const userId = await getAuthUserId()
// //   const member = await getMemberByUserId(userId)

// //   return (
// //     <Navbar maxWidth="xl" className="bg-gradient-to-r from-zinc-400 to-sky-200">
// //       <NavbarBrand as={Link} href="/">
// //         <GiMatchTip size={40} className="text-gray-200" />
// //         <div className="font-bold text-3xl flex">
// //           <span className="text-gray-900">Pixel</span>
// //           <span className="text-gray-200">Chemistry</span>
// //         </div>
// //       </NavbarBrand>
// //       <NavbarContent justify="center">
// //         <NavLink label="Members" href="/members" />
// //         <NavLink label="Lists" href="/lists" />
// //         <NavLink label="Messages" href="/messages" />
// //       </NavbarContent>
// //       <NavbarContent justify="end">
// //         <UserMenu user={session.user} member={member} />
// //       </NavbarContent>
// //     </Navbar>
// //   )
// // }

// export default TopNav

import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { GiMatchTip } from 'react-icons/gi'
import NavLink from './NavLink'
import { auth } from '@/auth'
import UserMenu from './UserMenu'
import { getUserInfoForNav } from '@/app/actions/userActions'

export const TopNav = async () => {
  const session = await auth()
  const userInfo = session?.user && (await getUserInfoForNav())
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-zinc-400 to-sky-200"
      classNames={{
        item: [
          'text-xl',
          'text-white',
          'uppercase',
          'data-[active=true]:text-yellow-200',
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-200">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink href="/members" label="Matches" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        {userInfo ? (
          <UserMenu userInfo={userInfo} />
        ) : (
          <>
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/register"
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
export default TopNav
