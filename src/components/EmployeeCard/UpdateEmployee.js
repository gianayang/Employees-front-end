import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  ModalHeader,
  ModalBody,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  ModalFooter,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateEmployee = (props) => {
  const [firstName, setFirstName] = useState(props.employee.firstName);
  const [lastName, setLastName] = useState(props.employee.lastName);
  const [email, setEmail] = useState(props.employee.email);
  const [age, setAge] = useState(props.employee.age);
  const [dob, setDob] = useState(new Date(props.employee.birthday));
  const [selectedSkills, setSelectedSkill] = useState(props.employee.skills);
  const [active, setActive] = useState(props.employee.active);
  const [submitting, setSubmitting] = useState(false);

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const skillsChangeHandler = (event) => {
    setSelectedSkill(event);
  };

  const activeChangeHandler = () => {
    setActive(!active);
  };

  const dobChangeHandler = (date) => {
    setDob(date);
    const today = new Date();
    if (today.getMonth() > date.getMonth()) {
      setAge(today.getFullYear() - date.getFullYear());
    } else {
      setAge(today.getFullYear() - date.getFullYear() - 1);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitting(true);
    const emp = {
      employee_id: props.employee.employee_id,
      firstName: firstName,
      lastName: lastName,
      birthday: new Date(dob),
      email: email,
      active: active,
      age: age,
      skills: selectedSkills,
    };
    console.log(selectedSkills);
    props.updateEmployeeHandler(emp);
    setSubmitting(false);
    props.onClose();
  };

  return (
    <>
      <ModalBody bgGradient="linear(to-r, #d4e798 0%, #FE72A9 75%)">
        <form onSubmit={submitHandler}>
          <ModalHeader
            size="xs"
            textTransform="uppercase"
            display="flex"
            alignItems="left"
            fontSize={16}
            fontWeight="extrabold"
            padding="5"
          >
            Edit Employee
          </ModalHeader>

          <SimpleGrid columns={2} spacingY="15px" padding="10">
            <Box>
              <FormControl isRequired>
                <FormLabel
                  size="xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="left"
                  fontSize={16}
                  fontWeight="extrabold"
                >
                  First Name
                </FormLabel>
                <Input
                  value={firstName}
                  rounded="10px"
                  onChange={firstNameChangeHandler}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel
                  size="xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="left"
                  fontSize={16}
                  fontWeight="extrabold"
                >
                  Email
                </FormLabel>
                <Input
                  type="text"
                  rounded="10px"
                  value={email}
                  onChange={emailChangeHandler}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel
                  size="xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="left"
                  fontSize={16}
                  fontWeight="extrabold"
                >
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  rounded="10px"
                  value={lastName}
                  onChange={lastNameChangeHandler}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel
                  size="xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="left"
                  fontSize={16}
                  fontWeight="extrabold"
                >
                  Date of Birth
                </FormLabel>
                <DatePicker selected={dob} onChange={dobChangeHandler} />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel
                  size="xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="left"
                  fontSize={16}
                  fontWeight="extrabold"
                >
                  Skills
                </FormLabel>
                <Multiselect
                  options={props.skillsList} // Options to display in the dropdown
                  selectedValues={selectedSkills} // Preselected value to persist in dropdown
                  onSelect={skillsChangeHandler} // Function will trigger on select event
                  onRemove={skillsChangeHandler}
                  displayValue="skill_name" // Property name to display in the dropdown options
                  className="fw8 ba bw b--blue"
                />
              </FormControl>
            </Box>
            <Box></Box>
            <Box>
              <FormControl>
                <FormLabel
                  size="xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="left"
                  fontSize={16}
                  fontWeight="extrabold"
                >
                  User Active?{" "}
                </FormLabel>
                <Input
                  type="checkbox"
                  rounded="10px"
                  checked={active}
                  onChange={activeChangeHandler}
                />
              </FormControl>
            </Box>
            <ModalFooter gap="2">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={submitting}
                type="submit"
              >
                Submit
              </Button>
              <Button mt={4} colorScheme="teal" onClick={props.onClose}>
                Close
              </Button>
            </ModalFooter>
          </SimpleGrid>
        </form>
      </ModalBody>
    </>
  );
};

export default UpdateEmployee;
