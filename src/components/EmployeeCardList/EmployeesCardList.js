import React from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import NewEmployee from "../EmployeeCard/NewEmployee";
import { VStack, Box, SimpleGrid } from "@chakra-ui/react";

const EmployeesCardList = ({
  skills,
  employees,
  onDeleteEmployeeHandler,
  updateEmployeeHandler,
  addEmployeeHandler,
}) => {
  return (
    <VStack spacing={10}>
      <Box
        textTransform="uppercase"
        fontSize={32}
        fontWeight="extrabold"
        padding="10"
      >
        <h1>Employees List</h1>
      </Box>
      <Box
        padding={5}
        // backgroundColor="#f3becd"
        backgroundColor='#eb93ac'
        borderColor="black"
        borderWidth="0.5px"
        shadow="md"
      >
        <NewEmployee
          skillsList={skills}
          addEmployeeHandler={addEmployeeHandler}
        ></NewEmployee>
      </Box>
      <Box backgroundColor="#d4e798" width="80%">
        <SimpleGrid columns={1} spacingY="20px">
          <Box>
            {employees.map((employee) => {
              return (
                <EmployeeCard
                  key={employee.employee_id}
                  skills={skills}
                  employee={employee}
                  onDeleteEmployeeHandler={onDeleteEmployeeHandler}
                  updateEmployeeHandler={updateEmployeeHandler}
                />
              );
            })}
          </Box>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default EmployeesCardList;
