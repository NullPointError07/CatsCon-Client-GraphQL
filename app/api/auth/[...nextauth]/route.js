// import { LOGIN_USER } from '@/graphql/mutations';
// import { useMutation } from '@apollo/client';
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         const [loginUser, { data, error }] = useMutation(LOGIN_USER);

//         if (user) {
//           return Promise.resolve(user);
//         } else {
//           return Promise.resolve(null);
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/',
//   },
//   callbacks: {
//     session: async (session, user) => {
//       session.user.id = user.id;
//       return Promise.resolve(session);
//     },
//   },
// });
