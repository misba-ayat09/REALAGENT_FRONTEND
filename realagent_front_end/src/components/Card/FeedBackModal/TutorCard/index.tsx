// import React, { useEffect, useState } from "react";
// import classes from "./TutorCard.module.css";
// import {
//   Avatar,
//   Flex,
//   Text,
//   Tooltip,
//   Button as MantineButton,
//   Textarea,
//   Image
// } from "@mantine/core";
// import { useScaler } from "../../../../hooks";
// import cx from "clsx";
// import { RatingStars } from "../../../Common/RatingStarsV2";
// import { Button } from "../../../Common/Button";
// import { Logo, icon } from "../../../../assets";
// import { User } from "../../../../store/features/users";
// import { FeedbackBody } from "../../../../store/features/meeting/api-types";
// import { useNavigate } from "react-router-dom";
// import { Path } from "../../../../router";

// interface Feedback {
//   studentId: string;
//   feedback: string;
//   attentiveness: number;
//   responsiveness: number;
//   levelOfUnderstanding: number;
//   learningPace: number;
//   overallPerformance: number;
//   isAbsent: boolean;
//   isCompleted: boolean;
// }

// interface TutorCardProps {
//   onClose: () => void;
//   studentsList?: User[];
//   onSubmit?: (feedbacks: FeedbackBody["feedbacks"]) => void;
// }

// export const TutorCard: React.FC<TutorCardProps> = ({ onClose, studentsList, onSubmit }) => {
//   const scaler = useScaler();
//   const navigate = useNavigate();

//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

//   const [feedbacks, setFeedbacks] = useState<Record<string, Feedback>>({});
//   const [selectedStudentId, setSelectedStudentId] = useState<string>("0");
//   const [allRatingsFilled, setAllRatingsFilled] = useState<boolean>(false);

//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;

//     if (isSubmitted) {
//       timeoutId = setTimeout(() => {
//         navigate(Path.HOME);
//       }, 2000);
//     }

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [isSubmitted, navigate]);

//   const initializeFeedbacks = () => {
//     const initialFeedbacks: Record<string, Feedback> = {};

//     studentsList?.map((student) => {
//       initialFeedbacks[student._id] = {
//         studentId: student._id,
//         feedback: "",
//         attentiveness: 0,
//         responsiveness: 0,
//         levelOfUnderstanding: 0,
//         learningPace: 0,
//         overallPerformance: 0,
//         isAbsent: false,
//         isCompleted: false
//       };
//     });

//     setFeedbacks(initialFeedbacks);
//   };

//   const handleFeedbackChange = (field: keyof Feedback, value: Feedback[keyof Feedback]) => {
//     const updatedFeedbacks = {
//       ...feedbacks,
//       [selectedStudentId]: {
//         ...feedbacks[selectedStudentId],
//         [field]: value
//       }
//     };

//     // Check if all specified rating criteria are greater than 0
//     const allCriteriaCompleted =
//       updatedFeedbacks[selectedStudentId].attentiveness > 0 &&
//       updatedFeedbacks[selectedStudentId].responsiveness > 0 &&
//       updatedFeedbacks[selectedStudentId].levelOfUnderstanding > 0 &&
//       updatedFeedbacks[selectedStudentId].learningPace > 0 &&
//       updatedFeedbacks[selectedStudentId].overallPerformance > 0;

//     // Update isCompleted based on the criteria
//     updatedFeedbacks[selectedStudentId].isCompleted = allCriteriaCompleted;

//     // Update the state with the new feedbacks
//     setFeedbacks(updatedFeedbacks);

//     // Check if all users' ratings are filled
//     const areAllRatingsFilled = Object.values(updatedFeedbacks).every(
//       (feedback) => feedback.isCompleted || feedback.isAbsent
//     );

//     // Update the state variable for all ratings filled
//     setAllRatingsFilled(areAllRatingsFilled);
//   };

//   useEffect(() => {
//     if (studentsList?.length) {
//       initializeFeedbacks();
//       setSelectedStudentId(studentsList[0]._id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const onPressAbsent = () => {
//     handleFeedbackChange("isAbsent", true);
//     if (!allRatingsFilled) {
//       const nextIndex = Object.keys(feedbacks).findIndex(
//         (id) => id !== selectedStudentId && !feedbacks[id].isCompleted && !feedbacks[id].isAbsent
//       );
//       if (nextIndex !== -1) {
//         setSelectedStudentId(Object.keys(feedbacks)[nextIndex]);
//       }
//     }
//   };

