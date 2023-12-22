import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    description: "The first book I ever wrote"
  },
  {
    id: 'p2',
    price: 5,
    title: 'My Second Book',
    description: "The second book I ever wrote"
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map((p) => (
            <ProductItem
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              description={p.description}
            />
          ))}
      </ul>
    </section>
  );
};

export default Products;
