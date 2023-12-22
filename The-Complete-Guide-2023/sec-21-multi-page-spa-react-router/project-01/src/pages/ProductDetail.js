import { useParams, Link } from "react-router-dom";

const ProductDetailPage = () => {
    const params = useParams();

    return (
        <>
            <h1>Product details</h1>
            <p>{params.productId}</p>
            <p><Link
                to=".."
                relative='path' // the default is 'route'
            // when 'path' is used, it will look at the currently active path and remove 1 segment from it.
            >
                Back
            </Link></p>
        </>
    )
}

export default ProductDetailPage;