providers: [
  CredentialsProvider({
    async authorize(credentials) {
      const query = `query Users {
                users {
                  id
                  username
                  email
                  password
                }
              }`;

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const { data } = await response.json();
      const user = await data.users.find(
        (dat) => dat.email === credentials.email
      );
      if (user && user.password === credentials.password) {
        return {
          _id: user._id,
          name: user.username,
          email: user.email,
        };
      }
      throw new Error("Invalid email or password");
    },
  }),
];

// providers: [
//   CredentialsProvider({
//     async authorize(credentials) {
//       console.log(credentials);
//       try {
//         const [loginUser, { data }] = useMutation(LOGIN_USER);

//         const result = await loginUser({
//           variables: {
//             loginUserInput: {
//               email: credentials.email,
//               password: credentials.password,
//             },
//           },
//         });

//         const { authToken } = data.login;

//         return {
//           _id: result.data._id,
//           name: result.data.userName,
//           email: result.data.email,
//           authToken,
//         };
//       } catch (error) {
//         console.error("Login failed:", error.message);
//         throw new Error("Invalid email or password");
//       }
//     },
//   }),
// ],
