import { useMemo, useState } from 'react';
import { apiDocumentation } from '../data/apiDocumentation';

function methodOf(endpoint: string): string {
    return endpoint.split(' ')[0] ?? 'GET';
}

const methodClass: Record<string, string> = {
    GET: 'badge-info',
    POST: 'badge-success',
    PUT: 'badge-warning',
    PATCH: 'badge-accent',
    DELETE: 'badge-error',
};

export default function ApiDocsPage() {
    const [query, setQuery] = useState('');

    const apiBase = import.meta.env.VITE_API_BASE_URL as string;
    const swaggerUrl = apiBase?.replace(/\/$/, '') + '/docs';

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return apiDocumentation;
        return apiDocumentation
            .map((section) => ({
                ...section,
                rows: section.rows.filter(
                    (row) =>
                        row.endpoint.toLowerCase().includes(q) ||
                        row.purpose.toLowerCase().includes(q) ||
                        row.response.toLowerCase().includes(q),
                ),
            }))
            .filter((section) => section.rows.length > 0);
    }, [query]);

    const totalRows = filtered.reduce((n, s) => n + s.rows.length, 0);

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
                        Документація API
                    </h1>
                    <p className="text-base-content/80 max-w-3xl">
                        Довідник REST-інтерфейсу GraphEdit. Усі шляхи мають префікс{' '}
                        <code className="text-sm bg-base-300 px-1.5 py-0.5 rounded">/api</code>.
                        Захищені запити потребують заголовка{' '}
                        <code className="text-sm bg-base-300 px-1.5 py-0.5 rounded">
                            Authorization: Bearer &lt;Firebase ID Token&gt;
                        </code>
                        .
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <span className="badge badge-outline">Базовий URL: {apiBase}</span>
                        <a
                            href={swaggerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-primary"
                        >
                            Відкрити Swagger
                        </a>
                        <span className="opacity-60">{totalRows} endpoint-ів</span>
                    </div>
                </header>

                <label className="input input-bordered flex items-center gap-2 max-w-md mb-8 bg-base-100">
                    <span className="opacity-50">Пошук</span>
                    <input
                        type="search"
                        className="grow"
                        placeholder="Шлях, призначення, відповідь…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </label>

                <div className="space-y-10">
                    {filtered.map((section) => (
                        <section key={section.id} id={section.id}>
                            <h2 className="font-display text-xl font-semibold mb-3 border-b border-base-content/10 pb-2">
                                {section.title}
                            </h2>
                            <div className="overflow-x-auto rounded-xl border border-base-content/10 bg-base-100 shadow-sm">
                                <table className="table table-zebra table-sm sm:table-md w-full">
                                    <thead>
                                        <tr className="text-base-content">
                                            <th className="w-[38%] min-w-[200px]">Endpoint</th>
                                            <th className="w-[34%] min-w-[180px]">Призначення</th>
                                            <th className="w-[28%] min-w-[160px]">Відповідь</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.rows.map((row) => {
                                            const method = methodOf(row.endpoint);
                                            const path = row.endpoint.slice(method.length).trim();
                                            return (
                                                <tr key={row.endpoint} className="align-top">
                                                    <td className="font-mono text-xs sm:text-sm whitespace-nowrap">
                                                        <span
                                                            className={`badge badge-sm mr-2 ${methodClass[method] ?? 'badge-ghost'}`}
                                                        >
                                                            {method}
                                                        </span>
                                                        <span className="break-all">{path}</span>
                                                    </td>
                                                    <td className="text-sm">{row.purpose}</td>
                                                    <td className="font-mono text-xs text-base-content/90">
                                                        {row.response}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="text-center opacity-60 py-12">Нічого не знайдено за запитом.</p>
                )}
            </div>
        </div>
    );
}
