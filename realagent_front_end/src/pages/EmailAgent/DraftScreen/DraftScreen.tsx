import { useEffect } from 'react';
import { InboxEmailPreviewCard } from '../../../components/EmailAgentCommon';
import { useAppDispatch, useAppSelector } from '../../../store';
import { InboxEmailType } from '../../../store/features/emailAgent/emailAgentAPI';
import ScreenWrapper from '../ScreenWrapper';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGES } from '../../../router/route';
import { Flex, LoadingOverlay } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import EmailThunks from '../../../store/features/emailAgent/thunks';

const DraftScreen = () => {
  const dispatch = useAppDispatch();
  const allDrafts = useAppSelector((state) => state.email.emails.DRAFT || []);
  const isLoding = useAppSelector((state) => state.email.status) === 'loading';
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(EmailThunks.getDraft({}));
  }, []);

  function handleViewEmail(e: InboxEmailType): void {
    const queryParams = new URLSearchParams({ draftId: e.id }).toString();
    navigate(`${PATH_PAGES.emailHome}?${queryParams}`);
  }

  // const handleDeleteDraft = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
  //   e.preventDefault();
  //   e.stopPropagation();
    // dispatch(deleteDraft(id)).then(() => dispatch(getAllDrafts()));
  // };

  return (
    <ScreenWrapper>
      <LoadingOverlay visible={isLoding} />
      <Flex bg="white" direction="column">
        {allDrafts?.length === 0 ? (
          <Flex align="center" justify="center" w="100%" h="500px" p="20px">
            No drafts found
          </Flex>
        ) : (
          allDrafts?.map((labelledEmail) => (
            <InboxEmailPreviewCard
              onDelete={()=>{}}
              // onDelete={handleDeleteDraft}
              hanldeClick={handleViewEmail}
              email={labelledEmail}
              mx=""
              key={randomId()}
            />
          ))
        )}
      </Flex>
    </ScreenWrapper>
  );
};

export default DraftScreen;
