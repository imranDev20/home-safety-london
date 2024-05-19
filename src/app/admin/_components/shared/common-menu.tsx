import { MoreHorizRounded } from "@mui/icons-material";
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";

function CommonMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRounded />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}
export default CommonMenu;
