import {  Menu, Text } from "@mantine/core"
import { Icon } from '../../common/Icons/Icon';
import { IconType } from '../../common/Icons';
import { FlexBox } from "../../common/FlexBox/FlexBox"
import React, { JSXElementConstructor, ReactElement, useEffect } from "react"
import { useDisclosure } from "@mantine/hooks"

interface EmailOptionsComponentProps extends React.FC<{children:React.ReactNode,replyToEmail:(e:React.MouseEvent<HTMLDivElement>) => void,deleteEmail:(e:React.MouseEvent<HTMLDivElement>) => void}>{
    
}
const EmailOptions:EmailOptionsComponentProps = ({children,replyToEmail,deleteEmail}) => {
 
  const [opened, { open, close }] = useDisclosure(false);
  const handleClick = (e: React.MouseEvent) => {
    opened ? close() : open();
    e.stopPropagation();
  };

  useEffect(() => {
    if(opened) return
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])
  
  return (
    <Menu  position="bottom-end" offset={0} shadow="md" opened={opened}>
      <Menu.Target > 
        {React.cloneElement(children as ReactElement<any, string | JSXElementConstructor<any>>, { onClick: handleClick })}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item >
            <FlexBox onClick={(e)=>{
              replyToEmail(e)
              close()
            }}  container style={{gap:"10px"}}>
                    <Icon icon={IconType.reply} style={{ width: '20px', height: '20px' }} />
                    <Text>Reply</Text>
            </FlexBox>
        </Menu.Item>
        <Menu.Item>
           <FlexBox onClick={(e)=>{
            deleteEmail(e)
            close()

           }} container style={{gap:"10px"}}>
                 <Icon icon={IconType.trash} style={{ width: '20px', height: '20px' }} />
                 <Text>Delete</Text>
            </FlexBox>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default EmailOptions