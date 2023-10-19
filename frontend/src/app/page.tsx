'use client'
import Link from 'next/link'
import s from './page.module.css'

export default function Home() {
  return (
		<main className = {`${s.home} pd-top`}>
			<div className = {s.content}>
				<h1>MEME Feed</h1>
				<p>Get ready for some Fun!</p>
				<div className = {s.buttons}>
					<Link href = "/meme">Memes</Link>
				</div>
			</div>
		</main>
	)
}
