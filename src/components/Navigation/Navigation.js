import React from "react";
import { Breadcrumb, BreadcrumbItem, Button } from "@chakra-ui/react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <Breadcrumb
        bgGradient="linear(to-r, blue.200 0%, pink.200 60%, orange.400)"
        padding={5}
        color="teal.900"
      >
        <BreadcrumbItem>
          <Button onClick={() => onRouteChange("signout")} colorScheme="teal">
            {" "}
            Signout
          </Button>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  } else {
    return (
      <Breadcrumb
        bgGradient="linear(to-r, blue.200 0%, pink.200 60%, orange.400)"
        padding={5}
        separator=" "
      >
        <BreadcrumbItem>
          <Button onClick={() => onRouteChange("signin")} colorScheme="teal">
            {" "}
            Sign in{" "}
          </Button>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Button onClick={() => onRouteChange("register")} colorScheme="teal">
            {" "}
            Register{" "}
          </Button>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }
};

export default Navigation;
