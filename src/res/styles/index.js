import colors from 'res/colors'

const styles = {
    container: {
        width: '100%',
        height: '100%'
    },
    whiteContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    headerBackground: {
        height: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    pageTitleText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: '10%'
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    loadMoreButton: {
        backgroundColor: colors.lightGreen,
        width: 150,
        height: 50,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10,
        borderRadius: 20,
        zIndex: 100
    },
    greenButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        backgroundColor: colors.lightGreen
    },
    blackButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        backgroundColor: colors.blackButton
    },
    greyButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        backgroundColor: 'grey'
    },
    loadMoreText: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row'
    },
    flexColumn: {
        flex: 1,
        flexDirection: 'column'
    },
    teamName: {
        fontFamily: 'BarlowCondensed-Bold',
        fontSize: 18,
        textTransform: 'uppercase',
        paddingStart: 5
    }
};

export default styles;
