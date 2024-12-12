import { Button, Divider, Text } from '@mantine/core';
import { FlexBox } from '../../../components/common/FlexBox/FlexBox';
import ConfigureRoot from '../../../components/EmailAgentCommon/Configure/ConfigureRoot';
import ScreenWrapper from '../ScreenWrapper';
import { email_agent_padding, email_divider_clr } from '../../../components/EmailAgentCommon';
import { useEffect, useState } from 'react';
import { emailAgentAPI } from '../../../store/features/emailAgent/emailAgentAPI';
import { Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import CustomEditor from '../../../components/Editor/Editor';
import { ConnectedResponse, userApi } from '../../../store/features/authentication/userApi';
const ConfigureScreen = () => {
  const [signature, setSignature] = useState('');
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedResponse | null>(null);
  // const content: string = signature
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
      // console.log(e.editor.getHTML())
      setSignature(e.editor?.getHTML() ?? '');
    },
  });
  useEffect(() => {
    emailAgentAPI.getSignature().then((data) => {
      setSignature(data?.result ?? '');
      editor?.commands.setContent(data?.result ?? '');
    });
    userApi.getConnectedAccounts().then((data) => {
      setConnectedAccounts(data?.result.find((account) => account.icon === 'google') ?? null);
    });
  }, []);

  const saveSignature = () => {
    emailAgentAPI.updateSignature(signature).then((data) => {
      setSignature(data?.result ?? '');
    });
  };

  return (
    <ScreenWrapper>
      <Divider styles={{ root: { borderColor: email_divider_clr } }} size={2} />
      <FlexBox padding={email_agent_padding} container flexDirection="column" style={{ gap: '15px' }}>
        <ConfigureRoot.ConfigureInput
          style={{ marginTop: 20, gap: 10 }}
          disabled={true}
          placeholder="Enter name here"
          label="Your Name"
          value={connectedAccounts?.username ?? ''}
          handleChange={() => {}}
        />
        <ConfigureRoot.ConfigureInput
          style={{ gap: 10 }}
          placeholder="Enter email Id"
          disabled={true}
          label="Email"
          value={connectedAccounts?.email ?? ''}
          handleChange={() => {}}
        />
        <FlexBox container flexDirection="column" style={{ gap: '10', alignItems: 'flex-start' }}>
          <Text mb={10}>Signature</Text>
          <CustomEditor editorHeight="300" editorWidth="450" editor={editor} />
        </FlexBox>
        <Button onClick={saveSignature} c={'white'} variant="filled" w={'100px'}>
          Save
        </Button>
        {/* <Box style={{marginTop:"20px"}}>
            <Box className={classes.label}>Attach the signature from a file instead (text, HTML or image)</Box>
            <CustomisableFileUploader style={{marginTop:"10px"}} />
          </Box> */}
      </FlexBox>
    </ScreenWrapper>
  );
};

export default ConfigureScreen;
