// import {NextResponse} from "next/server";
//
// export function middleware(request:Request){
//     return NextResponse.redirect(new URL("/about",request.url))
// }
// export const config= {
//     matcher:["/account"]
// }
//

import {auth} from "@/app/_lib/auth";
export const middleware = auth

export const config= {
    matcher:["/account"]
}