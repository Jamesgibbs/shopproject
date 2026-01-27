export default function Card({ children, hover = true }) {
    return (
        <div
            style={{
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: '#fafafa',
                transition: '0.2s',
                ...(hover && {
                    cursor: 'pointer',
                }),
            }}
            onMouseEnter={(e) => hover && (e.currentTarget.style.background = '#f0f0f0')}
            onMouseLeave={(e) => hover && (e.currentTarget.style.background = '#fafafa')}
        >
            {children}
        </div>
    )
}
