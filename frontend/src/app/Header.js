// Header.js
import Link from "next/link"

export default function Header({ username }) {
    return (    
      <header>
        <Link href = "/"><img src = {"/assets/images/logo.png"} /></Link>
        <h2 className="header--title">Meme Generator</h2>
        <nav>
            <ul>
                <li><Link href = "/">HOME</Link></li>
                <li><Link href = "/meme">Memes</Link></li>
                <li><Link href = "/allmeme">All Memes</Link></li>
                <li>Welcome, {username}</li>
            </ul>
        </nav>
      </header>
    );
  }
  