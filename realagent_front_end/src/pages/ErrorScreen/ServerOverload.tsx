import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './Error.module.css';

export default function ServerOverload() {

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>503</div>
        <Title className={classes.title}>All of  our servers are busy</Title>
        <Text size="lg" ta="center" className={classes.description}>
          We cannot handle your request right now, please wait for a couple of minute and refresh
          the page. Our team is already working on this issue.
        </Text>
        <Group justify="center">
          <Button className={classes.button} variant="white" size="xl" onClick={handleRefresh}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
