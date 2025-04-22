import Agent from '@/app/components/Agent'
import React from 'react'

const Page =()=>{
    return(
        <>
                <h3>Interview Generation</h3>
        
                <Agent userName ="You" userId ="user1" type="generator"/>
                
                </>
    )
}

export default Page