export const status = {
    INITIAL: 'INITIAL',
    LOADING: 'LOADING',
    UPDATING: 'UPDATING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const hasData = state =>
    state.status === status.UPDATING || state.status === status.SUCCESS;
export const isInitial = state => state.status === status.INITIAL;
export const isLoading = state => state.status === status.LOADING;
export const isUpdating = state => state.status === status.UPDATING;
export const isSuccess = state => state.status === status.SUCCESS;
export const isError = state => state.status === status.ERROR;