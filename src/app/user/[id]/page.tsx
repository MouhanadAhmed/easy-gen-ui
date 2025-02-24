import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";

import { config } from "@/config";
import { UserForm } from "../../../components/users/user-form";

export const metadata = {
  title: `Account | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3} className="mt-20">
      <UserForm />
    </Stack>
  );
}
