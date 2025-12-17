// ./components/admin/Breadcrumbs.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const crumbs = paths.map((path, i) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    href: `/${paths.slice(0, i + 1).join('/')}`,
  }));

  if (paths.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2 p-4 bg-gray-100 rounded">
        <li>
          <a href="/admin" className="text-blue-500 hover:underline">Home</a>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i}>
            <span className="mx-2">/</span>
            {i === crumbs.length - 1 ? (
              <span className="font-semibold">{crumb.label}</span>
            ) : (
              <a href={crumb.href} className="text-blue-500 hover:underline">
                {crumb.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}