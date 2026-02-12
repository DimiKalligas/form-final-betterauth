import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
}
// import {
//     Body,
//     Container,
//     Head,
//     Heading,
//     Html,
//     Preview,
//     Text,
// } from "@react-email/components";

// export const EmailTemplate = ({ message }) => {
//     return (
//         <Html>
//             <Head />
//             <Preview>Thank you for subscribing</Preview>
//             <Body className="bg-black text-white">
//                 <Container className="m-auto p-3">
//                     <Heading className="text-2xl my-2">
//                         De Web Service
//                     </Heading>
//                     <Text className="text-xl mx-2 my-2">{message}</Text>
//                 </Container>
//             </Body>
//         </Html>
//     );
// };