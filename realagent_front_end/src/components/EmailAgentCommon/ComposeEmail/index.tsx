import { useEffect, useState } from 'react';
import ComposeEmailRoot from './ComposeEmailRoot';
import { FlexBox } from '../../common/FlexBox/FlexBox';
import GeneratedEmailContentCard from '../GeneratedEmailContentCard/GeneratedEmailContentCard';
import { Box, Button, Input, LoadingOverlay, Text } from '@mantine/core';
import { email_agent_padding, email_agent_common_bg } from '..';
import { IconPaperclip, IconSend2 } from '@tabler/icons-react';
import UploadedFile from '../UploadedFilePreview';
import classes from './index.module.css';
import { emailAgentAPI, Schema$MessagePart } from '../../../store/features/emailAgent/emailAgentAPI';
import { NotificationParams, validate, validateAndNotify } from '../../../utils';
import { toast } from 'sonner';
import { generateAIEmail, TemplateType } from '../../../store/features/emailAgent/aiEmailServiceAPI';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Link } from '@mantine/tiptap';

import { Dropzone } from '@mantine/dropzone';
import { useSearchParams } from 'react-router-dom';
import { ConnectedResponse, userApi } from '../../../store/features/authentication/userApi';
import { useEditor } from '@tiptap/react';
import CustomEditor from '../../Editor/Editor';
import { useInactivityDraftSaver } from '../../../hooks';
import { EmailProps, EmailStateNames } from '../../../hooks/useInactivityDraftSaver';
import EmailService from '../../../api/services/EmailService';
import { fileToBase64 } from '../../../utils/fileToBase64';

