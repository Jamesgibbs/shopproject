import SupplierLayout from '@/Layouts/SupplierLayout'
import SupplierProductsTable from "@/Components/SupplierProductsTable.jsx";

export default function SupplierIndex({ products }) {
    return (
        <div>
            <h1>Your Products</h1>

            <SupplierProductsTable products={products}/>
        </div>
    )
}

SupplierIndex.layout = page => <SupplierLayout children={page} />
