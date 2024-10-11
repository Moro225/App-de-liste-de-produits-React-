import { Input } from "./composants/forms/Input"
import { Checkbox } from "./composants/forms/Checkbox"
import { Productcategory } from "./composants/products/ProductCategory"
import { ProductRow } from "./composants/products/ProductRow"
import { useState } from "react"

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'DragonFruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'PassionFruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
]

function App() {
  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [value, setValue] = useState('')
  const visibleProduct = PRODUCTS.filter(product => {
    if(showStockedOnly && !product.stocked){
      return false
    }
    if(value && !product.name.includes(value)){
      return false
    }
    return true;
  })
  return <div className="container my-3">
    <SearchBar 
      showStockedOnly={showStockedOnly} 
      onStockedOnlyChange={setShowStockedOnly} 
      value={value} 
      onValueChange={setValue}/>
    <ProductTable products={visibleProduct}/>
  </div>
}
function SearchBar({showStockedOnly, onStockedOnlyChange, value, onValueChange}){
  return <div className="mx-3">
    <Input 
      value={value}
      placeholder={'Rechercher...'}
      onChange={onValueChange}
    />
    <Checkbox
      checked={showStockedOnly}
      onChange={onStockedOnlyChange}
      id="stocked"
      label={'N\'afficher que les produits en stock'}
    />
  </div>
}
function ProductTable({products}){

  const rows = []
  let lastCategory = null
  for (let product of products){
    if(product.category !== lastCategory){
      rows.push(<Productcategory key={product.category} name={product.category}/>)
    }
    lastCategory = product.category
    rows.push(<ProductRow product={product} key={product.name}/>)
  }
  
  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}
export default App
