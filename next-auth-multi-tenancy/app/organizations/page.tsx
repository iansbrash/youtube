import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOutAction } from "@/actions/sign-out.actions";

export default async function OrganizationsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/signin");
    }

    const userId = session.user.id;

    const userOrganizations = await prisma.user_Organization.findMany({
        where: {
            user_id: userId
        },
        include: {
            organization: true
        }
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Organizations</h1>
            <div className="grid gap-4">
                {userOrganizations.map((userOrg) => (
                    <div 
                        key={userOrg.organization.id}
                        className="p-4 border rounded-lg shadow-sm"
                    >
                        <h2 className="text-xl mb-2">{userOrg.organization.name}</h2>
                        <Link 
                            href={`/${userOrg.organization.uniqueId}`}
                            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            View Organization
                        </Link>
                    </div>
                ))}
            </div>
            
            <form action={signOutAction}>
                <button 
                    type="submit"
                    className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
            </form>
        </div>
    );
}
