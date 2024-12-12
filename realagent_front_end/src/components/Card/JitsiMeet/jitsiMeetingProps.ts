import JitsiMeeting from "@jitsi/react-sdk/lib/components/JitsiMeeting";
import { Config } from "../../../config";

type JitsiMeetingProps = Parameters<typeof JitsiMeeting>[0];

export const jitsiMeetingProps = (
  roomName: string | undefined,
  jwt: string | undefined,
  onPressLeave: () => void
): JitsiMeetingProps => ({
  domain: Config.MEET_DOMAIN,
  roomName: roomName ?? "",
  jwt: jwt,
  getIFrameRef: (iframeRef) => {
    if (iframeRef) {
      iframeRef.style.height = "calc(100% - 4.5px)";
      iframeRef.style.width = "100%";
      // iframeRef.style.background = "white";
      // iframeRef.style.borderRadius = "35px";
    }
  },
  onReadyToClose: onPressLeave,
});
