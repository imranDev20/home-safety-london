import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, IconButton, iconButtonClasses } from "@mui/joy";
import React, { useState } from "react";

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const pageRange = 3; // Number of pages to display on each side of the current page

    // Calculate the start and end of the page range
    const startPage = Math.max(activePage - pageRange, 1);
    const endPage = Math.min(activePage + pageRange, totalPages);

    // Add the first page
    pageNumbers.push(1);

    // Add the ellipsis if the start page is greater than 2
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Add the pages within the range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add the ellipsis if the end page is less than the total pages minus 1
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Add the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Box
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeft />}
        disabled={activePage === 1}
        onClick={() => handlePageChange(activePage - 1)}
      >
        Previous
      </Button>

      <Box sx={{ flex: 1 }} />
      {renderPageNumbers().map((page) =>
        typeof page === "number" ? (
          <IconButton
            key={page}
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => handlePageChange(page)}
            disabled={page === activePage}
          >
            {page}
          </IconButton>
        ) : (
          <IconButton
            key={page}
            size="sm"
            variant="plain"
            color="neutral"
            disabled
          >
            {page}
          </IconButton>
        )
      )}
      <Box sx={{ flex: 1 }} />

      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRight />}
        disabled={activePage === totalPages}
        onClick={() => handlePageChange(activePage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default TablePagination;
