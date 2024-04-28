import { NextRequest, NextResponse } from "next/server";
import { getServerSideUser } from "./lib/payload-utils";

export async function middleware(req: NextRequest){
    const {nextUrl, cookies} = req
    //get user from server side user cookie
    const {user} = await  getServerSideUser(cookies)

    //if they are logged in then sign-in/sign-up page should not be shown
    if(user && ["/sign-in", "/sign-up"].includes(nextUrl.pathname)){
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)

    }

    //If user is not logged in then
    return NextResponse.next()
}