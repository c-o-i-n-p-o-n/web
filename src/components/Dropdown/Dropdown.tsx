import { Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener } from "@mui/material";
import { useState, useRef, useEffect} from "react";
import { useRouter } from "next/router";
import { AuthService } from "../../services/AuthService";

export function Dropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const authService = new AuthService();

   const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

   const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    prevOpen.current = open;
  }, [open]);

  return (
        <Popper
          open={open}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
          style={{paddingLeft: "460px", paddingTop: "71px"}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'right top' : 'right bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem>Meu perfil</MenuItem>
                    <MenuItem  onClick={() => {
                      authService.signOut();
                      //router.push("/login");
                      router.push("/");
                    }}>Sair</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
  );
}