import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import "./NewEmployee.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewEmployee = (props) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [selectedSkills, setSelectedSkill] = useState([]);
  const [active, setActive] = useState(false);
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
    const NewEmployee = {
      firstName: firstName,
      lastName: lastName,
      birthday: new Date(dob),
      email: email,
      active: active,
      age: age,
      skills: selectedSkills,
    };
    props.addEmployeeHandler(NewEmployee);
    setLastName(null);
    setEmail(null);
    setSubmitting(false);
    setSelectedSkill([]);
    setSubmitting(false);
  };

  return (
    <form onSubmit={submitHandler}>
        <SimpleGrid columns={2} spacingX="150px" spacingY="30px" w="1000px">
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
              rounded="10px"
              display="flex"
              alignItems="left"
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
              Last Name
            </FormLabel>
            <Input
              rounded="10px"
              display="flex"
              alignItems="left"
              type="text"
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
              Email
            </FormLabel>
            <Input
              rounded="10px"
              type="text"
              display="flex"
              alignItems="left"
              onChange={emailChangeHandler}
            />
            </FormControl>
          </Box>
          <Box>
          <FormControl isRequired>
            <FormLabel
              size="xs"
              textTransform="uppercase"
              fontSize={16}
              fontWeight="extrabold"
            >
              Date of Birth
            </FormLabel>
            <DatePicker
              selected={dob}
              onChange={(date) => dobChangeHandler(date)}
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
              Skills
            </FormLabel>
            <Multiselect
              options={props.skillsList} // Options to display in the dropdown
              selectedValues={selectedSkills} // Preselected value to persist in dropdown
              onSelect={skillsChangeHandler} // Function will trigger on select event
              displayValue="skill_name" // Property name to display in the dropdown options
            />
            </FormControl>
          </Box>
          <Box>
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
              mt={4}
              checked={active}
              display="flex"
              alignItems="left"
              onChange={activeChangeHandler}
            />
          </Box>
        </SimpleGrid>
        <Center>
          <Button
            mt={8}
            colorScheme="teal"
            isLoading={submitting}
            type="submit"
          >
            Add Employee
          </Button>
        </Center>
    </form>
  );
};

export default NewEmployee;
