import {
  Card,
  Image,
  Text,
  Button,
  Checkbox,
  Group,
  Stack,
  Badge,
  Divider,
} from "@mantine/core";
import classes from "./socialMediaCard.module.css";
import today from "../../assets/today.svg";
import { IconType } from '../common/Icons';
import { Icon } from '../common/Icons/Icon';
import facebook from "../../common/Icons/facebook.svg";
import LinkedIn from "../../common/Icons/linkedin.svg";
import Instagram from "../../common/Icons/instagram.svg";
import Twitter from "../../common/Icons/twitter.svg";

const SocialMediaCard = () => {
  return (
    <Stack>
      {/* Today's Card */}
      <label className={classes.label}>Today</label>
      <Card shadow="sm" padding="lg" withBorder className={classes.Card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "30px" }}>
            <Image src={today} alt="Description" className={classes.image} />
            <Group>
              <label className={classes.label}>Description</label>
              <Text>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Group>
          </div>
          <Group>
            <Button variant="outline" className={classes.button2}>
              Edit
            </Button>
            <Button variant="filled" className={classes.button1}>
              Approve
            </Button>
          </Group>
        </div>
        <Group style={{ marginTop: "20px" }}>
          <Checkbox
            label={
              <div style={{ display: "flex", alignItems: "center",gap: "10px" }}>
                <Image src={facebook} alt="Facebook" width={16} height={16} />{" "}
                Facebook 
              </div>
            }
            defaultChecked
          />
          <Checkbox
            label={
              <div style={{ display: "flex", alignItems: "center" ,gap: "10px"}}>
                <Image src={LinkedIn} alt="LinkedIn" width={16} height={16} />{" "}
                LinkedIn
              </div>
            }
          />
          <Checkbox
            label={
              <div style={{ display: "flex", alignItems: "center",gap: "10px" }}>
                <Image src={Instagram} alt="Instagram" width={16} height={16} />{" "}
                Instagram
              </div>
            }
          />
          <Checkbox
            label={
              <div style={{ display: "flex", alignItems: "center" ,gap: "10px"}}>
                <Image src={Twitter} alt="Twitter" width={16} height={16} />{" "}
                Twitter
              </div>
            }
            defaultChecked
          />
        </Group>
      </Card>

      {/* Yesterday's Card */}
      <label className={classes.label}>Yesterday</label>
      <Card shadow="sm" padding="lg" withBorder className={classes.Card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <Image src={today} alt="Description" className={classes.image} />
            <Group>
              <label className={classes.label}>Description</label>
              <Text>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </Group>
          </div>
          <Badge variant="outline" color="red">
            Posted
          </Badge>
        </div>
        <Group style={{ marginTop: 10 }}>
          <Icon icon={IconType.linkedin} />
          <Icon icon={IconType.facebook} />
          <Icon icon={IconType.instagram} />
          <Icon icon={IconType.twitter} />
        </Group>
        <Group
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Group>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Text size="lg">1.1K </Text>
              <Text size="xs">Views</Text>
            </div>
            <Divider size="sm" orientation="vertical" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Text size="lg">336 </Text>
              <Text size="xs">Likes</Text>
            </div>
            <Divider size="sm" orientation="vertical" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Text size="lg">15 </Text>
              <Text size="xs">Reposts</Text>
            </div>
          </Group>
          <Button variant="outline" className={classes.button3}>
            Edit
          </Button>
        </Group>
      </Card>
    </Stack>
  );
};

export default SocialMediaCard;
