import { Metadata } from "next"
import ContentPage from "./page";


export const metadata: Metadata = {
    title: 'Content',
}

export default async function Layout()
{
    return (
        <>
            <ContentPage dirpath={process.env.CONTENT_FOLDER_PATH!} />
        </>
    )
}