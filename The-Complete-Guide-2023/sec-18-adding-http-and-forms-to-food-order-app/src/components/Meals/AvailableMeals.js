import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(); // undefined

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-faa69-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            const loadedMeals = [];
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch(err => {
            setIsLoading(false);
            setHttpError(err.message);
        });

    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }
    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return <section className={classes.meals}>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>
};

export default AvailableMeals;