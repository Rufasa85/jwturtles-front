import React from 'react'
import TurtleCard from "./TurtleCard"

export default function Turtles({turtles}) {
    return (
        <div>
           {turtles.map(turt=><TurtleCard turtle={turt}/>)} 
        </div>
    )
}
