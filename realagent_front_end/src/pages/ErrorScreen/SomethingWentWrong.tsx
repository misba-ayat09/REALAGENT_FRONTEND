import { Title, Container, Group, Flex } from '@mantine/core';
import classes from './Error.module.css';
import { useErrorBoundary } from 'react-error-boundary';
import SimpleButton from '../../components/Button/SimpleButton';

export default function SomethingWentWrong() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className={classes.root}>
      <Container className={classes.root} h={'100vh'}>
        <Flex direction={'column'} h={'100%'} w={'100%'} justify={'center'} align={'center'}>
          <div className={classes.label}>500</div>
          <Title className={classes.title}>Something bad just happened</Title>
          <Group justify="center" pt={'24px'}>
            <SimpleButton className={classes.button} text="Try again" onClick={resetBoundary} />
          </Group>
        </Flex>
      </Container>
    </div>
  );
}
