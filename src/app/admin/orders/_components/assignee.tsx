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
  onChange?: (param: string) => void;
};

export default function Assignee({
  isLabel,
  isOrderItems,
  onChange,
}: AssigneeProps) {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const assignedToQuery = searchParams.get("assigned_to") || "";
  const { createQueryString } = useQueryString();
  const router = useRouter();
  const pathname = usePathname();
  const [assigneeState, setAssigneeState] = useState<string>("");

  const {
    data,
    isLoading: isGetEngineersLoading,
    refetch: refetchGetEngineers,
  } = useEngineersData(false);
  const engineersData = data?.data;

  const handleValueChange = (newValue: string) => {
    setAssigneeState(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

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
            isGetEngineersLoading ? (
              <CircularProgress
                size="sm"
                thickness={2}
                sx={{ "--CircularProgress-size": "20px" }}
              />
            ) : (
              <UnfoldMore />
            )
          }
          placeholder={isOrderItems ? "Select Engineer" : "Filter by assignee"}
          slotProps={{
            button: {
              id: "select-field-demo-button",
            },
          }}
          value={isOrderItems ? assigneeState : assignedToQuery}
          onChange={(_, value) => {
            if (isOrderItems) {
              handleValueChange(value as string);
            } else {
              router.push(
                `${pathname}?${createQueryString(
                  "assigned_to",
                  value as string
                )}`
              );
            }
          }}
        >
          {!isOrderItems && <Option value="">All Engineers</Option>}
          {engineersData?.map((engineer) => (
            <Option value={engineer._id} key={engineer._id.toString()}>
              {engineer.name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
