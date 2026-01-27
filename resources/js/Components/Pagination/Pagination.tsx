import { Link } from '@inertiajs/react'

type PaginationLink = {
    url: string | null
    label: string
    active: boolean
}

type PaginationProps = {
    links: PaginationLink[]
}

export default function Pagination({ links }: PaginationProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-1 mt-4">
            {links.map((link, key) => {
                return link.url === null ? (
                    <div
                        key={key}
                        className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 text-sm rounded-md ${
                            link.active
                                ? 'bg-blue-500 text-white dark:bg-blue-600'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            })}
        </div>
    )
}
