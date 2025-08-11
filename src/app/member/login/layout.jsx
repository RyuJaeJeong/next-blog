import {Suspense} from "react";

const Layout = ({ children })=>{
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}

export default Layout