import { Input, Modal, Textarea } from "@mantine/core"
import { FlexBox } from "../../common/FlexBox/FlexBox"

export interface EditEmailSuggestionModalProps {
    subject:string;
    description:string;
    onClose: () => void;
    onChange ?: (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
 
const index:React.FC<EditEmailSuggestionModalProps> = ({subject,description,onClose}) => {
  
  return (
    <Modal centered withCloseButton={true} onClose={onClose} opened={true} >
         <FlexBox container flexDirection="column" style={{gap:"10px"}}>
               <Input placeholder="Subject" value={subject}/>
               <Textarea placeholder="description" value={description} />
         </FlexBox>
    </Modal>
  )
}

export default index