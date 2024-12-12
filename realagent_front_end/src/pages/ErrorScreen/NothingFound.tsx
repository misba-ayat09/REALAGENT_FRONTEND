import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './Error.module.css';
import { useNavigate } from 'react-router-dom';

export default function NothingFound() {

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Nothing to show here</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Page you are trying to open does not exist. You may have mistyped the address or
          the page has been moved to another URL. If you think this  is an error contact support.
        </Text>
        <Group justify="center">
          <Button className={classes.button} variant="white" size="xl" onClick={handleNavigateHome}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
