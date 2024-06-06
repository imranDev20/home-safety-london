import { useEngineersData } from "@/app/_components/hooks/use-engineers";
import { useQueryString } from "@/app/_components/hooks/use-query-string";
import { UnfoldMore } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Option,
  Select,
} from "@mui/joy";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type AssigneeProps = {
  isLabel?: boolean;
  isOrderItems?: boolean;
};

export default function Assignee({ isLabel }: AssigneeProps) {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const assignedTo = searchParams.get("assigned_to") || "";
  const { createQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();

  const { engineersData, isGetEngineersDataLoading, refetchGetEngineers } =
    useEngineersData(false);

  return (
    <>
      <FormControl size="sm">
        {isLabel && (
          <FormLabel
            id="select-field-demo-label"
            htmlFor="select-field-demo-button"
          >
            Assignee
          </FormLabel>
        )}

        <Select
          listboxOpen={listBoxOpen}
          onClose={() => setListBoxOpen(false)}
          onListboxOpenChange={async (e) => {
            if (e) {
              if (!engineersData) {
                await refetchGetEngineers();
              } else {
                refetchGetEngineers();
              }
            }
            setListBoxOpen(e);
          }}
          indicator={
            isGetEngineersDataLoading ? (
              <CircularProgress
                size="sm"
                thickness={2}
                sx={{ "--CircularProgress-size": "20px" }}
              />
            ) : (
              <UnfoldMore />
            )
          }
          placeholder="Filter by assignee"
          slotProps={{
            button: {
              id: "select-field-demo-button",
            },
          }}
          value={assignedTo}
          onChange={(_, value) => {
            router.push(
              `${pathname}?${createQueryString("assigned_to", value as string)}`
            );
          }}
        >
          <Option value="">All Engineers</Option>
          {engineersData?.data.map((engineer) => (
            <Option value={engineer._id} key={engineer._id.toString()}>
              {engineer.name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
