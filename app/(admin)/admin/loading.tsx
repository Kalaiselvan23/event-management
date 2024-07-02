"use client"
import React from 'react'
import { Triangle } from "react-loader-spinner"
const Loading = () => {
    return <div className='h-[100vh] flex justify-center items-center'>
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#ffff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass="" />
    </div>
}

export default Loading
