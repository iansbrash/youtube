"use client";

import { signInAction } from "@/actions/sign-in.actions";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState("");

	const session = useSession();

	const handleLogin = async () => {
		await signInAction(email);
	};

	return (
		<div className="w-full h-full flex justify-center items-center flex-col gap-y-2">
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
				className="text-gray-800 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			<button
				onClick={handleLogin}
				className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				type="button"
			>
				Login
			</button>
			<h1>Unauthenticated Content</h1>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
}
