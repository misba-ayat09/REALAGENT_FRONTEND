import { FlexBox } from "../../common/FlexBox/FlexBox";
import { Text } from "@mantine/core";
import classes from './index.module.css'

interface MailLogsRootType extends React.FC<{ children: React.ReactNode }> {
    MailLogsDayIndicator: React.FC<{ title: string }>;
  }
  
  const MailLogsRoot: MailLogsRootType = ({ children }) => {
    return (
      <FlexBox container padding={"0px"} width={"100%"} flexDirection="column" backgroundColor="white">
          {children}
      </FlexBox>
    );
  };
  
  const MailLogsDayIndicator:React.FC<{title:string}> = ({title}) => {
  
    return (
      <div  className={classes.sectionDayIndicator}>
          <Text px={10} className={classes.dayIndicatorTitle}>
                {title}
          </Text>
      </div>
    )
  }
  
  MailLogsRoot.MailLogsDayIndicator = MailLogsDayIndicator

  export default MailLogsRoot