//   const onPressNextOrSubmit = () => {
//     if (!allRatingsFilled) {
//       const nextIndex = Object.keys(feedbacks).findIndex(
//         (id) => !feedbacks[id].isCompleted && !feedbacks[id].isAbsent
//       );
//       if (nextIndex !== -1) {
//         setSelectedStudentId(Object.keys(feedbacks)[nextIndex]);
//       }
//     } else {
//       if (onSubmit) {
//         onSubmit(
//           Object.values(feedbacks).map((feedback) => ({
//             studentId: feedback.studentId,
//             feedback: feedback.feedback,
//             attentiveness: feedback.attentiveness,
//             responsiveness: feedback.responsiveness,
//             levelOfUnderstanding: feedback.levelOfUnderstanding,
//             learningPace: feedback.learningPace,
//             overallPerformance: feedback.overallPerformance,
//             isPresent: !feedback.isAbsent
//           }))
//         );
//         setIsSubmitted(true);
//       }
//     }
//   };

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
//           alt="logo"
//         />
//         <Flex className={classes.sectionContent}>
//           {!isSubmitted ? (
//             <Flex className={classes.heading}>
//               <Text className={classes.title}>Class Ended</Text>
//               <Text className={classes.subTitle}>Submit your feedback</Text>
//             </Flex>
//           ) : null}
//           <Flex className={classes.userSection}>
//             {studentsList?.map((student) => (
//               <Tooltip
//                 key={student?._id}
//                 label={`${student?.first_name ?? ""} ${
//                   student?.last_name ?? ""
//                 }`}
//                 withArrow
//               >
//                 <Flex className={classes.avatarContainer}>
//                   <Avatar
//                     classNames={{
//                       root: cx(classes.avatar, {
//                         [classes.avatarCompleted]:
//                           feedbacks[student?._id]?.isCompleted,
//                         [classes.avatarAbsent]:
//                           feedbacks[student?._id]?.isAbsent,
//                         [classes.avatarSelected]:
//                           `${student?._id}` === selectedStudentId,
//                       }),
//                       image: cx({
//                         [classes.avatarNotSelected]:
//                           `${student?._id}` !== selectedStudentId,
//                       }),
//                       placeholder: cx({
//                         [classes.avatarNotSelected]:
//                           `${student?._id}` !== selectedStudentId,
//                       }),
//                     }}
//                     // src={""}
//                     alt={"avatar"}
//                     onClick={() => setSelectedStudentId(student?._id)}
//                   />
//                   <Text className={classes.avatarName} lineClamp={1}>{`${
//                     student?.first_name ?? ""
//                   } ${student?.last_name ?? ""}`}</Text>
//                 </Flex>
//               </Tooltip>
//             ))}
//           </Flex>
//         </Flex>
//       </Flex>
//       <Flex className={classes.section} bg={"#FFFAED"}>
//         {!isSubmitted ? (
//           <Flex className={classes.ratingSection}>
//             <Flex className={classes.ratingRow}>
//               <Text className={classes.ratingText}>Attentiveness</Text>
//               <RatingStars
//                 isInteractive
//                 _rating={feedbacks[selectedStudentId]?.attentiveness ?? 0}
//                 onChange={(value: string | number | boolean) =>
//                   handleFeedbackChange("attentiveness", value)
//                 }
//               />
//             </Flex>
//             <Flex className={classes.ratingRow}>
//               <Text className={classes.ratingText}>Responsiveness</Text>
//               <RatingStars
//                 isInteractive
//                 _rating={feedbacks[selectedStudentId]?.responsiveness ?? 0}
//                 onChange={(value: string | number | boolean) =>
//                   handleFeedbackChange("responsiveness", value)
//                 }
//               />
//             </Flex>
//             <Flex className={classes.ratingRow}>
//               <Text className={classes.ratingText}>Level of Understanding</Text>
//               <RatingStars
//                 isInteractive
//                 _rating={
//                   feedbacks[selectedStudentId]?.levelOfUnderstanding ?? 0
//                 }
//                 onChange={(value: string | number | boolean) =>
//                   handleFeedbackChange("levelOfUnderstanding", value)
//                 }
//               />
//             </Flex>
//             <Flex className={classes.ratingRow}>
//               <Text className={classes.ratingText}>Learning Pace</Text>
//               <RatingStars
//                 isInteractive
//                 _rating={feedbacks[selectedStudentId]?.learningPace ?? 0}
//                 onChange={(value: string | number | boolean) =>
//                   handleFeedbackChange("learningPace", value)
//                 }
//               />
//             </Flex>
//             <Flex className={classes.ratingRow}>
//               <Text className={classes.ratingText}>Overall Performance</Text>
//               <RatingStars
//                 isInteractive
//                 _rating={feedbacks[selectedStudentId]?.overallPerformance ?? 0}
//                 onChange={(value: string | number | boolean) =>
//                   handleFeedbackChange("overallPerformance", value)
//                 }
//               />
//             </Flex>
//             <Textarea
//               w={"100%"}
//               classNames={{
//                 input: classes.textInput,
//               }}
//               placeholder="Remarks"
//               value={feedbacks[selectedStudentId]?.feedback}
//               onChange={(e) =>
//                 handleFeedbackChange("feedback", e.currentTarget.value)
//               }
//             />
//             <Flex className={classes.ratingRow}>
//               <MantineButton
//                 fullWidth
//                 classNames={{
//                   root: classes.absentButton,
//                   label: classes.absentButtonLabel,
//                   inner: classes.absentButtonInner,
//                   section: classes.absentButtonSection,
//                 }}
//                 onClick={onPressAbsent}
//               >
//                 Absent
//               </MantineButton>
//               <Button
//                 fullWidth
//                 label={allRatingsFilled ? "Submit Feedback" : "Next"}
//                 onClick={onPressNextOrSubmit}
//               />
//             </Flex>
//           </Flex>
//         ) : (
//           <Flex className={classes.thankYouSection}>
//             <Image h={scaler(92)} w={scaler(86)} src={icon} alt="logo" />
//             <Text className={classes.title} mt={scaler(13)}>
//               Thank you For Submitting Feedback
//             </Text>
//             <Text className={classes.subTitle} mb={scaler(13)}>
//               Feedback will help parents evaluate students performance
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
