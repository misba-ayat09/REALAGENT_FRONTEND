import React, { useEffect, useState } from 'react';
import SimpleButton from '../../../../components/Button/SimpleButton';
import { Divider, Flex, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import styles from './qualifying-questions.module.css';
import TrashButton from '../../../../components/Button/TrashButton';
import EditButton from '../../../../components/Button/EditButton';
import WithModal from '../../../../components/Modal/WithModal';
import ConsentModal from '../../../../components/Modal/ConsentModal';
import { useLoadingState } from '../../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  CreateQualifyingQuestionFormData,
  qualifyingQuestionAPI,
} from '../../../../store/features/DataSources/DataSourceAPI/qualifyingQuestionAPI';
import { getQualifyingQuestions } from '../../../../store/features/DataSources';
import { ApiResponseStatus } from '../../../../services';
import { toast } from 'sonner';
import { cx } from '../../../../helper';
import { datasourceAPI } from '../../../../store/features/DataSources/DataSourceAPI/datasourceAPI';

const QualifyingQuestionsSource: React.FC = () => {
  const theme = useMantineTheme();

  const [isLoading, startLoading, finishLoading] = useLoadingState();
  const [isEditingLoading, startEditingLoading, finishEditingLoading] = useLoadingState();
  const [questionAnswer, setQuestionAnswer] = useState<CreateQualifyingQuestionFormData>({ question: '', answer: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const userId = useAppSelector((state) => state.authentication.userData.userId);

  const [editQuestionAnswer, setEditQuestionAnswer] = useState<CreateQualifyingQuestionFormData>({
    question: '',
    answer: '',
  });
  const allQualifyingQuestions = useAppSelector((state) => state.dataSources.allQualifyingQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getQualifyingQuestions());
  }, [dispatch]);

  const validateQuestion = (question: string) => {
    const hasMeaningfulWords = /\b\w{3,}\b/.test(question);
    const containsVowels = /[aeiouAEIOU]/.test(question);
    const noRepeatingChars = !/(.)\1{3,}/.test(question);

    return hasMeaningfulWords && containsVowels && noRepeatingChars;
  };

  const createQuestionAnswer = async () => {
    if (!questionAnswer.question || !questionAnswer.answer) {
      toast('Please fill all the fields');
      return;
    }
    if (!validateQuestion(questionAnswer.question)) {
      toast.error('Please enter a meaningful question');
      return;
    }
    startLoading();
    const result = await qualifyingQuestionAPI.createQualifyingQuestion(questionAnswer);
    if (result?.status === ApiResponseStatus.SUCCESS) {
      dispatch(getQualifyingQuestions());
      datasourceAPI.uploadQualifyingQuestions(userId ?? '');
      setQuestionAnswer({ question: '', answer: '' });
      toast.success('Qualifying Question pair created successfully');
    } else {
      toast.error('Failed to create Qualifying Question pair');
    }
    finishLoading();
  };

  const onQuestionAnswerEdit = (id: string, question: string, answer: string) => {
    setEditingId(id);
    setEditQuestionAnswer({ question, answer });
  };

  const onSaveEdit = async (id: string) => {
    startEditingLoading();
    try {
      const result = await qualifyingQuestionAPI.updateQualifyingQuestion(id, editQuestionAnswer);
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getQualifyingQuestions());
        datasourceAPI.uploadQualifyingQuestions(userId ?? '');
        setEditingId(null);
        toast.success('Qualifying Question pair updated successfully');
      } else {
        toast.error('Failed to update Qualifying Question pair');
      }
    } catch (error) {
      console.error('Error updating Qualifying Question pair:', error);
      toast.error('An error occurred while updating the Qualifying Question pair');
    }
    finishEditingLoading();
  };

  const onDelete = async (id: string) => {
    try {
      const result = await qualifyingQuestionAPI.deleteQualifyingQuestion(id);
      if (result?.status === ApiResponseStatus.SUCCESS) {
        dispatch(getQualifyingQuestions());
        datasourceAPI.uploadQualifyingQuestions(userId ?? '');
        toast.success('Qualifying Question pair deleted successfully');
      } else {
        toast.error('Failed to delete Qualifying Question pair');
      }
    } catch (error) {
      console.error('Error deleting Qualifying Question pair:', error);
      toast.error('An error occurred while deleting the Qualifying Question pair');
    }
  };

  return (
    <div>
      <Flex>
        <Flex w={'45%'} direction={'column'} gap={'24px'}>
          <TextInput
            variant="filled"
            label="Add Question"
            placeholder="Add questions here"
            classNames={{ input: styles.textInputSmall }}
            value={questionAnswer.question}
            onChange={(e) =>
              setQuestionAnswer({
                ...questionAnswer,
                question: e.currentTarget.value,
              })
            }
          />
          <Textarea
            variant="filled"
            label="Add Answer"
            placeholder="Add Text data to train your Assistant"
            classNames={{ input: styles.textareaInputLarge }}
            value={questionAnswer.answer}
            onChange={(e) =>
              setQuestionAnswer({
                ...questionAnswer,
                answer: e.currentTarget.value,
              })
            }
          />
          <div>
            <SimpleButton
              text="Add Question"
              mt={24}
              disabled={!questionAnswer.question || !questionAnswer.answer}
              onClick={createQuestionAnswer}
              loading={isLoading}
            />
          </div>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex w={'65%'} direction={'column'} gap={'24px'}>
          {allQualifyingQuestions.map((qna) => (
            <Flex key={qna._id} w={'100%'} justify={'space-between'} align={'center'} gap={'16px'} direction={'column'}>
              <Flex w={'100%'} justify={'space-between'} align={'center'} gap={'8px'}>
                <TextInput
                  w={'100%'}
                  variant="filled"
                  placeholder="Add questions here"
                  classNames={{
                    input: cx(styles.textInputSmall, {
                      [styles.inputDisplay]: editingId !== qna._id,
                    }),
                  }}
                  value={editingId === qna._id ? editQuestionAnswer.question : qna.question}
                  onChange={(e) =>
                    setEditQuestionAnswer({
                      ...editQuestionAnswer,
                      question: e.currentTarget.value,
                    })
                  }
                  readOnly={editingId !== qna._id}
                />
                {editingId === qna._id ? (
                  <SimpleButton text="Save" w={'80px'} onClick={() => onSaveEdit(qna._id)} loading={isEditingLoading} />
                ) : (
                  <>
                    <EditButton
                      iconSize={16.17}
                      defaultColor={theme.colors.azureBlue[1]}
                      iconColor={theme.colors.azureBlue[6]}
                      onClick={() => onQuestionAnswerEdit(qna._id, qna.question, qna.answer)}
                    />
                    <WithModal
                      onAccept={() => onDelete(qna._id)}
                      ModalComponent={(e) => (
                        <ConsentModal
                          text={'Are you sure you want to delete this?'}
                          subText={'This action cannot be undone'}
                          {...e}
                        />
                      )}>
                      <TrashButton
                        iconSize={16.17}
                        defaultColor={theme.colors.azureBlue[1]}
                        iconColor={theme.colors.azureBlue[6]}
                      />
                    </WithModal>
                  </>
                )}
              </Flex>
              <Textarea
                w={'100%'}
                variant="filled"
                placeholder="Add Text data to train your Assistant"
                classNames={{
                  input: cx(styles.textareaInputSmall, {
                    [styles.inputDisplay]: editingId !== qna._id,
                  }),
                }}
                value={editingId === qna._id ? editQuestionAnswer.answer : qna.answer}
                onChange={(e) =>
                  setEditQuestionAnswer({
                    ...editQuestionAnswer,
                    answer: e.currentTarget.value,
                  })
                }
                readOnly={editingId !== qna._id}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default QualifyingQuestionsSource;
