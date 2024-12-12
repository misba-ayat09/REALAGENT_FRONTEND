// import React, { useEffect, useState } from "react";
// import classes from "./StudentCard.module.css";
// import { Avatar, Flex, Text, Image } from "@mantine/core";
// import { useScaler } from "../../../../hooks";
// import cx from "clsx";
// import { Button } from "../../../Common/Button";
// import { Logo, icon } from "../../../../assets";
// import { IconType, icons } from "../../../Common/Icon/Icons";
// import { User } from "../../../../store/features/users";
// import { useNavigate } from "react-router-dom";
// import { Path } from "../../../../router";

// interface StudentCardProps {
//   onClose: () => void;
//   tutorData?: User;
//   onSubmit?: (ratingValue: number) => void;
// }

// export const StudentCard: React.FC<StudentCardProps> = ({ onClose, tutorData, onSubmit }) => {
//   const navigate = useNavigate();

//   const scaler = useScaler();

//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

//   const [rating, setRating] = useState<number>(0);

//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;

//     if (onSubmit && rating && rating > 0) {
//       onSubmit(rating);
//       timeoutId = setTimeout(() => {
//         setIsSubmitted(true);
//         setTimeout(() => {
//           navigate(Path.HOME);
//         }, 2000);
//       }, 2000);
//     }

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [onSubmit, rating, setIsSubmitted, navigate]);

//   return (
//     <Flex className={classes.root}>
//       <Flex pos={"relative"} className={classes.section} bg={"#FFFFFF"}>
//         <Image
//           pos={"absolute"}
//           top={scaler(45)}
//           left={scaler(70)}
//           h={scaler(35.89)}
//           w={scaler(167.25)}
//           src={Logo}
//           alt='logo'
//         />
//         <Flex className={classes.sectionContent}>
//           {!isSubmitted ? (
//             <Flex className={classes.heading}>
//               <Text className={classes.title}>Class Ended</Text>
//               <Text className={classes.subTitle}>Submit your feedback</Text>
//             </Flex>
//           ) : null}
//           <Flex className={classes.avatarContainer}>
//             <Avatar
//               classNames={{
//                 root: cx(classes.avatar)
//               }}
//               // src={tutorData?.profile}
//               alt={"tutorData"}
//             />
//             <Text className={classes.avatarName} lineClamp={1}>
//               {tutorData?.first_name ?? ""} {""} {tutorData?.first_name ?? ""}
//             </Text>
//             <Text className={classes.avatarDesignation} lineClamp={1}>
//               Subject
//             </Text>
//           </Flex>
//         </Flex>
//       </Flex>
//       <Flex className={classes.section} bg={"#FFFAED"}>
//         {!isSubmitted ? (
//           <Flex className={classes.ratingSection}>
//             <Flex justify={"center"} align={"center"} className={classes.ratingRow}>
//               <Text className={classes.ratingTitle}>Submit Feedback</Text>
//             </Flex>
//             <Flex className={classes.ratingRow}>
//               <img
//                 src={icons[IconType.Emoji1]}
//                 className={classes.ratingIcon}
//                 alt='Emoji1'
//                 onClick={() => setRating(1)}
//               />
//               <img
//                 src={icons[IconType.Emoji2]}
//                 className={classes.ratingIcon}
//                 alt='Emoji2'
//                 onClick={() => setRating(2)}
//               />
//               <img
//                 src={icons[IconType.Emoji3]}
//                 className={classes.ratingIcon}
//                 alt='Emoji3'
//                 onClick={() => setRating(3)}
//               />
//               <img
//                 src={icons[IconType.Emoji4]}
//                 className={classes.ratingIcon}
//                 alt='Emoji4'
//                 onClick={() => setRating(4)}
//               />
//               <img
//                 src={icons[IconType.Emoji5]}
//                 className={classes.ratingIcon}
//                 alt='Emoji5'
//                 onClick={() => setRating(5)}
//               />
//             </Flex>
//           </Flex>
//         ) : (
//           <Flex className={classes.thankYouSection}>
//             <Image h={scaler(92)} w={scaler(86)} src={icon} alt='logo' />
//             <Text className={classes.title} mt={scaler(13)}>
//               Thank you For Submitting Feedback
//             </Text>
//             <Text className={classes.subTitle} mb={scaler(13)}>
//               Feedback will help us evaluate our tutors
//             </Text>
//             <div className={classes.closeButton}>
//               <Button fullWidth label={"Close"} onClick={onClose} />
//             </div>
//           </Flex>
//         )}
//       </Flex>
//     </Flex>
//   );
// };
