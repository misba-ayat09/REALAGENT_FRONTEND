import { Box, Divider, Input, TagsInput, Textarea } from "@mantine/core"
import { FlexBox } from "../../common/FlexBox/FlexBox"
import classes from './index.module.css'
import { email_agent_padding, email_divider_clr, email_divider_size } from "..";
import React from "react";

interface ComposeEmailRootComponent extends React.FC<{children:React.ReactNode}>{
    ComposeEmailTagInputWithLabel:React.FC<ComposeEmailTagInputWithLabelProps>;
    ComposeEmailInputWithLabel:React.FC<ComposeEmailInputLabelProps>;
    EmailContentSection:React.FC
    EmailDivider:React.FC;
}

interface ComposeEmailInputLabelProps{label:string;value:string;onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,style?:React.CSSProperties,name?:string,disabled?:boolean,readOnly?:boolean}
interface ComposeEmailTagInputWithLabelProps{label:string;value:string[];onChange:((value: string[]) => void),name?:string,disabled?:boolean,readOnly?:boolean} 

const ComposeEmailRoot:ComposeEmailRootComponent = ({children}) => {
  return (
    <Box bg={"white"} h={"100%"} style={{flexShrink:1,position:"relative"}}>{children}</Box>
  )
}

const ComposeEmailInputWithLabel:React.FC<ComposeEmailInputLabelProps> = ({
    label,
    value,
    onChange,
    style,
    name,
    readOnly=false,
    disabled=false
})=>{
    
    return(
        <FlexBox padding={email_agent_padding} container flexDirection="row" style={{gap:"10px",alignItems:"center",height:"50px",flexShrink:1}}>
             <span className={classes.composeEmailLabel}>
                 {label}
             </span>
             <Input name={name} variant="unstyled" disabled={disabled} readOnly={readOnly} styles={{input:{minWidth:"250px",...style}}}  className={classes.emailInput} value={value} onChange={onChange} />
        </FlexBox>
    )
}

const ComposeEmailTagInputWithLabel:React.FC<ComposeEmailTagInputWithLabelProps> = ({
    label,
    value,
    onChange,
    name
})=>{   
    return(
        <FlexBox padding={email_agent_padding} container flexDirection="row" style={{gap:"10px",alignItems:"center",height:"50px"}}>
             <span className={classes.composeEmailLabel}>
                 {label}
             </span>
             <TagsInput name={name} variant="unstyled" styles={{input:{minWidth:"250px"}}} value={value} onChange={onChange} className={classes.emailInput}   />
        </FlexBox>
    )
}



const EmailContentSection = ()=>{
    return(
        <Textarea />
    )
}

const EmailDivider =()=> <Divider color={email_divider_clr} size={email_divider_size}/>

ComposeEmailRoot.ComposeEmailInputWithLabel = ComposeEmailInputWithLabel
ComposeEmailRoot.EmailContentSection = EmailContentSection
ComposeEmailRoot.EmailDivider = EmailDivider
ComposeEmailRoot.ComposeEmailTagInputWithLabel = ComposeEmailTagInputWithLabel


export default ComposeEmailRoot