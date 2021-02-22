import colors from 'res/colors'

const styles = {
    container: {
        width: '100%',
        height: '100%'
    },
    headerBackground: {
        height: 200,
        alignItems: "center",
    },
    pageTitleText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: '10%'
    },
    hotelStar: {
        color: "#f9d155",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
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
    loadMoreText: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: 'uppercase'
    }
};

export default styles;
