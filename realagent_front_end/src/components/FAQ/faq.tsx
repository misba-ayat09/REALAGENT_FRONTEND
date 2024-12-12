import { Accordion } from '@mantine/core';

const groceries = [
  {
    id: 'heading-1-One',
    question: 'How does the AI assist with client management?',
    answer:
      'AI can revolutionize realtor practices. By automating tasks like lead generation, appointment scheduling, and data entry, AI frees up realtors to focus on building relationships and providing personalized service. Additionally, AI-powered analytics can offer valuable insights into market trends, helping realtors make data-driven decisions and provide better advice to their clients.',
  },
  {
    id: 'heading-1-Three',
    question: 'How can the AI help with social media marketing?',
    answer:
      "AI can significantly enhance a realtor's social media marketing efforts. By analyzing audience data, AI can help identify the most effective content and target it to the right people. Additionally, AI-powered tools can automate tasks like scheduling posts and engaging with followers, saving time and effort. This allows realtors to focus on creating high-quality content and building meaningful connections with their audience.",
  },
  {
    id: 'heading-1-Four',
    question: 'Will the AI create the content itself?',
    answer:
      'AI can analyze trends and identify popular topics, providing inspiration for realtors. Additionally, AI can assist in drafting content, such as property descriptions or social media posts, saving time and effort. However, it is essential for realtors to review and edit AI-generated content to ensure it aligns with their brand voice and messaging.',
  },
  {
    id: 'heading-1-Five',
    question: 'Is the AI secure?',
    answer:
      "AI security is a crucial concern for realtors. While AI can offer significant benefits, it is essential to implement robust security measures to protect sensitive client data. This includes using encryption, regularly updating software, and training staff on best practices for data security. By prioritizing security, realtors can ensure the protection of their clients' information and maintain their trust.",
  },
  {
    id: 'heading-1-Six',
    question: 'How can this analysis help me better serve my clients?',
    answer:
      'By leveraging AI, you can provide a more personalized and efficient service to your clients. AI-powered tools can help you identify their specific needs and preferences, allowing you to tailor your recommendations and communication accordingly. Additionally, AI can streamline your workflow, freeing up more time to focus on building relationships and providing exceptional customer service. This will ultimately help you differentiate yourself from competitors and establish a strong reputation in the real estate market.',
  },
  {
    id: 'heading-1-Sev',
    question: 'How much does the AI assistant cost?',
    answer:
      'We offer different pricing plans to suit your needs. Please contact us for a free consultation and a personalized quote.',
  },
];
export default function FAQContent() {
  const filteredItems = groceries.filter((item) => item.question.toLowerCase().includes(''));

  const items = filteredItems.map((item) => (
    <Accordion.Item key={item.id} value={item.question} mt={20}>
      <Accordion.Control style={{ fontWeight: '700', fontSize: 'calc(16px * var(--scale-factor))' }}>
        {item.question}
      </Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'calc(27px * var(--scale-factor))',
        width: '100%',
      }}>
      <Accordion>{items}</Accordion>
    </div>
  );
}
