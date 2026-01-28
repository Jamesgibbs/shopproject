export default function CardGrid({ children }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
            }}
        >
            {children}
        </div>
    )
}
