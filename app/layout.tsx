import { Metadata } from 'next';
import './globals.css';
import Providers from './providers';


export const metadata: Metadata = {
    title: {
        template: '%s - uniCMS',
        default: 'uniCMS',
    },
    description: 'uniCMS is a content management system for managing your content.',
    icons: {
        icon: '/favicon.svg'
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className="antialiased">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}