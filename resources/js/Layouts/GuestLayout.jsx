import ApplicationLogo from '@/Components/ApplicationLogo'
import NavLink from '@/Components/NavLink'
import { Link } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import CategoriesDropdown from '@/Components/CategoriesDropdown.jsx'
import { usePage } from '@inertiajs/react'

export default function GuestLayout({ header, children }) {
    const { categories } = usePage().props

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-inner">
                        {/* Left navigation */}
                        <div className="navbar-left">
                            {/*<div className="logo-container">*/}
                            {/*    <Link href="/">*/}
                            {/*        <ApplicationLogo className="logo" />*/}
                            {/*    </Link>*/}
                            {/*</div>*/}

                            {/*<div className="nav-links">*/}
                            {/*    <NavLink*/}
                            {/*        href={route('products.index')}*/}
                            {/*        active={route().current('products.index')}*/}
                            {/*    >*/}
                            {/*        Categories <FontAwesomeIcon icon={faBox} />*/}
                            {/*    </NavLink>*/}
                            {/*</div>*/}

                            <div className="nav-links">
                                <CategoriesDropdown categories={categories} />
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="navbar-right">
                            <Link href={route('login')} className="btn btn-light">
                                Sign In
                            </Link>

                            <Link href={route('register')} className="btn btn-dark">
                                Register
                            </Link>

                            <Link href={route('cart.view')} className="btn btn-light">
                                Basket
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="page-header">
                    <div className="header-container">{header}</div>
                </header>
            )}

            <main className="page-content">{children}</main>
        </div>
    )
}
