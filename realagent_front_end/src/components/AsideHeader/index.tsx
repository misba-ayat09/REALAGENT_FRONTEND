import { Group } from "@mantine/core";
import { UserMenu } from "../common/UserMenu/UserMenu";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/features/authentication";

interface AsideHeaderProps {
  height: number;
  isTextVisible?: boolean;
}

const AsideHeader: React.FC<AsideHeaderProps> = ({
  height,
  isTextVisible = true,
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.authentication.userData);

  return (
    <Group
      justify={isTextVisible ? "space-between" : "center"}
      h={height}
      py="sm"
      px={isTextVisible ? "lg" : 5}
      bg={"#FFFFFF"}
    >
      <UserMenu
        onLogout={() => {
          dispatch(logout());
        }}
        user={{
          firstName: userData.firstName ?? "",
          lastName: userData.lastName ?? "",
          email: userData.email ?? "",
          image: userData.profilePicture ?? "",
        }}
        isTextVisible={isTextVisible}
      />
    </Group>
  );
};

export default AsideHeader;
