import { Box, Pagination, Typography } from "@mui/material";
import { PaginationMetadata } from "../../app/models/Pagination";

type Props = {
    metadata: PaginationMetadata
    onPageChange: (page: number) => void
}
export default function AppPagination({metadata, onPageChange}: Props) {
    const {rowCount, pageSize, currentPage, pageCount} = metadata;
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, rowCount);

  return (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{mt: 3}}>
      <Typography>
        Displaying {startItem}-{endItem} of {} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={pageCount}
        page={currentPage}
        onChange={(_, currentPage) => onPageChange(currentPage)}
      />
    </Box>
  );
}
