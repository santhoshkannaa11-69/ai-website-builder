export const getApiErrorMessage = (error: any, fallback: string) => {
    return (
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        fallback
    );
};

export const statusCopy = {
    generationInProgress: "AI is working on your request...",
    loginRequired: "Please sign in to continue.",
    revisionFailed: "Revision failed while processing. Please try again.",
};
