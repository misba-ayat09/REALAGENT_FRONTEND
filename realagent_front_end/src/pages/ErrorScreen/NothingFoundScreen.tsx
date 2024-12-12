import { Text, Button, Container, Group, Flex, Image, AppShell } from '@mantine/core';
import classes from './Nothingfound.module.css';
import { useNavigate } from 'react-router-dom';
import { ErrorText, NotfoundError } from '../../assets';
import { Header } from '../../components';

export default function NothingFoundScreen() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <AppShell>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <div className={classes.root}>
        <Container h={'100%'} w={'100%'}>
          <Flex
            align={'center'}
            justify={'center'}
            style={{
              background: 'linear-gradient(to bottom, transparent 95%, white 5%)',
            }}>
            <Image src={NotfoundError} alt="404" className={classes.image} />
          </Flex>
          <Flex
            bg={'#FFFFFF'}
            direction="column"
            h={'100%'}
            justify={'center'}
            align="center"
            className={classes.contentWrapper}>
            <div className={classes.errorText}>
              <Image src={ErrorText} alt="404" className={classes.image} />
            </div>
            <Text size="lg" ta="center" className={classes.description}>
              Uh-oh, it seems you've wandered into a digital dead end. Don't worry,
            </Text>
            <Text size="24px" ta="center" ff={'Roboto'}>
              the<b> homepage </b>is just a click away!
            </Text>
          </Flex>

          <Group justify="center" bg={'white'} p={20}>
            <Button className={classes.button} variant="light" size="md" onClick={handleNavigateHome}>
              Homepage
            </Button>
          </Group>
        </Container>
      </div>
    </AppShell>
  );
}