const Index = () => {
  const [emailDetails, setEmailDetails] = useState<Partial<EmailProps>>({} as EmailProps);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedResponse | null>(null);
  // const allDrafts = useAppSelector((state) => state.email.emails.DRAFT || []);

  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [emailTemplates, setEmailTemplates] = useState<TemplateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draftId');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: signature,

    onUpdate: (e) => {
      setEmailDetails((prev) => ({ ...prev, [EmailStateNames.BODY]: e.editor?.getHTML() ?? '' }));
    },
  });

  useEffect(() => {
    // Fetch draft email if draftId exists
    if (draftId) {
      const fetchDraft = async () => {
        try {
          const response = await EmailService.getEmail(draftId);

          if (response?.result) {
            setEmailDetails((prev) => ({
              ...prev,
              [EmailStateNames.CC]: response.result[EmailStateNames.CC] ?? [],
              [EmailStateNames.FROM]: response.result[EmailStateNames.FROM]?.[0] ?? '',
              [EmailStateNames.SUBJECT]: response.result[EmailStateNames.SUBJECT] ?? '',
              [EmailStateNames.BODY]: response.result[EmailStateNames.BODY] ?? '',
              [EmailStateNames.ATTACHMENTS]: response.result[EmailStateNames.ATTACHMENTS] ?? [],
            }));

            editor?.commands.setContent(response.result[EmailStateNames.BODY] ?? '');
          } else {
            console.error('No result found in the response.');
          }
        } catch (error) {
          console.error('Error fetching draft:', error);
          setEmailDetails({
            [EmailStateNames.CC]: [],
            [EmailStateNames.FROM]: '',
            [EmailStateNames.SUBJECT]: '',
            [EmailStateNames.BODY]: '',
            [EmailStateNames.ATTACHMENTS]: [],
          });
        }
      };

      fetchDraft();
    } else {
      // Fetch email signature
      emailAgentAPI
        .getSignature()
        .then((res) => {
          setSignature(res?.result ?? '');
          editor?.commands.setContent(res?.result ?? '');

          setEmailDetails((prev) => ({
            ...prev,
            [EmailStateNames.BODY]: (prev[EmailStateNames.BODY] ?? '') + (res?.result ?? ''),
          }));
        })
        .catch((e) => console.error('Error fetching signature:', e));
    }

    // Fetch connected accounts
    userApi.getConnectedAccounts().then((data) => {
      setConnectedAccounts(data?.result.find((account) => account.icon === 'google') ?? null);
    });

    // Optional cleanup or additional logic
    return () => {
      // Cleanup if needed
    };
  }, [draftId]);

  useInactivityDraftSaver({
    cachedEmail: emailDetails,
    draftId,
    timeout: 5000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmail = () => {
    const failedNotifications: NotificationParams[] = [];
    let errorOccurred = false;
    Object.entries(emailDetails).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value?.length === 0) {
          toast.error(`Please fill the ${key} field`);
          errorOccurred = true;
          return;
        }
      } else if (key !== 'cc' && value === '') {
        toast.error(`Please fill the ${key} field`);
        errorOccurred = true;
        return;
      }
    });

    validateAndNotify(
      validate.email,
      connectedAccounts?.email ?? '',
      {
        title: 'invalid meeting email used in from',
        message: 'invalid meeting email used in from ',
      },
      failedNotifications,
    );

    if (emailDetails.cc && emailDetails?.cc?.length > 0) {
      emailDetails.cc.forEach((email) => {
        validateAndNotify(
          validate.email,
          email,
          {
            title: 'invalid meeting email used in cc',
            message: 'invalid meeting email  used in cc',
          },
          failedNotifications,
        );
      });
    }

    emailDetails.to?.forEach((email) => {
      validateAndNotify(
        validate.email,
        email,
        {
          title: 'invalid meeting email used in to',
          message: 'invalid meeting email  used in to',
        },
        failedNotifications,
      );
    });

    failedNotifications.forEach((notification) => {
      toast.error(notification.message);
    });

    if (failedNotifications?.length > 0) {
      errorOccurred = true;
    }

    if (errorOccurred) {
      return;
    }

    setIsLoading(true);
    try {
      emailAgentAPI.sendEmail({
        email: {
          from: { email: emailDetails.from ?? connectedAccounts?.email ?? '' },
          to: emailDetails.to?.map((email) => ({ email })) ?? [],
          cc: emailDetails.cc?.map((email) => ({ email })) ?? [],
          subject: emailDetails.subject ?? '',
          body: { html: emailDetails.body },
          attachments: emailDetails.attachments ?? [],
        },
      });
      toast.success('Email sent successfully!');
      setEmailDetails({});
    } catch (error) {
      toast.error('Failed to send email');
      console.error('Send email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropFiles = async (files: File[]) => {
    try {
      const attachments: Schema$MessagePart[] = await Promise.all(
        Array.from(files).map(async (file) => {
          const base64String = await fileToBase64(file, {
            allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
            maxSizeInBytes: 5 * 1024 * 1024,
          });

          return {
            filename: file.name,
            mimeType: file.type,
            body: {
              data: base64String,
              size: file.size,
            },
            headers: [
              { name: 'Content-Type', value: file.type },
              { name: 'Content-Disposition', value: `attachment; filename="${file.name}"` },
            ],
          };
        }),
      );
      setEmailDetails((prev) => ({ ...prev, attachments }));
    } catch (error) {
      console.error('Error:', (error as Error).message);
      throw error;
    }
  };

  const generateAiEmail = async () => {
    setIsLoading(true);

    if (!aiPrompt || aiPrompt.trim() === '') {
      toast.error('Please enter some content to generate email');
      setIsLoading(false);

      return;
    }
    const response = await generateAIEmail({ user_content: aiPrompt });
    if (Array.isArray(response?.templates)) {
      setEmailTemplates(response?.templates);
      setIsLoading(false);
    }
  };

  const handleEmailContentCardSelection = (template: TemplateType) => {
    setEmailTemplates([]);
    setAiPrompt('');
    editor?.commands.setContent(template?.body + '<br>' + signature);
    setEmailDetails((prev) => ({
      ...prev,
      [EmailStateNames.SUBJECT]: template?.subject,
      [EmailStateNames.BODY]: template?.body + '\n' + signature,
    }));
  };

  // const noEmailSelected =  !selectedTemplate?.body;
  return (
    <ComposeEmailRoot>
      <LoadingOverlay visible={isLoading} style={{ position: 'fixed', width: '100%', height: '100%' }} />
      <FlexBox
        padding={email_agent_padding}
        container
        style={{
          width: '100%',
          paddingTop: '10px',
          paddingBottom: '10px',
          gap: '20px',
        }}>
        <Button onClick={sendEmail} rightSection={<IconSend2 color="white" size={20} />} c={'white'} variant="filled">
          Send
        </Button>
        {/* attach file btn  */}
        <FlexBox
          container
          style={{
            background: email_agent_common_bg,
            position: 'relative',
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconPaperclip height={20} width={20} />
          <Dropzone
            onReject={() => null}
            maxSize={5 * 1024 ** 2}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            onDrop={handleDropFiles}
          />
        </FlexBox>
      </FlexBox>
      <ComposeEmailRoot.ComposeEmailInputWithLabel
        name={EmailStateNames.FROM}
        label="From"
        disabled={true}
        value={connectedAccounts?.email ?? ''}
        onChange={handleChange}
      />
      <ComposeEmailRoot.EmailDivider />
      <ComposeEmailRoot.ComposeEmailTagInputWithLabel
        name={EmailStateNames.TO}
        label="To"
        value={emailDetails.to ?? []}
        onChange={(val) => {
          setEmailDetails((prev) => ({ ...prev, to: val }));
        }}
      />
      <ComposeEmailRoot.EmailDivider />
      <ComposeEmailRoot.ComposeEmailInputWithLabel
        name={EmailStateNames.SUBJECT}
        style={{ minWidth: '500px', flexShrink: 1 }}
        label="Subject"
        value={emailDetails.subject ?? ''}
        onChange={handleChange}
      />
      <ComposeEmailRoot.EmailDivider />
      <ComposeEmailRoot.ComposeEmailTagInputWithLabel
        name={EmailStateNames.CC}
        label="CC"
        value={emailDetails[EmailStateNames.CC] ?? []}
        onChange={(e) => {
          setEmailDetails((prev) => ({ ...prev, [EmailStateNames.CC]: e }));
        }}
      />
      <ComposeEmailRoot.EmailDivider />

      <FlexBox
        padding={email_agent_padding}
        container
        flexDirection="column"
        style={{ gap: '30px', width: '100%', marginTop: 10 }}>
        <Input
          w={'60%'}
          styles={{
            input: {
              background: email_agent_common_bg,
              outline: 'none',
              border: 'none',
              borderRadius: '20px',
              height: '44px',
            },
          }}
          placeholder="Ask AI to write email"
          value={aiPrompt}
          rightSectionPointerEvents="fill"
          onChange={(e) => {
            setAiPrompt(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              generateAiEmail();
            }
          }}
          rightSection={
            <Box onClick={() => generateAiEmail()}>
              <FlexBox
                container
                style={{
                  background: 'rgba(0, 123, 255, 1)',
                  flexShrink: 1,
                  height: '38px',
                  width: '38px',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconSend2 color="white" size={20} />
              </FlexBox>
            </Box>
          }
        />
        <FlexBox container flexDirection="row" style={{ gap: '20px', width: '100%', flexWrap: 'wrap' }}>
          {emailTemplates.map((template, idx) => (
            <GeneratedEmailContentCard
              onClick={() => handleEmailContentCardSelection(template)}
              title={template.subject}
              key={idx + 'email-template-card'}
              description={template.body}
              labeledNumber={idx + 1}
            />
          ))}
        </FlexBox>
      </FlexBox>

      <CustomEditor editorHeight="500" editorWidth="100%" editor={editor} />
      {emailDetails?.attachments && emailDetails?.attachments?.length > 0 && (
        <FlexBox
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <ComposeEmailRoot.EmailDivider />
          <Box
            style={{
              padding: email_agent_padding,
              paddingBottom: '20px',
              paddingTop: '20px',
            }}>
            <Text className={classes.attachementTitle}>Attachments</Text>
            <FlexBox container style={{ flexDirection: 'row', gap: '10px' }}>
              {emailDetails?.attachments?.map((file, idx) => (
                <UploadedFile
                  key={`uploaded-file-${idx}`}
                  fileName={file.filename ?? 'file'}
                  onDelete={() => {
                    setEmailDetails((prev) => ({
                      ...prev,
                      attachments: prev.attachments?.filter((f) => f.filename !== file.filename),
                    }));
                  }}
                />
              ))}
            </FlexBox>
          </Box>
        </FlexBox>
      )}
    </ComposeEmailRoot>
  );
};

export default Index;
