import React, { useEffect, useState } from "react";

import EmployeesCardList from "../EmployeeCardList/EmployeesCardList";
import { Center, Container } from "@chakra-ui/react";
import { toast } from "react-toastify";

const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);

  const [skills, setSkills] = useState([]);

  const onDeleteEmployeeHandler = (id) => {
    console.log(id.value);
    fetch("http://localhost:8080/api/employees/" + id, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        const newEmployees = employees.filter(
          (employee) => employee.employee_id !== id
        );
        setEmployees(newEmployees);
        toast.success("Successfully remove employee.");
      } else {
        response.json().then((errorMessage) => {
          toast.error("Something went wrong: " + errorMessage.message);
        });
      }
    });
  };

  const updateEmployeeHandler = (employee) => {
    const dobDates =
      employee.birthday.toDateString().split(" ").slice(1, 3).join(" ") +
      ", " +
      employee.birthday.getFullYear();

    const newEmployee = {
      employee_id: employee.employee_id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      active: employee.active,
      birthday: employee.birthday.toISOString(),
      skills: employee.skills,
      age: employee.age,
    };

    fetch("http://localhost:8080/api/employees/" + employee.employee_id, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    }).then((response) => {
      if (response.status === 200) {
        const newEmployees = employees.map((employee) => {
          if (employee.employee_id === newEmployee.employee_id) {
            return {
              employee_id: newEmployee.employee_id,
              firstName: newEmployee.firstName,
              lastName: newEmployee.lastName,
              email: newEmployee.email,
              active: newEmployee.active,
              birthday: dobDates,
              skills: newEmployee.skills,
              age: newEmployee.age,
            };
          }
          return employee;
        });
        setEmployees(newEmployees);
        toast.success("Successfully updated!");
      } else {
        response.json().then((errorMessage) => {
          toast.error("Something went wrong: " + errorMessage.message);
        });
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/employees", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((employeesList) => {
        setEmployees(employeesList);
      });

    fetch("http://localhost:8080/api/skills", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((skillsList) => {
        setSkills(skillsList);
      });
  }, []);

  async function addEmployeePostRequest(employee) {
    const response = await fetch("http://localhost:8080/api/employees", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        active: employee.active,
        birthday: employee.birthday.toISOString(),
        skills: employee.skills,
        age: employee.age,
      }),
    });
    return response;
  }

  const addEmployeeHandler = (employee) => {
    addEmployeePostRequest(employee).then((response) => {
      const dobDates =
        employee.birthday.toDateString().split(" ").slice(1, 3).join(" ") +
        ", " +
        employee.birthday.getFullYear();
      if (response.status === 200) {
        response.text().then((employeeID) => {
          const NewEmployee = {
            employee_id: employeeID,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            active: employee.active,
            birthday: dobDates,
            skills: employee.skills,
            age: employee.age,
          };
          setEmployees((prevEmployees) => {
            return [NewEmployee, ...prevEmployees];
          });
          toast.success("Successfully added a new employee!");
        })

      } else {
        response.json().then((errorMessage) => {
          toast.error("Something went wrong: " + errorMessage.message);
        });
      }
    });
  };

  return (
    <Center bgGradient="linear(to-r, blue.200 0%, pink.200 60%, orange.400)">
      <Container w="900px" color="teal.800">
        <EmployeesCardList
          skills={skills}
          employees={employees}
          onDeleteEmployeeHandler={onDeleteEmployeeHandler}
          updateEmployeeHandler={updateEmployeeHandler}
          addEmployeeHandler={addEmployeeHandler}
        />
      </Container>
    </Center>
  );
};

export default EmployeesTable;
