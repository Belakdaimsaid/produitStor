export default function Product({product}){
    return <tr>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>{product.description}</td>
        <td>{product.category}</td>
        <td><img src={product.image} width={250}height={250}/></td>
         <td><span className="badge badge-pill bg-primary">{product.rating.rate}/5 count:{product.rating.count}</span></td>
    </tr>

}