import { Image, Text, Button, Checkbox, Group, Box } from "@mantine/core";
import today from "../../assets/today.svg";
import facebook from "../../common/Icons/facebook.svg";
import LinkedIn from "../../common/Icons/linkedin.svg";
import Instagram from "../../common/Icons/instagram.svg";
import Twitter from "../../common/Icons/twitter.svg";
import classes from "./socialMediaCard2.module.css";
import { Icon } from '../common/Icons/Icon';
import { IconType } from '../common/Icons';
import { FlexBox } from "../common/FlexBox/FlexBox";
import { useMediaQuery } from "@mantine/hooks";

const SocialMediaCard1: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const isLaptop = useMediaQuery("(max-width: 1200px)");
  return (
    <Box className={className}>
      <FlexBox container className={classes.Card}>
        <FlexBox
          container
          style={{
            gap: "30px",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: "0",
            flexWrap: isLaptop ? "wrap" : "nowrap",
          }}
          width={"calc(100% - 20px)"}
          margin={"10px 0px"}
        >
          <img
            src={today}
            className={classes.image}
            style={{ height: "100%" }}
            alt="Description"
          />

          {/* <div style={{height:"183px",display:"block",width:"180px",background:"red",flexShrink:"0"}}>

          </div> */}
          <FlexBox
            container
            style={{ flexShrink: "0", height: "100%" }}
            justifyContent="space-between"
            flexDirection="column"
          >
            <FlexBox>
              <FlexBox
                width={"100%"}
                height={"100%"}
                container
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: "0",
                }}
              >
                <Text fz={16} fw={600}>
                  Description
                </Text>
                <Icon icon={IconType.refresh} />
              </FlexBox>
              <Text fz={{ lg: 14 }} pr={40}>
                Rising Rates? Savvy San Diego Homebuyers Are Using Discount
                Points! With mortgage rates on the rise, more San Diego
                homebuyers are turning to discount points to secure a lower
                interest rate. Are you thinking about buying a home in the
                beautiful San Diego area? Let's chat about how discount points
                can help you save money on your loan! #SanDiegoRealEstate
                #SanDiegoHomes #HomebuyingTips #MortgageRates #InterestRates
                #SanDiegoLife{" "}
              </Text>
            </FlexBox>
            <FlexBox
              container
              style={{ justifyContent: "space-between", flexWrap: "wrap" }}
            >
              <FlexBox
                container
                alignContent="center"
                justifyContent="space-between"
                style={{ gap: "20px" }}
              >
                <SocialMediaCheckBox
                  labelElement={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image
                        src={facebook}
                        alt="Facebook"
                        width={16}
                        height={16}
                      />
                    </div>
                  }
                />
                <SocialMediaCheckBox
                  labelElement={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image
                        src={LinkedIn}
                        alt="LinkedIn"
                        width={16}
                        height={16}
                      />
                    </div>
                  }
                />
                <SocialMediaCheckBox
                  labelElement={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image
                        src={Instagram}
                        alt="Instagram"
                        width={16}
                        height={16}
                      />
                    </div>
                  }
                />
                <SocialMediaCheckBox
                  labelElement={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image
                        src={Twitter}
                        alt="Twitter"
                        width={16}
                        height={16}
                      />
                    </div>
                  }
                />
              </FlexBox>
              <FlexBox
                container
                alignContent="center"
                justifyContent="space-between"
              >
                <Icon
                  icon={IconType.edit}
                  style={{ width: "44px", height: "44px" }}
                ></Icon>
                <Icon
                  icon={IconType.Delete}
                  style={{ width: "44px", height: "44px" }}
                ></Icon>
                <Button variant="filled" className={classes.button1}>
                  Approve
                </Button>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

interface SocialMediaCheckBoxProps {
  checked?: boolean;
  onChange?: () => void;
  labelElement: React.ReactNode;
}

const SocialMediaCheckBox: React.FC<SocialMediaCheckBoxProps> = ({
  checked,
  onChange,
  labelElement,
}) => {
  return (
    <Group>
      <Checkbox
        checked={checked}
        onChange={onChange}
        color={"violet"}
        styles={{
          root: {
            background: "white",
            width: "70px",
            height: "44px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            borderRadius: "25px",
          },
        }}
        label={labelElement}
        defaultChecked
      />
    </Group>
  );
};

export default SocialMediaCard1;
