import { SITE_OPTIONS } from "@/shared/constants";
import { List, ListItem, ListItemButton, Typography, useTheme } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavList() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <List size="md">
      {SITE_OPTIONS.filter((val) => val.isShowInHeader).map((option) => (
        <ListItem
          key={option.route}
          sx={{
            mb: 1,
            textDecoration: "none",
          }}
          component={Link}
          href={option.route}
        >
          <ListItemButton
            selected={pathname === option.route}
            sx={{
              fontWeight: 500,
              borderRadius: theme.radius.sm,
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
              }}
            >
              {option.label}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
