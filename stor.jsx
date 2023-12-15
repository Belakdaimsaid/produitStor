import React, { useEffect, useState, useRef } from "react";
import Product from './product';

export default function ProduitListe() {
    const [productlist, setProductlist] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [categorys, setCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const displayCategories = () => {
        return categorys.map((category, index) => (
            <input
                className="btn btn-primary"
                type="button"
                value={category}
                key={index}
                onClick={() => handlerSea(category)}
            />
        ));
    };

    const displayProducts = () => {
        const productsTemp = productlist.filter(product => {
            return (
                product.title.includes(searchInput) ||
                product.id.toString().includes(searchInput) ||
                product.description.includes(searchInput) ||
                product.category.includes(searchInput)
            );
        });

        if (productsTemp.length > 0) {
            return productsTemp.map((product, key) => {
                return <Product product={product} key={key} />;
            });
        }
        return (
            <tr>
                <td colSpan={7}>Aucun produit </td>
            </tr>
        );
    };

    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(response => setProductlist(response));
    };

    const getCategory = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(response => response.json())
            .then(response => setCategorys(response));
    };

    useEffect(() => {
        getProducts();
        getCategory();
    }, []);

    const handlerSearch = (e) => {
        e.preventDefault();
        const inputValue = document.querySelector('#search').value;
        setSearchInput(inputValue);
        document.querySelector('#search').value = '';
        if (elementCibleRef.current && inputValue !== "") {
            elementCibleRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const elementCibleRef = useRef(null);

    const handlerSea = (clickedCategory) => {
        setSelectedCategory(clickedCategory);
        setSearchInput(clickedCategory);
        if (elementCibleRef.current) {
            elementCibleRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const customStyles = {
        fontFamily: 'YourChosenFont, sans-serif',
    };

    return (
        <div className="px-5 " bo>

            <h2>Recherche:</h2>
            <form>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label className="col-form-label">Rechercher : </label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="search" className="form-control" />
                    </div>
                    <div className="col-auto">
                        <input className="btn btn-primary" type="submit" value="Search" onClick={handlerSearch} />
                    </div>
                </div>
                <hr />
                <h2>Categories:</h2>
                <div className="row g-3 align-items-center">
                    <div className="btn-group">{displayCategories()}</div>
                </div>
            </form>
            <hr />
            <h1 ref={elementCibleRef} className="bg-danger text-white  border border-danger p-1 rounded " style={customStyles}>Liste des produits:</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITRE</th>
                        <th>PRIX</th>
                        <th>DESCRIPTION</th>
                        <th>CATEGORIE</th>
                        <th>IMAGE</th>
                        <th>RATING</th>
                    </tr>
                </thead>
                <tbody>
                    {displayProducts()}
                </tbody>
            </table>
        </div>
    );
}
