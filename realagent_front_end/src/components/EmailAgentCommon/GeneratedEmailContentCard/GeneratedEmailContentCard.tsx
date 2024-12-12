import { Box, ScrollArea, Text } from "@mantine/core"
import { FlexBox } from "../../common/FlexBox/FlexBox";
import classes from './index.module.css'
import { email_agent_common_bg } from "..";

interface GeneratedEmailContentCardProps {
     title?:string;
     description?:string;
     labeledNumber?:number;
     onClick?:() => void
}
 
const GeneratedEmailContentCard:React.FC<GeneratedEmailContentCardProps> = ({title="title goes here",description="description goes here",labeledNumber=0,onClick}) => {
  return (
    <Box onClick={onClick} w={369} h={158}  bg={email_agent_common_bg} display={"flex"} style={{alignItems:"center",cursor:"pointer",flexShrink:0,justifyContent:"center",borderRadius:"10px"}}>
            <Box display={"flex"} className={classes.generatedEmailContentCardWrapper} >
                <FlexBox  container flexDirection="row" style={{alignItems:"center",justifyContent:"space-between",flexShrink:1}}>
                        <Text className={classes.title}>{title}</Text>
                        <span className={classes.itemNumberWrapper}>
                            <span>{labeledNumber}</span>
                        </span>
                </FlexBox>
                <ScrollArea style={{height:"100%"}}>
                    <Text className={classes.description} dangerouslySetInnerHTML={{__html: description}}></Text>
                </ScrollArea>
            </Box>
    </Box>
  )
}

export default GeneratedEmailContentCard