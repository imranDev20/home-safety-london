import { useEngineersData } from "@/app/_components/hooks/use-engineers";
import { UnfoldMore } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  Option,
  Select,
} from "@mui/joy";
import React, { useState } from "react";

export default function Assignee() {
  const [listBoxOpen, setListBoxOpen] = useState<boolean>(false);
  const {
    engineersData,
    isGetEngineersDataLoading,
    isGetEngineersDataFetching,
    refetchGetEngineers,
  } = useEngineersData(false);

  return (
    <>
      <FormControl size="sm">
        <FormLabel
          id="select-field-demo-label"
          htmlFor="select-field-demo-button"
        >
          Assignee
        </FormLabel>
        <Select
          listboxOpen={listBoxOpen}
          onClose={() => setListBoxOpen(false)}
          onListboxOpenChange={async (e) => {
            if (e) {
              await refetchGetEngineers();
              setListBoxOpen(true);
            }
          }}
          indicator={
            isGetEngineersDataLoading || isGetEngineersDataFetching ? (
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
