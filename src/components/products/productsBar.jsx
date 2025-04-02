import WomenClothes from "./photos/spring-wardrobe-switch-still-life_23-2150176694.avif";
import Jewlery from "./photos/diamond-multiple-styles-set_78370-8313.avif";
import MenClothes from "./photos/hand-drawn-t-shirt-outline-illustration_23-2150927674.avif";
import Electronics from "./photos/computer-icon-collection_1172-127.avif";
import {useState , useEffect} from "react";
export default function ProductsBar(){
    const[categories,setCategories] = useState([
        {id: "1",img:MenClothes,title:"Shirts",link:"Show all"},
        {id: "2",img:WomenClothes,title:"Dresses",link:"Show all"},
        {id: "3",img:Jewlery,title:"Jewlery",link:"Show all"},
        {id: "4",img:Electronics,title:"Electronics",link:"Show all"},
    ]);
    return(
        <main>
            <h1 className='cate-heading'>Categories</h1>
            <div className='cate'>{categories.map(category => {
                    return(
                        <div key={category.id} className='categories-container'>
                            <img src={category.img} className='img-bar'/>
                            <h3 className='heading-bar'>{category.title}</h3>
                            <p className='link'>{category.link}</p>
                        </div>
                    );
            })}</div>
        </main>
    );
}