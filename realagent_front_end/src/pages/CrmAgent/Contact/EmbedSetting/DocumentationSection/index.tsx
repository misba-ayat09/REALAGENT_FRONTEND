import React from 'react';
import { Divider, Flex, Paper, Text, useMantineTheme } from '@mantine/core';
import styles from './index.module.css';
import { CopyToClipboardButton } from '../../../../../components';

import data from './doc-data';
import CodeBlock from '../../../../../components/CodeBlock';
import { useAppSelector } from '../../../../../store';

const DocumentationSection: React.FC = () => {
  const theme = useMantineTheme();
  const [apiKey] = useAppSelector((state) => state.chatBot.apiKeys);

  const docData = data('');
  const docDataWithKey = data(apiKey?.apiKeyId);

  return (
    <div>
      <Flex className={styles.flexContainer}>
        <Flex className={styles.leftSection} w={'100%'} maw={'45%'} miw={'300px'}>
          <Flex direction={'column'} gap={'24px'} w={'100%'} maw={'386px'}>
            <Text>You can install the realtorbots-ai package via npm</Text>
            <Flex w={'100%'} justify={'space-between'} align={'center'} gap={'8px'} maw={'386px'}>
              <CodeBlock value={docData.npmInstallation.command} className={styles.codeBlockSmall} />
              <CopyToClipboardButton
                value={docDataWithKey.npmInstallation.command}
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[1]}
                iconColor={theme.colors.azureBlue[7]}
                copiedColor={theme.colors.azureBlue[2]}
              />
            </Flex>
            <Text>or use via unpkg:</Text>
            <Flex w={'100%'} justify={'space-between'} align={'flex-start'} gap={'8px'} maw={'386px'}>
              <CodeBlock value={docData.unpkgUsage.code} className={styles.codeBlockBig} />
              <CopyToClipboardButton
                value={docDataWithKey.unpkgUsage.code}
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[1]}
                iconColor={theme.colors.azureBlue[7]}
                copiedColor={theme.colors.azureBlue[2]}
              />
            </Flex>
            {/* <Text>Create a config.js file and paste your access token</Text> */}
            {/* <Flex w={'100%'} justify={'space-between'} align={'flex-start'} gap={'8px'} maw={'386px'}>
              <CodeBlock value={docData.configSetup.code} className={styles.codeBlockMedium} />
              <CopyToClipboardButton
                value={docDataWithKey.configSetup.code}
                iconSize={16.17}
                defaultColor={theme.colors.azureBlue[1]}
                iconColor={theme.colors.azureBlue[7]}
                copiedColor={theme.colors.azureBlue[2]}
              />
            </Flex> */}
          </Flex>
        </Flex>
        <Flex px={'20px'} justify={'center'}>
          <Divider orientation="vertical" />
        </Flex>
        <Flex className={styles.rightSection} w={'100%'} maw={'55%'} miw={'320px'} direction={'column'} gap={'24px'}>
          <Paper>
            <Text className={styles.title}>Embed on Site</Text>
            <Text className={styles.subTitle}>
              To add the chatbot anywhere on your website, add this frame to your html code
            </Text>
          </Paper>
          <Flex w={'100%'} justify={'space-between'} align={'flex-start'} gap={'8px'} maw={'622px'}>
            <CodeBlock value={docData.embedOnSite.code} className={styles.codeBlockMedium} />
            <CopyToClipboardButton
              value={docDataWithKey.embedOnSite.code}
              iconSize={16.17}
              defaultColor={theme.colors.azureBlue[1]}
              iconColor={theme.colors.azureBlue[7]}
              copiedColor={theme.colors.azureBlue[2]}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default DocumentationSection;
