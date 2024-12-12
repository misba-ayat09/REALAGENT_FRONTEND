type DocData = {
  npmInstallation: {
    command: string;
  };
  unpkgUsage: {
    code: string;
  };
  embedOnSite: {
    code: string;
  };
};

const getEmbedOnSiteCode = (key?: string): string => {
  return `<script src="https://storage.googleapis.com/realtorbot-public/index.js"></script>
<chatbot-ai id="chatbot-ai" key="${key ? key : '************************'}"></chatbot-ai>`;
};

const docData = (key?: string): DocData => ({
  npmInstallation: {
    command: 'npm i @realtorbotsai/chatbot',
  },
  unpkgUsage: {
    code: '<script src="https://storage.googleapis.com/realtorbot-public/index.js"></script>',
  },
  embedOnSite: {
    code: getEmbedOnSiteCode(key),
  },
});

export default docData;
