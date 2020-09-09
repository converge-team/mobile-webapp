export const screenConstants = {
    SCREEN_LOADED: 'SCREEN_LOADED',
}

export const screenLoaded = (screen) => ({
    type: screenConstants.SCREEN_LOADED,
    screen
})

