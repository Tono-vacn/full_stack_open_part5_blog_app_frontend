const Notification=({ message,flag }) => {
    const successStyle={
        color:'green',
        background:'lightgrey',
        fontSize:20,
        borderStyle:'solid',
        borderRadius:5,
        padding:10,
        marginBottom:10
    }

    const errorStyle={
        color:'red',
        background:'lightgrey',
        fontSize:20,
        borderStyle:'solid',
        borderRadius:5,
        padding:10,
        marginBottom:10
    }

    if (message===null){
        return null
    }
    else if (flag==='error'){
        return (
            <div style={errorStyle} className="error">
                {message}
            </div>
        )
    }
    else{
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    }
}

export default Notification