"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { type AllUsers } from "@/types/user";
import { FRONT_URL } from "@/lib/env-config";
import { createLogger } from "@/lib/logger";
import { findAllUsers } from "@/services/user-service";
import { paths } from "@/types/paths";
import { UsersFilters } from "../../components/users/users-filters";
import { UsersTable } from "../../components/users/users-table";

export default function Page(): React.JSX.Element {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const userRole = localStorage.getItem("custom-auth-role");
  }
  // if (userRole !== "admin") router.push(`${FRONT_URL}/dashboard`);
  const [usersData, setUsersData] = React.useState<AllUsers>();
  const [page, setPage] = React.useState<number | null>(1);
  const [count, setCount] = React.useState<number | null>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number | null>(1);
  const [newRowsPerPage, setNewRowsPerPage] = React.useState<number | null>();

  React.useEffect(() => {
    const fetchUsersData = async (): Promise<void> => {
      try {
        const data = await findAllUsers(Number(page), newRowsPerPage!);
        setUsersData(data);
        setPage(Number(data.page));
        setRowsPerPage(Number(data.pageLength));
        setCount(Number(data.count));
      } catch (error) {
        createLogger().error("Error fetching users data:", error);
      }
    };
    void fetchUsersData();
  }, [page, newRowsPerPage]);
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    reqPage: number,
  ): void => {
    setPage(reqPage + 1);
    // }
  };
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setNewRowsPerPage(Number(value));
    setPage(1);
  };

  return (
    <Stack spacing={3} className="mt-20 bg-white">
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Users</Typography>
        </Stack>
        <div>
          <Button
            component={RouterLink}
            // href={paths.dashboard.newUser}
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
                          href={`${paths.dashboard.user}`}
          >
            Add
          </Button>
        </div>
      </Stack>
      <UsersFilters />
      <UsersTable
        count={Number(count)}
        page={page ? page - 1 : 1}
        users={usersData?.users}
        rowsPerPage={Number(rowsPerPage)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        // onUserDeleted={fetchUsersData}
      />
    </Stack>
  );
}
