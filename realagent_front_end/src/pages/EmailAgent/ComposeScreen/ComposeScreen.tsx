import { LoadingOverlay } from '@mantine/core';
import { ComposeEmail } from '../../../components/EmailAgentCommon';
import { useAppSelector } from '../../../store';
import ScreenWrapper from '../ScreenWrapper';

const ComposeScreen = () => {
  const isLoading = useAppSelector((state) => state.email.status) === 'loading';
  return (
    <ScreenWrapper>
      <LoadingOverlay visible={isLoading} />
      <ComposeEmail />
    </ScreenWrapper>
  );
};

export default ComposeScreen;
