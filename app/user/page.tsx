import prisma from "@/lib/prisma";
import { UserCard } from "@/components/user/UserCard";
import { UserPagination } from "@/components/user/UserPagination";
import { StarBackground } from "@/components/ui/StarBackground";

const USERS_PER_PAGE = 12;

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where: {
        private: false,
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        status: true,
      },
      skip: (currentPage - 1) * USERS_PER_PAGE,
      take: USERS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({
      where: {
        private: false,
        isActive: true,
      },
    }),
  ]);

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-12 md:px-12 lg:px-24">
      <StarBackground className="opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {users.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  displayName={user.displayName}
                  avatarUrl={user.avatarUrl}
                  status={user.status}
                />
              ))}
            </div>

            <UserPagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <span className="text-4xl">🔭</span>
            </div>
            <h2 className="text-2xl font-semibold text-white/80 mb-2">
              No explorers found
            </h2>
            <p className="text-white/40">
              The star system seems a bit empty right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
