import { Card, Skeleton } from "@mantine/core";
import classes from "./LoadingSkeleton.module.css";

const LoadingSkeletonCard = () => {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Skeleton height={150} mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </Card>
  );
};

export default LoadingSkeletonCard;
