import { Flex, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Flex pos={"fixed"} top={0} left={0} w={"100%"} h={"100%"} justify={"center"} align={"center"}>
      <Loader color="yellow" size="5rem" type="dots" />
    </Flex>
  );
};

export { Loading };
