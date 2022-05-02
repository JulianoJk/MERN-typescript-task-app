import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTaskDispatch } from "../../../context/TaskContext";
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import styles from "./Navigation.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logout, Home, User, Login, Pencil } from "tabler-icons-react";
import { Button, Group, Header, Navbar, Burger, AppShell } from "@mantine/core";

const Navigation: React.FC = () => {
  // state for the burger menu
  const [opened, setOpened] = useState(false);

  const userDispatch = useUserDispatch();
  const { isLoggedIn } = useUserState();
  const navigate = useNavigate();

  const todoDispatch = useTaskDispatch();

  // Track the location URL the user has selected
  const location = useLocation();

  // After logout, clear the context for the user and tasks, then navigate to index
  const logOut = () => {
    userDispatch({ type: "RESET_STATE" });
    todoDispatch({ type: "RESET_STATE" });
    navigate("/");
  };
  // state for the className of nav. If user navigates to a path which doesn't exist, hide nav bar to display NoURL component
  const [checkURL, setCheckURL] = useState(`${styles.bg}`);

  // Check if url is in the array and render every time location is changed
  useEffect(() => {
    const allPaths: Array<string> = [
      "/home",
      "/profile",
      "/login",
      "/register",
      "/",
    ];

    // If path is in the array, display normal nav bar
    if (allPaths.includes(location.pathname)) {
      // Check if user is logged or not. If no and tries to navigate to home or profile, set state to noURL(in order to display error message of page not found)
      if (
        !isLoggedIn &&
        (location.pathname === "/home" || location.pathname === "/profile")
      ) {
        setCheckURL(`${styles.noURL}`);
      } else {
        setCheckURL(`${styles.bg}`);
      }
    } else {
      setCheckURL(`${styles.noURL}`);
    }
  }, [isLoggedIn, location]);

  // Check if is user is logged or not
  if (isLoggedIn) {
    return (
      <AppShell>
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={"This title"}
          >
            <Group position="right" mt="md">
              <Button
                component={Link}
                to="/home"
                m={3}
                leftIcon={<Home size={16} />}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/profile"
                m={3}
                leftIcon={<User size={16} />}
              >
                Profile
              </Button>

              <Button
                leftIcon={<Logout size={16} />}
                onClick={logOut}
                m={3}
                variant="outline"
                color="pink"
              >
                logOut
              </Button>
            </Group>
          </Burger>
        </Navbar>
      </AppShell>
    );
  } else {
    return (
      <Header
        height={70}
        p="md"
        classNames={{
          root: `${styles.bg}`,
        }}
      >
        <Group position="right">
          <Button component={Link} to="/" radius="md" size="md" uppercase>
            Index
          </Button>

          <Button
            leftIcon={<Login size={16} />}
            radius="md"
            size="md"
            uppercase
            color="green"
            variant="outline"
            m={1}
            component={Link}
            to="/login"
          >
            Log-In
          </Button>
          <Button
            leftIcon={<Pencil size={16} />}
            radius="md"
            size="md"
            uppercase
            component={Link}
            to="/register"
            color="green"
            m={1}
          >
            Register
          </Button>
        </Group>
      </Header>
    );
  }
};
export default Navigation;
