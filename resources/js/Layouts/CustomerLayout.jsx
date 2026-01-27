export default function CustomerLayout({ children }) {
    return (
        <>
            <header>Customer Navbar</header>
            <main>{children}</main>
            <footer>Customer Footer</footer>
        </>
    )
}
