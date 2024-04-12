import React, {createContext} from 'react'
import {A} from './A';
import { NameContext } from './context';

export const useContextDemo = () => {

    const name = "jhon";
    const age =25;
    // const NameContext = createContext()
    return (
        <NameContext.Provider value={{name,age}}>
            <div><A name={name}></A></div>

        </NameContext.Provider>

    )
}
