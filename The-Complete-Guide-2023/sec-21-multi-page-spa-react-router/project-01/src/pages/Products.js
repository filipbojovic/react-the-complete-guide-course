import { Link } from "react-router-dom";

const PRODUCTS = [
    { id: 'p1', title: 'Product 1' },
    { id: 'p2', title: 'Product 2' },
    { id: 'p3', title: 'Product 3' }
]

const ProductsPage = () => {
    return (
        <>
            <h1>The Products Page</h1>
            <ul>
                {
                    PRODUCTS.map(p =>
                        <li key={p.id}>
                            <Link to={p.id}>{p.title}</Link>
                        </li>
                    )
                }
            </ul>
        </>
    );
}

export default ProductsPage;