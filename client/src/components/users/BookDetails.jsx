import React from 'react'

function BookDetails() {
    const url = "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

    const titleStyle = {
        display:"flex",
        position: "absolute",
        left: "10%",
        top: "10%",
    }


    return (
        <div>
            <h3 style={titleStyle}> Title </h3>
            <img src= {url} alt="chicken" style={{height:200, width:200}}></img>
        </div>
    )
}

export default BookDetails
