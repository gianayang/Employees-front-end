import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  Center,
  Button,
  Text,
  useDisclosure,
  SimpleGrid,
  Stack,
  StackDivider,
  Box,
  Flex,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeCard = ({
  key,
  skills,
  employee,
  onDeleteEmployeeHandler,
  updateEmployeeHandler,
}) => {
  const onDeleteButtonHandler = (e) => {
    e.preventDefault();
    onDeleteEmployeeHandler(employee.employee_id);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SimpleGrid
      rows={2}
      spacingY="10px"
      padding="10"
      borderColor="teal"
      borderWidth="0.5px"
      shadow="md"
    >
      <Box>
        <Heading
          size="md"
          textTransform="uppercase"
          display="flex"
          alignItems="left"
          fontSize={20}
          fontWeight="extrabold"
        >
          Employee
        </Heading>
      </Box>
      <Stack divider={<StackDivider></StackDivider>} spacing="6"></Stack>
      <SimpleGrid row={2}>
        <SimpleGrid columns={2} spacingX="150px">
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              First Name
            </Heading>
            <Text fontSize="md" display="flex" alignItems="left">
              {employee.firstName}
            </Text>
          </Box>
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              Last Name
            </Heading>
            <Text fontSize="md" display="flex" alignItems="left">
              {employee.lastName}
            </Text>
          </Box>
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              Email
            </Heading>
            <Text fontSize="md" display="flex" alignItems="left">
              {employee.email}
            </Text>
          </Box>
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              Active
            </Heading>
            <Text fontSize="md" display="flex" alignItems="left">
              {employee.active.toString()}
            </Text>
          </Box>
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              Age
            </Heading>
            <Text fontSize="md" display="flex" alignItems="left">
              {employee.age}
            </Text>
          </Box>
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              Birthday
            </Heading>
            <Text fontSize="md" display="flex" alignItems="left">
              {employee.birthday}
            </Text>
          </Box>
          <Box padding={2}>
            <Heading
              size="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="left"
              fontSize={16}
              fontWeight="extrabold"
            >
              Skills
            </Heading>
            {employee.skills.map((s) => {
              return (
                <Text fontSize="md" display="flex" alignItems="left">
                  {s.skill_name}&nbsp;
                </Text>
              );
            })}
          </Box>
        </SimpleGrid>

        <Flex alignItems="end">
          <Spacer></Spacer>
          <ButtonGroup gap="2">
            <Button onClick={onOpen} colorScheme="teal">
              Edit
            </Button>
            <Button colorScheme="teal" onClick={onDeleteButtonHandler}>
              Delete
            </Button>
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
      <Center bgGradient="linear(to-r, green.300 0%, yellow.200 45%, orange.400)">
        <Modal isOpen={isOpen} blockScrollOnMount={false} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <UpdateEmployee
              onClose={onClose}
              skillsList={skills}
              employee={employee}
              updateEmployeeHandler={updateEmployeeHandler}
            />
          </ModalContent>
        </Modal>
      </Center>
    </SimpleGrid>
  );
};

export default EmployeeCard;
