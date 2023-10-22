'use client'
import Link from "next/link";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react'; // Import useEffect

export default function Header() {
    const [cookies, setCookie] = useCookies(['username']);

    useEffect(() => {
        // Access the username cookie here
        const username = cookies.username;
    }, []);

    return (
        <header>
            <Link href="/"><img src="/assets/images/logo.png" /></Link>
            <h2 className="header--title">Meme Generator</h2>
            <nav>
                <ul>
                    <li><Link href="/">HOME</Link></li>
                    <li><Link href="/meme">Memes</Link></li>
                    <li><Link href="/allmeme">All Memes</Link></li>
                    <li>Welcome, {cookies.username}</li>
                </ul>
            </nav>
        </header>
    );
}
