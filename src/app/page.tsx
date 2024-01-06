import ProductCard from "@/app/components/ProductCard";
import Navbar from "@/app/components/Navbar";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

const AllProductPage = async () => {
    const res = await fetch('https://dummyjson.com/products');
    const products: Product[] = [
        {
            "id": 1,
            "title": "iPhone 1",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "...",
            "images": ["...", "...", "..."]
        },
        {
            "id": 2,
            "title": "iPhone 2",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "...",
            "images": ["...", "...", "..."]
        },
        {
            "id": 3,
            "title": "iPhone 3",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "...",
            "images": ["...", "...", "..."]
        },
        {
            "id": 4,
            "title": "iPhone 4",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "...",
            "images": ["...", "...", "..."]
        },
        {
            "id": 5,
            "title": "iPhone 5",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "...",
            "images": ["...", "...", "..."]
        },
    ];//await res.json(); //TODO

  return (
    <main className='grid justify-center'>
        <p className='text-[48px] font-[600] leading-[64.8px] text-[#323232] text-center m-6'>See Products</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 p-1 m-20 w-[1300px]">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                    thumbnail={product.thumbnail}
                />
                )
            )}
        </div>
    </main>
  )
}

export default AllProductPage;