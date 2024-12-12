 
import { email_agent_common_bg } from "..";
import { FlexBox } from "../../common/FlexBox/FlexBox"
import { Text, Input, Textarea  } from "@mantine/core"


export interface ConfigureRootProps extends React.FC<{children:React.ReactNode}> {
  ConfigureInput:React.FC<ConfigureInputProps>;
  ConfigureTextArea:React.FC<ConfigureTextAreaProps>;
}


interface ConfigureInputProps {
  value:string;
  handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
  label:string;
  description?:string;
  placeholder?:string;
  style?:React.CSSProperties;
  disabled?:boolean
}
interface ConfigureTextAreaProps {
  value:string;
  handleChange:(e:React.ChangeEvent<HTMLTextAreaElement>) => void;
  label:string;
  description?:string;
  placeholder?:string;
  style?:React.CSSProperties
}




const ConfigureRoot:ConfigureRootProps = ({children}) => {
  return (
    <FlexBox container flexDirection="column" style={{gap:"20px"}}>
      {children}
    </FlexBox>
  )
}


const ConfigureInput:React.FC<ConfigureInputProps> = ({label,value,handleChange,placeholder,style={},disabled=false}) => {
  return (
  <FlexBox  container flexDirection="column" style={{gap:"0px",...style}}>
      <Text style={{fontSize:"14px",fontWeight:400}}>{label}</Text>       
      <Input value={value} onChange={handleChange} placeholder={placeholder} disabled={disabled} styles={{input:{outline:"none",border:"none",background:email_agent_common_bg,borderRadius:"10px",height:46,width:450,padding:"0px 20px"}}} />
  </FlexBox>
  )
}

const ConfigureTextArea:React.FC<ConfigureTextAreaProps> = ({label,value,handleChange,placeholder,style={}}) => {
  return (
    <FlexBox container flexDirection="column" style={{gap:"0px",...style}}>
      <Text style={{fontSize:"14px",fontWeight:400}}>{label}</Text>
      <Textarea autosize={false} value={value} onChange={handleChange} placeholder={placeholder} styles={{input:{outline:"none",border:"none",background:email_agent_common_bg,borderRadius:"10px",height:160,width:450,padding:"20px 20px"}}} />
    </FlexBox>
  )
}

ConfigureRoot.ConfigureInput = ConfigureInput
ConfigureRoot.ConfigureTextArea = ConfigureTextArea

export default ConfigureRoot