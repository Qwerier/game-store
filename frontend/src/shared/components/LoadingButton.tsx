import { Box, Button, CircularProgress } from "@mui/material";

type Props = {
    isLoading: boolean,
    isDisabled: boolean,
    onClickEvent: () => void
    label: string
}
export default function LoadingButton({ isLoading, isDisabled, onClickEvent, label }: Props) {
    return (
        <Button
            onClick={onClickEvent}
            disabled={isDisabled || isLoading}
            variant="contained"
            sx={{ position: 'relative' }}
        >
            <Box sx={{ visibility: isLoading ? 'hidden' : 'visible' }}>
                {label}
            </Box>
            {isLoading && (
                <CircularProgress
                    size={20}
                    color="inherit"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        translate: '-50% -50%',
                    }}
                />
            )}
        </Button>
    );
}
